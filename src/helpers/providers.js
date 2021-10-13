const filterUniqueProviders = providers => {
  let foundIds = []
  return providers.filter(p => {
    if (foundIds.includes(p.id)) {
      return false
    } else {
      foundIds.push(p.id)
      return true
    }
  })
}

export const combineProviders = (existingProviders, newProviders, front = false) => {
  let combined
  if (front) {
    combined = newProviders.concat(existingProviders)
  } else {
    combined = existingProviders.concat(newProviders) 
  }
  return filterUniqueProviders(combined)
}