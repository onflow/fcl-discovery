import { SERVICE_METHODS, SERVICE_TYPES } from './constants'
import { getProviderMetadataByAddress } from './metadata'

const filterUniqueServices = services => {
  let foundIds = []
  return services.filter(p => {
    if (foundIds.includes(p.provider.address)) {
      return false
    } else {
      foundIds.push(p.provider.address)
      return true
    }
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
  return filterUniqueServices(combined)
}

export const serviceListOfType = (services = [], type) =>
  services.filter(service => service.type === type)

export const serviceOfTypeAuthn = services =>
  serviceListOfType(services, SERVICE_TYPES.AUTHN)

// If it's an optIn service, make sure it's been asked to be included
export function filterOptInServices(services = [], includeList = []) {
  return services.filter(service => {
    if (service.optIn) return includeList.includes(service?.provider?.address)
    return true
  })
}

export const getServiceByAddress = (services, address) => {
  return services.find(service => service?.provider?.address === address)
}

export const containsAddress = (services, address) => {
  return services.some(service => service?.provider?.address === address)
}

// Put last used service at top
export function sortByAddress(services, selectedAddress) {
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

// Filter out extensions in service list if they are installed
export function filterServicesForInstalledExtensions(extensions = []) {
  return function (services = []) {
    return services.filter(
      service => !isExtensionInstalled(extensions, service?.provider?.address)
    )
  }
}

export const requiresPlatform = service => {
  const requiredPlatformTypes = [SERVICE_METHODS.EXTENSION]
  return requiredPlatformTypes.includes(service?.method)
}

export function filterServicesByPlatform(platform) {
  return function (services = []) {
    if (!platform) return services
    return services.filter(service => {
      if (!requiresPlatform(service)) return true
      const providerMetadata = getProviderMetadataByAddress(
        service?.provider?.address
      )
      const providerPlatforms = Object.keys(providerMetadata?.platforms || [])
      return providerPlatforms.includes(platform.toLowerCase())
    })
  }
}
