// Version key is the highest the pipe supports

import { always, filter, identity, ifElse, pipe, reject, when } from 'rambda'
import {
  isExtension,
  serviceListOfMethod,
  serviceOfTypeAuthn,
  filterUniqueServices,
  filterSupportedStrategies,
  overrideServicePorts,
  appendInstallData,
  filterServicesByPlatform,
  filterOptInServices,
  filterUninstalledServices,
  filterExcludedServices,
} from './services'
import {
  NETWORKS,
  FCL_SERVICE_METHODS,
  DEFAULT_SERVICE_METHODS,
  SUPPORTED_VERSIONS,
  FEATURE_FLAGS,
} from './constants'
import { getBrowserFromUserAgent } from './device'
import { isGreaterThanOrEqualToVersion } from './version'
import {
  pipeWalletServices,
  removeEmptyWallets,
  walletsForNetwork,
} from './wallets'
import { filterPasskeyOnlyServices } from './services'
import { injectClientServices } from './inject-wallets'

export const getWalletPipes = ({
  fclVersion,
  discoveryType,
  include,
  exclude,
  userAgent,
  clientServices,
  supportedStrategies,
  network,
  portOverride,
  includeUninstalledServices,
}) => {
  const platform = getBrowserFromUserAgent(userAgent)?.toLowerCase()
  const isLocal = network === NETWORKS.LOCAL || network === NETWORKS.EMULATOR

  // In newer versions, we'll have extensions sent
  // In older versions they were added on the FCL side
  // If below certain version, there is no user agent
  const isFilteringSupported = isGreaterThanOrEqualToVersion(
    fclVersion,
    SUPPORTED_VERSIONS.FILTERING,
  )
  const areExtensionsSupported = isGreaterThanOrEqualToVersion(
    fclVersion,
    SUPPORTED_VERSIONS.EXTENSIONS,
  )
  const areUninstalledExtensionsSupported = isGreaterThanOrEqualToVersion(
    fclVersion,
    discoveryType === 'UI'
      ? SUPPORTED_VERSIONS.UNINSTALLED_EXTENSIONS
      : SUPPORTED_VERSIONS.UNINSTALLED_EXTENSIONS_API,
  )
  const isPasskeysSupported = isGreaterThanOrEqualToVersion(
    fclVersion,
    SUPPORTED_VERSIONS.PASSKEYS,
  )
  const isPasskeysEnabled = FEATURE_FLAGS.PASSKEYS && isPasskeysSupported
  const extensions = serviceListOfMethod(
    clientServices,
    FCL_SERVICE_METHODS.EXT,
  )

  return [
    {
      supportedVersion: '0.0.0',
      pipe: pipe(
        // Select wallets for the correct network
        walletsForNetwork(network),

        // Pre-process services
        pipeWalletServices(
          ({ wallets }) =>
            pipe(
              // Only support default FCL methods in this version
              filterSupportedStrategies(DEFAULT_SERVICE_METHODS),
              // Hide passkey-only wallets unless feature is enabled and supported
              filterPasskeyOnlyServices({ wallets, isPasskeysEnabled }),
              // Remove opt in services unless marked as include, if supported
              when(
                always(isFilteringSupported),
                filterOptInServices({ wallets, includeList: include }),
              ),
            ) as any,
        ),

        ifElse(
          always(areExtensionsSupported),
          injectClientServices(clientServices),
          identity,
        ),

        // Post-process services
        pipeWalletServices(
          ({ wallets }) =>
            pipe(
              // Add installation data
              appendInstallData({ wallets, platform, extensions }),
              filterUniqueServices({ address: true, uid: false }),
              serviceOfTypeAuthn,
              // Filter out extensions if not supported because they were added on the FCL side in previous versions
              ifElse(
                always(areUninstalledExtensionsSupported),
                filterServicesByPlatform({ wallets, platform, extensions }),
                reject(isExtension),
              ),
            ) as any,
        ),
      ),
    },
    {
      supportedVersion: '1.3.0-alpha.3',
      pipe: pipe(
        // Select wallets for the correct network
        walletsForNetwork(network),

        // Inject client services
        injectClientServices(clientServices),

        // Filter unsupported services and remove empty wallets after
        pipeWalletServices(({ wallets }) =>
          pipe(
            filterSupportedStrategies(supportedStrategies),
            // Hide passkey-only wallets unless feature is enabled and supported
            filterPasskeyOnlyServices({ wallets, isPasskeysEnabled }),
            // Remove opt in services unless marked as include, if supported
            filterOptInServices({ wallets, includeList: include }),
            // Remove any excluded wallets, if supported
            filterExcludedServices({ wallets, excludeList: exclude }),
          ),
        ),
        removeEmptyWallets,

        // Filter services based on installation status
        // Do not remove empty wallets, as we want to show installable wallets
        pipeWalletServices(
          ({ wallets }) =>
            pipe(
              // Add installation data, if enabled
              ifElse(
                always(includeUninstalledServices),
                pipe(
                  filterServicesByPlatform({ wallets, platform, extensions }),
                  appendInstallData({ wallets, platform, extensions }),
                ),
                filterUninstalledServices({ extensions }),
              ),
              // Add services if supported
              serviceOfTypeAuthn,
              // Allow port override option if local
              overrideServicePorts(isLocal, portOverride),
            ) as any,
        ),
      ),
    },
  ]
}
