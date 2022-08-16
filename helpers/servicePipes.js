// Version key is the highest the pipe supports

import { always, ifElse, partial, pipe, reject, when } from 'rambda'
import {
  appendInstallData,
  combineServices,
  filterOptInServices,
  filterServicesByPlatform,
  isExtension,
  serviceListOfType,
  serviceOfTypeAuthn,
} from '../helpers/services'
import { SERVICE_METHODS, SUPPORTED_VERSIONS } from './constants'
import { getPlatformFromUserAgent } from './userAgent'
import { isGreaterThanOrEqualToVersion } from './version'

export const getServicePipes = ({
  fclVersion,
  discoveryType,
  include,
  userAgent,
  clientServices,
}) => {
  const platform = getPlatformFromUserAgent(userAgent)

  return [
    {
      minVersion: '0.0.0',
      maxVersion: '1.1.0',
      pipe: () => {
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
        const extensions = serviceListOfType(
          clientServices,
          SERVICE_METHODS.EXTENSION
        )

        return pipe(
          // Remove opt in services unless marked as include, if supported
          when(
            always(isFilteringSupported),
            partial(filterOptInServices, include)
          ),
          // Add installation data
          partial(appendInstallData, platform, extensions),
          // Add extensions if supported
          when(always(areExtensionsSupported), services =>
            combineServices(services, extensions, true)
          ),
          serviceOfTypeAuthn,
          // Filter out extensions if not supported because they were added on the FCL side in previous versions
          ifElse(
            always(areUninstalledExtensionsSupported),
            partial(filterServicesByPlatform, platform),
            partial(reject, isExtension)
          )
        )
      },
    },
    {
      minVersion: '1.1.1',
      maxVersion: null,
      pipe: pipe(
        services => combineServices(services, clientServices),
        // Remove opt in services unless marked as include, if supported
        partial(filterOptInServices, include),
        // Add installation data
        partial(appendInstallData, platform, clientServices),
        // Add services if supported
        serviceOfTypeAuthn
      ),
    },
  ]
}
