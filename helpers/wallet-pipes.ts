// Version key is the highest the pipe supports

import { always, identity, ifElse, pipe, reject, when } from 'rambda'
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
} from './services'
import {
  NETWORKS,
  FCL_SERVICE_METHODS,
  DEFAULT_SERVICE_METHODS,
  SUPPORTED_VERSIONS,
} from './constants'
import { getBrowserFromUserAgent, getDeviceInfo } from './device'
import { isGreaterThanOrEqualToVersion } from './version'
import {
  pipeWalletServices,
  processInstallLinks,
  removeEmptyWallets,
  ServiceWithWallet,
  walletsForNetwork,
} from './wallets'
import { injectClientServices } from './inject-wallets'
import { Service } from '../types'

export const getWalletPipes = ({
  fclVersion,
  discoveryType,
  include,
  userAgent,
  clientServices,
  supportedStrategies,
  network,
  portOverride,
  includeUninstalledServices,
}) => {
  const deviceInfo = getDeviceInfo(userAgent)
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
              appendInstallData({
                wallets,
                platform: deviceInfo.browser,
                extensions,
              }),
              filterUniqueServices({ address: true, uid: false }),
              serviceOfTypeAuthn,
              // Filter out extensions if not supported because they were added on the FCL side in previous versions
              ifElse(
                always(areUninstalledExtensionsSupported),
                filterServicesByPlatform({
                  wallets,
                  platform: deviceInfo.browser,
                }),
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

        // Pre-process services
        pipeWalletServices(({ wallets }) =>
          pipe(
            filterSupportedStrategies(supportedStrategies),
            // Remove opt in services unless marked as include, if supported
            filterOptInServices({ wallets, includeList: include }),
          ),
        ),

        // Inject client services
        injectClientServices(clientServices),

        // Post-process services
        pipeWalletServices(
          ({ wallets }) =>
            pipe(
              // Add installation data, if enabled
              ifElse(
                always(includeUninstalledServices),
                pipe(
                  filterServicesByPlatform({
                    wallets,
                    platform: deviceInfo.browser,
                  }),
                  appendInstallData({
                    wallets,
                    platform: deviceInfo.browser,
                    extensions,
                  }),
                ),
                filterUninstalledServices({ extensions }),
              ),
              // Add services if supported
              serviceOfTypeAuthn,
              // Allow port override option if local
              overrideServicePorts(isLocal, portOverride),
            ) as (services: ServiceWithWallet[]) => ServiceWithWallet[],
        ),

        // Transform wallet install links based on device info
        // i.e. chrome/firefox/etc => browser, ios/android => mobile based on user agent
        processInstallLinks({
          deviceInfo,
          supportedStrategies,
        }),

        // Remove wallets with no services & no install links
        removeEmptyWallets(),
      ),
    },
  ]
}
