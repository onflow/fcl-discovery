import { clone, identity, ifElse, map, pipe } from 'rambda'
import { wallets } from '../data/wallets'
import { FCL_SERVICE_METHODS, SERVICE_TYPES } from './constants'
import { replacePort } from './urls'

export const filterSupportedStrategies =
  (supportedStrategies = []) =>
  (services = []) => {
    return services.filter(s => supportedStrategies.includes(s.method))
  }

export const injectClientServices =
  (clientServices = []) =>
  services => {
    const walletMap = services.reduce((acc, service) => {
      const addr = service?.provider?.address || service?.wallet?.address
      const uid = service?.uid
      if (addr) acc[addr] = service.wallet
      if (uid) acc[uid] = service.wallet
      return acc
    }, {})

    const injectedServices = map(
      pipe(clone, service => {
        const wallet = walletMap[service?.provider?.address]
        if (wallet) {
          service.wallet = wallet
          return service
        } else {
          return service
        }
      }),
      clientServices
    )

    return filterUniqueServices({ address: true, uid: false })([
      ...injectedServices,
      ...services,
    ])
  }

// TODO: services without a corresponding wallet need to have a provider
export const legacyInjectedProviderToWallet = (service, wallet) => {
  const { provider, ...rest } = service
  return {
    ...rest,
    wallet,
    provider: {
      ...walletToProvider(wallet),
      ...service.provider,
    },
  }
}

export const filterUniqueServices =
  ({ address = true, uid = false }) =>
  services => {
    let foundIds = []
    return services.filter(p => {
      const pAddr = p?.provider?.address
      const pUid = p?.uid
      const hasAddress = foundIds.includes(pAddr)
      const hasUid = foundIds.includes(pUid)
      if ((address && hasAddress) || (uid && hasUid)) return false
      if (pAddr) foundIds.push(pAddr)
      if (pUid) foundIds.push(pUid)
      return true
    })
  }

export const combineServices = (
  existingServices = [],
  newServices = [],
  front = false
) => {
  let combined
  if (front) {
    combined = newServices.concat(existingServices)
  } else {
    combined = existingServices.concat(newServices)
  }
  return combined
}

export const serviceListOfType = (services = [], type) =>
  services.filter(service => service.type === type)

export const serviceOfTypeAuthn = services =>
  serviceListOfType(services, SERVICE_TYPES.AUTHN)

export const serviceListOfMethod = (services = [], method) =>
  services.filter(service => service.method === method)

// If it's an optIn service, make sure it's been asked to be included
export function filterOptInServices(includeList = [], services = []) {
  return services.filter(service => {
    if (service.optIn)
      return includeList.includes(
        service?.provider?.address || service?.wallet?.address
      )
    return true
  })
}

export const isExtension = service =>
  service?.method === FCL_SERVICE_METHODS.EXT

export const isExtensionInstalled = (extensions, service) =>
  extensions.some(extension => {
    const extAddr = extension?.provider?.address
    const srvAddr = service?.provider?.address
    const extUid = extension?.uid
    const srvUid = service?.uid
    return (extAddr === srvAddr && extAddr) || (extUid === srvUid && extUid)
  })

export const requiresPlatform = service => {
  const requiredPlatformTypes = [FCL_SERVICE_METHODS.EXT]
  return requiredPlatformTypes.includes(service?.method)
}

// TODO: We shouldn't actually need to filter this in new version, may need to preserve behaviour for legacy Discovery API usage
export function filterServicesByPlatform(platform, services = []) {
  return services.filter(service => {
    if (!requiresPlatform(service)) return true

    const providerPlatforms = Object.keys(service?.wallet?.installLink || {})
    return providerPlatforms.includes(platform?.toLowerCase())
  })
}

// TODO: We shouldn't actually need to filter this in new version, may need to preserve behaviour for legacy Discovery API usage
export function appendInstallData(platform, extensions = [], services = []) {
  return map(
    ifElse(
      requiresPlatform,
      pipe(clone, service => {
        service.provider = service.provider || {}
        service.provider['requires_install'] = true

        service.provider['is_installed'] = isExtensionInstalled(
          extensions,
          service
        )

        const installLink =
          service?.wallet?.installLink?.[platform?.toLowerCase()]

        if (installLink) {
          service.provider['install_link'] = installLink
        }
        return service
      }),
      identity
    )
  )(services)
}

export const overrideServicePorts = (
  shouldOverride,
  portOverride,
  services = []
) => {
  if (!shouldOverride) return services
  return services.map(s => {
    s.endpoint = replacePort(s.endpoint, portOverride)
    return s
  })
}

// Convert a wallet object to a provider object which can be attached to legacy services
export const walletToProvider = wallet => {
  return {
    name: wallet.name,
    address: wallet.address,
    description: wallet.description,
    icon: wallet.icon,
    color: wallet.color,
    website: wallet.website,
  }
}

export const getWalletForService = service => {
  return wallets.find(wallet => {
    return wallet.services.some(
      s => s.uid === service?.uid || s.address === service?.provider?.address
    )
  })
}
