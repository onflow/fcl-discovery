// Version key is the highest the pipe supports

import { always, ifElse, partial, pipe, reject, when } from 'rambda'
import {
  appendInstallData,
  combineServices,
  filterOptInServices,
  filterServicesByPlatform,
  isExtension,
  serviceListOfMethod,
  serviceOfTypeAuthn,
  filterUniqueServices,
  filterSupportedStrategies,
  overrideServicePorts,
} from './services'
import { NETWORKS, SERVICE_METHODS, SUPPORTED_VERSIONS } from './constants'
import { getPlatformFromUserAgent } from './userAgent'
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
  const platform = getPlatformFromUserAgent(userAgent)
  const isLocal = network === NETWORKS.LOCAL

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
    SERVICE_METHODS.EXTENSION
  )

  return [
    {
      supportedVersion: '0.0.0',
      pipe: pipe(
        // Remove opt in services unless marked as include, if supported
        when(
          always(isFilteringSupported),
          partial(filterOptInServices, include)
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
          partial(filterServicesByPlatform, platform),
          partial(reject, isExtension)
        )
      ),
    },
    {
      supportedVersion: '1.3.0-alpha.3',
      pipe: pipe(
        filterSupportedStrategies(supportedStrategies),
        services => combineServices(services, clientServices),
        filterUniqueServices({ address: true, uid: true }),
        // Remove opt in services unless marked as include, if supported
        partial(filterOptInServices, include),
        // Add installation data
        partial(filterServicesByPlatform, platform),
        partial(appendInstallData, platform, clientServices),
        // Add services if supported
        serviceOfTypeAuthn,
        // Allow port override option if local
        partial(overrideServicePorts, isLocal, portOverride)
      ),
    },
  ]
}
