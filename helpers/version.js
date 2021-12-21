export const isGreaterThanOrEqualToVersion = (newVersion, oldVersion) => {
  // const [newMajor, newMinor, newPatch] = newVersion.split('.')
  // const [oldMajor, oldMinor, oldPatch] = oldVersion.split('.')

  // const result = false
  
  // // If major is greater than or equal to it passes
  // if (parseInt(newMajor) >= parseInt(oldMajor)) result = true
  
  // // If majors are the same
  // if (parseInt(newMajor) === parseInt(oldMajor)) {

  //   // If minor version gte then true
  //   if (parseInt(newMinor) >= parseInt(oldMinor)) result = true

  //   // If the same, check patch
  //   if (parseInt(newMinor) === parseInt(oldMinor)) {

  //     // If patch the same, return
  //     if (p)
  //   }

  // }
  // return result

  console.log('newVersion', newVersion)
  console.log('oldVersion', oldVersion)

  const [newVersionNoAlpha, newAlpha] = newVersion.split('-')
  const [oldVersionNoAlpha, oldAlpha] = oldVersion.split('-')
  const newSplit = newVersionNoAlpha.split('.')
  const oldSplit = oldVersionNoAlpha.split('.')

  for (let i = 0; i < 3; i++) {
    
    // If greater, return true
    if (parseInt(newSplit[i]) > parseInt(oldSplit[i])) return true

    // If above condition is not met, then if they are equal check next
    if (parseInt(newSplit[i]) === parseInt(oldSplit[i])) {

      // Check patch for alpha
      if (i === 2) {

        // If neither contain alpha, return true
        if (!newSplit[i].includes('alpha') && !oldSplit[i].includes('alpha')) return true
        
        // If new contains alpha, but old does not return true
        if (newSplit[i].includes('alpha') && !oldSplit[i].includes('alpha')) return true

        const newAlphaVersion = newSplit[i].split('.')[1]
        const oldAlphaVersion = oldSplit[i].split('.')[1]
        if (parseInt(newAlphaVersion) >= parseInt(oldAlphaVersion)) return true
      }
      
    }
  }

  return false
}