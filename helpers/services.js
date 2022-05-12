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

export const containsAddress = (services, address) => {
  return services.some(service => service?.provider?.address === address)
}

export function sortByAddress(services, selectedAddress) {
  if (!selectedAddress) return services
  if (!containsAddress(services, selectedAddress)) return services // Do not continue if address you want to sort by is not in list
  const serviceWithAddress = getServiceByAddress(services, selectedAddress)
  const servicesWithoutSpecified = services.filter(service => service?.provider?.address !== selectedAddress)
  return [serviceWithAddress, ...servicesWithoutSpecified]
}

// TODO: Add test
export function createGenericService({ 
  type = null, 
  f_vsn = '1.0.0', 
  method = "IFRAME/RPC", 
  uid = null, 
  endpoint = null, 
  optIn = true, 
  address = null, 
  name = null, 
  icon = null,
  description = null, 
  color = null, 
  supportEmail = null, 
  website = null }) {

  return {
    "f_type": "Service",
    f_vsn,
    type,
    method,
    uid,
    endpoint,
    optIn,
    "provider": {
      address,
      name,
      icon,
      description,
      color,
      supportEmail,
      website
    }
  }
}