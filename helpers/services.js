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

export function sortByAddress(services, selectedAddress) {
  const serviceWithAddress = getServiceByAddress(services, selectedAddress)
  const servicesWithoutSpecified = services.filter(service => service?.provider?.address !== selectedAddress)
  return [serviceWithAddress, ...servicesWithoutSpecified]
}