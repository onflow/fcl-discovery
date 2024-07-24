// Version key is the highest the pipe supports

import { always, ifElse, partial, pipe, reject, when } from 'rambda'
import {
  combineServices,
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

export const getServicePipes = ({
  fclVersion,
  discoveryType,
  include,
  userAgent,
  clientServices,
  supportedStrategies,
  network,
  portOverride,
}) => {
  const platform = getBrowserFromUserAgent(userAgent)
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
    // TODO: Make sure that extensions use the provider
    {
      supportedVersion: '0.0.0',
      pipe:
        ({ wallets }) =>
        services =>
          pipe(
            // Only support default FCL methods in this version
            filterSupportedStrategies(FCL_SERVICE_METHOD_VALUES),
            // Remove opt in services unless marked as include, if supported
            when(
              always(isFilteringSupported),
              partial(filterOptInServices({ wallets }), include)
            ),
            // Add extensions if supported
            when(always(areExtensionsSupported), services =>
              combineServices(services, extensions, true)
            ),
            // Add installation data
            partial(appendInstallData, platform, extensions),
            filterUniqueServices({ address: true, uid: false }),
            serviceOfTypeAuthn,
            // Filter out extensions if not supported because they were added on the FCL side in previous versions
            ifElse(
              always(areUninstalledExtensionsSupported),
              partial(filterServicesByPlatform({ wallets }), platform),
              partial(reject, isExtension)
            )
          )(services),
    },
    {
      supportedVersion: '1.3.0-alpha.3',
      pipe:
        ({ wallets }) =>
        ({ services }) =>
          pipe(
            filterSupportedStrategies(supportedStrategies),
            // Remove opt in services unless marked as include, if supported
            partial(filterOptInServices({ wallets }), include),
            // Add installation data
            partial(filterServicesByPlatform({ wallets }), platform),
            partial(appendInstallData({ wallets }), platform, clientServices),
            // Add services if supported
            serviceOfTypeAuthn,
            // Allow port override option if local
            partial(overrideServicePorts, isLocal, portOverride)
          )(services),
    },
  ]
}
