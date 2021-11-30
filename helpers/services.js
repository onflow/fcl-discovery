import equal from 'fast-deep-equal'

// Filters services based on deep equal comparison
const filterUniqueServices = services => {
  let foundServices = []

  for (const service of services) {
    let uniqueService = true
    for (const foundService of foundServices) {
      if (equal(service, foundService)) {
        uniqueService = false
      }
    }

    if (uniqueService) foundServices.push(service)
  }

  return foundServices
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