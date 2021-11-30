import equal from 'fast-deep-equal'

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

export const serviceListOfProp = (services = [], key, value) =>
  services.filter(service => service[key] === value)

// Filter out extensions that are not listed in services
export const filterListedExtensions = (services = [], extensions = []) => {
  return services.filter(service => {
    let showService = false

    for (const extension of extensions) {
      if (equal(extension, service)) {
        showService = true
      }
    }

    return showService
  })
}