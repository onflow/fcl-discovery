import { SERVICE_METHODS, SERVICE_TYPES } from './constants'
import {
  getInstallLinkFromMetadata,
  getProviderMetadataByAddress,
} from './metadata'

export const filterUniqueServices =
  ({ address = true, uid = false }) =>
  services => {
    let foundIds = []
    return services.filter(p => {
      const hasAddress = foundIds.includes(p.provider?.address)
      const hasUid = foundIds.includes(p?.uid)
      if ((address && hasAddress) || (uid && hasUid)) return false
      if (p.provider.address) foundIds.push(p.provider.address)
      if (p.uid) foundIds.push(p.uid)
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

// If it's an optIn service, make sure it's been asked to be included
export function filterOptInServices(includeList = [], services = []) {
  return services.filter(service => {
    if (service.optIn) return includeList.includes(service?.provider?.address)
    return true
  })
}

export const getServiceByAddress = (services, address) => {
  return services.find(service => service?.provider?.address === address)
}

export const containsAddress = (services = [], address) => {
  return services.some(service => service?.provider?.address === address)
}

// Put last used service at top
export function sortByAddress(services = [], selectedAddress) {
  if (!selectedAddress) return services
  if (!containsAddress(services, selectedAddress)) return services // Do not continue if address you want to sort by is not in list
  const serviceWithAddress = getServiceByAddress(services, selectedAddress)
  const servicesWithoutSpecified = services.filter(
    service => service?.provider?.address !== selectedAddress
  )
  return [serviceWithAddress, ...servicesWithoutSpecified]
}

export const isExtension = service =>
  service?.method === SERVICE_METHODS.EXTENSION

export const isExtensionInstalled = (extensions, address) =>
  extensions.some(extension => extension?.provider?.address === address)

export const requiresPlatform = service => {
  const requiredPlatformTypes = [SERVICE_METHODS.EXTENSION]
  return requiredPlatformTypes.includes(service?.method)
}

export function filterServicesByPlatform(platform, services = []) {
  return services.filter(service => {
    if (!requiresPlatform(service)) return true
    const providerMetadata = getProviderMetadataByAddress(
      service?.provider?.address
    )

    // Assume it is supported if we can't find the metadata for it.
    if (!providerMetadata) return true

    const providerPlatforms = Object.keys(providerMetadata?.platforms || {})
    return providerPlatforms.includes(platform?.toLowerCase())
  })
}

export function appendInstallData(platform, extensions = [], services = []) {
  return services.map(service => {
    const clone = { ...service }

    if (requiresPlatform(service)) {
      clone.provider['requires_install'] = true
      clone.provider['is_installed'] = isExtensionInstalled(
        extensions,
        service?.provider?.address
      )
      const providerMetadata = getProviderMetadataByAddress(
        service?.provider?.address
      )

      const installLink = getInstallLinkFromMetadata(providerMetadata, platform)

      if (installLink) {
        clone.provider['install_link'] = installLink
      }
    }

    return clone
  })
}
