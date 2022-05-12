export const isGreaterThanOrEqualToVersion = (newVersion, supportedVersion) => {
  if (!newVersion || !supportedVersion) return false

  const [newVersionNoAlpha, newAlpha] = newVersion.split("-")
  const [oldVersionNoAlpha, oldAlpha] = supportedVersion.split("-")
  const newSplit = newVersionNoAlpha.split(".")
  const oldSplit = oldVersionNoAlpha.split(".")

  for (let i = 0; i < 3; i++) {
    // If greater, return true
    if (parseInt(newSplit[i]) > parseInt(oldSplit[i])) return true

    // If above condition is not met, then if they are equal check next
    if (parseInt(newSplit[i]) === parseInt(oldSplit[i])) {
      // Check patch for alpha
      if (i === 2) {
        // If neither contain alpha, return true
        if (
          !newVersion.includes("alpha") &&
          !supportedVersion.includes("alpha")
        )
          return true

        // If new contains alpha, but supported does not return true
        if (newVersion.includes("alpha") && !supportedVersion.includes("alpha"))
          return false

        // If new version does not have alpha, but supported does then it's not new enough
        if (!newVersion.includes("alpha") && supportedVersion.includes("alpha"))
          return true

        const newAlphaVersion = newAlpha.split(".")[1]
        const oldAlphaVersion = oldAlpha.split(".")[1]
        if (parseInt(newAlphaVersion) >= parseInt(oldAlphaVersion)) return true
      }
    }
  }

  return false
}
