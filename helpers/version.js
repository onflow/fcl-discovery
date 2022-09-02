export const isGreaterThanOrEqualToVersion = (version, supportedVersion) => {
  if (!version || !supportedVersion) return false

  const [versionNoAlpha, newAlpha] = version.split('-')
  const [supportedVersionNoAlpha, supportedAlpha] = supportedVersion.split('-')
  const versionSplit = versionNoAlpha.split('.')
  const supportedVersionSplit = supportedVersionNoAlpha.split('.')

  for (let i = 0; i < 3; i++) {
    // If greater, return true
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

export const findMatchingPipeVersion = (version, servicePipes) => {
  for (const [index, servicePipe] of servicePipes.entries()) {
    const nextServicePipe = servicePipes.at(index + 1)
    if (
      !nextServicePipe &&
      isGreaterThanOrEqualToVersion(version, servicePipe.supportedVersion)
    )
      return servicePipe.pipe

    if (
      isGreaterThanOrEqualToVersion(version, servicePipe.supportedVersion) &&
      !isGreaterThanOrEqualToVersion(version, nextServicePipe.supportedVersion)
    ) {
      return servicePipe.pipe
    }
  }

  throw new Error('Incompatible FCL version')
}
