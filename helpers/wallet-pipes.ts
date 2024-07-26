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
} from './services'
import {
  NETWORKS,
  FCL_SERVICE_METHODS,
  FCL_SERVICE_METHOD_VALUES,
  SUPPORTED_VERSIONS,
} from './constants'
import { getBrowserFromUserAgent } from './platform'
import { isGreaterThanOrEqualToVersion } from './version'
import { pipeWalletServices, walletsForNetwork } from './wallets'
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
}) => {
  const platform = getBrowserFromUserAgent(userAgent).toLowerCase()
  const isLocal = network === NETWORKS.LOCAL || network === NETWORKS.EMULATOR

  // In newer versions, we'll have extensions sent
  // In older versions they were added on the FCL side
  // If below certain version, there is no user agent
  const isFilteringSupported = isGreaterThanOrEqualToVersion(
    fclVersion,
    SUPPORTED_VERSIONS.FILTERING
  )
  const areExtensionsSupported = isGreaterThanOrEqualToVersion(
    fclVersion,
    SUPPORTED_VERSIONS.EXTENSIONS
  )
  const areUninstalledExtensionsSupported = isGreaterThanOrEqualToVersion(
    fclVersion,
    discoveryType === 'UI'
      ? SUPPORTED_VERSIONS.UNINSTALLED_EXTENSIONS
      : SUPPORTED_VERSIONS.UNINSTALLED_EXTENSIONS_API
  )
  const extensions = serviceListOfMethod(
    clientServices,
    FCL_SERVICE_METHODS.EXT
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
              filterSupportedStrategies(FCL_SERVICE_METHOD_VALUES),
              // Remove opt in services unless marked as include, if supported
              when(
                always(isFilteringSupported),
                filterOptInServices({ wallets, includeList: include })
              )
            ) as any
        ),

        ifElse(
          always(areExtensionsSupported),
          injectClientServices(clientServices),
          identity
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
                filterServicesByPlatform({ wallets, platform }),
                reject(isExtension)
              )
            ) as any
        )
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
            filterOptInServices({ wallets, includeList: include })
          )
        ),

        // Inject client services
        injectClientServices(clientServices),

        // Post-process services
        pipeWalletServices(
          ({ wallets }) =>
            pipe(
              // Add installation data
              filterServicesByPlatform({ wallets, platform }),
              appendInstallData({
                wallets,
                platform,
                extensions: clientServices,
              }),
              // Add services if supported
              serviceOfTypeAuthn,
              // Allow port override option if local
              overrideServicePorts(isLocal, portOverride)
            ) as any
        )
      ),
    },
  ]
}
