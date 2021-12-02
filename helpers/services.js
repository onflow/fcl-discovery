const filterUniqueServices = services => {
  let foundIds = []
  return services.filter(p => {
    if (foundIds.includes(p.id)) {
      return false
    } else {
      foundIds.push(p.id)
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

export const constructApiQueryParams = ({ version, include }) => {
  let queryStr = ""

  if (version) {
    queryStr = queryStr.concat(`fcl_version=${version}&`)
  }
  
  if (include) {
    const includeQueryStr = include.map(addr => `include=${addr}`).join('&')
    queryStr = queryStr.concat(includeQueryStr)
  }

  return queryStr.length ? `?${queryStr}` : ""
}