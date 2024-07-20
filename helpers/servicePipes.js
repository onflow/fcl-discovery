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
  walletToProvider,
  convertLegacyServices,
  injectClientServices,
} from './services'
import {
  NETWORKS,
  FCL_SERVICE_METHODS,
  FCL_SERVICE_METHOD_VALUES,
  SUPPORTED_VERSIONS,
} from './constants'
import { getBrowserFromUserAgent } from './platform'
import { isGreaterThanOrEqualToVersion } from './version'
import { nextJsImageToBase64 } from './image'

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
    // TODO: Make sure that extensions use the legacyProviderOverrides
    {
      supportedVersion: '0.0.0',
      pipe: pipe(
        // Only support default FCL methods in this version
        filterSupportedStrategies(FCL_SERVICE_METHOD_VALUES),
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
        // Inject any client services, replace existing services if necessary
        injectClientServices(clientServices),
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

export const walletsForNetwork =
  network =>
  (wallets = []) =>
    wallets
      .filter(wallet => wallet.services[network])
      .map(wallet => ({
        ...wallet,
        services: wallet.services[network],
      }))

export const walletIconsToBase64 = wallets =>
  wallets.map(wallet => ({
    ...wallet,
    icon: wallet.icon ? nextJsImageToBase64(wallet.icon) : undefined,
  }))

export const extractWalletServices = (wallets = []) =>
  wallets.reduce((acc, wallet) => {
    acc.push(
      ...wallet.services.map(service => ({
        ...service,
        wallet: wallet,
      }))
    )
    return acc
  }, [])

export const removeWalletFromServices = services =>
  services.map(service => {
    const { wallet, legacyProviderOverrides, ...rest } = service
    return {
      ...rest,
      provider: {
        ...walletToProvider(wallet, legacyProviderOverrides),
        ...service.provider,
      },
    }
  })
