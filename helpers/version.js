export const isGreaterThanOrEqualToVersion = (version, supportedVersion) => {
  if (!version || !supportedVersion) return false

  const [versionNoAlpha, newAlpha] = version.split('-')
  const [supportedVersionNoAlpha, supportedAlpha] = supportedVersion.split('-')
  const versionSplit = versionNoAlpha.split('.')
  const supportedVersionSplit = supportedVersionNoAlpha.split('.')

  for (let i = 0; i < 3; i++) {
    // If greater, return true
    console.log('versionSplit[i]', versionSplit[i])
    console.log('supportedVersionSplit[i]', supportedVersionSplit[i])
    if (parseInt(versionSplit[i]) > parseInt(supportedVersionSplit[i]))
      return true
    if (parseInt(versionSplit[i]) < parseInt(supportedVersionSplit[i]))
      return false

    // If above condition is not met, then if they are equal check next
    if (parseInt(versionSplit[i]) === parseInt(supportedVersionSplit[i])) {
      // Check patch for alpha
      if (i === 2) {
        // If neither contain alpha, return true
        if (!version.includes('alpha') && !supportedVersion.includes('alpha'))
          return true

        // If new contains alpha, but supported does not return true
        if (version.includes('alpha') && !supportedVersion.includes('alpha'))
          return false

        // If new version does not have alpha, but supported does then it's not new enough
        if (!version.includes('alpha') && supportedVersion.includes('alpha'))
          return true

        const newAlphaVersion = newAlpha.split('.')[1]
        const supportedAlphaVersion = supportedAlpha.split('.')[1]
        if (parseInt(newAlphaVersion) >= parseInt(supportedAlphaVersion))
          return true
      }
    }
  }

  return false
}
