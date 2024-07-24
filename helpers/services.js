import { clone, identity, ifElse, map, pipe } from 'rambda'
import { wallets } from '../data/wallets'
import { FCL_SERVICE_METHODS, SERVICE_TYPES } from './constants'
import { replacePort } from './urls'

export const filterSupportedStrategies =
  (supportedStrategies = []) =>
  (services = []) => {
    return services.filter(s => supportedStrategies.includes(s.method))
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
export const filterOptInServices =
  ({ wallets }) =>
  (includeList = [], services = []) =>
    services.filter(service => {
      if (service.optIn) {
        const wallet = wallets?.find(w => w.uid === service.walletUid)
        return includeList.includes(
          service?.provider?.address || wallet?.address
        )
      }
      return true
    })

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
export const filterServicesByPlatform =
  ({ wallets }) =>
  (platform, services = []) =>
    services.filter(service => {
      if (!requiresPlatform(service)) return true

      const wallet = wallets?.find(w => w.uid === service.walletUid)
      const providerPlatforms = Object.keys(wallet?.installLink || {})
      return providerPlatforms.includes(platform?.toLowerCase())
    })

// TODO: We shouldn't actually need to filter this in new version, may need to preserve behaviour for legacy Discovery API usage
export const appendInstallData =
  ({ wallets }) =>
  (platform, extensions = [], services = []) =>
    services.map(
      ifElse(
        requiresPlatform,
        srv => {
          const service = clone(srv)
          service.provider = service.provider || {}
          service.provider['requires_install'] = true

          service.provider['is_installed'] = isExtensionInstalled(
            extensions,
            service
          )

          const wallet = wallets.find(w => w.uid === service.walletUid)
          const installLink = wallet?.installLink?.[platform?.toLowerCase()]

          if (installLink) {
            service.provider['install_link'] = installLink
          }
          return service
        },
        identity
      )
    )

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
