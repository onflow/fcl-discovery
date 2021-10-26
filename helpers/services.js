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
