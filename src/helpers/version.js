export const getVersionFromString = versionStr => {
  const [majorVersion, minorVersion, patchVersion] = versionStr.split('.')
  const [patchNumber, patchType] = patchVersion.split('-')
  return { majorVersion, minorVersion, patchNumber, patchType }
}

export const hasValidVersion = versionObj => {
  const keys = Object.keys(versionObj)
  const values = Object.values(versionObj)
  if (!keys.length || !values.length) return false
  return Boolean(versionObj.majorVersion) && Boolean(versionObj.majorVersion) && Boolean(versionObj.patchNumber)
}

// Takes version types created from getVersionFromString
export const isSameOrNewerThanVersion = (versionA, versionB) => {
  return parseInt(versionA.majorVersion) >= parseInt(versionB.majorVersion) &&
    parseInt(versionA.minorVersion) >= parseInt(versionB.minorVersion) &&
    parseInt(versionA.patchNumber) >= parseInt(versionB.patchNumber)
}