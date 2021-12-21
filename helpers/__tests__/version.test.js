import { isGreaterThanOrEqualToVersion } from "../version"

describe("isGreaterThanOrEqualToVersion", () => {
  it("it should check if versions are greater than or equal to", () => {
    const oldVersion = "0.0.78"
    const versionA = "0.0.77"
    const versionB = "0.0.77-alpha.2"
    const versionC = "0.0.78"
    const versionD = "0.0.78-alpha.3"
    const versionE = "0.0.79"
    const versionF = "0.0.79-alpha.1"
    const versionG = "1.0.79"
    const versionH = "1.0.79-alpha.2"
    const versionI = "1.0.79-alpha.3"
    expect(isGreaterThanOrEqualToVersion(versionA, oldVersion)).toEqual(false)
    expect(isGreaterThanOrEqualToVersion(versionB, oldVersion)).toEqual(false)
    expect(isGreaterThanOrEqualToVersion(versionC, oldVersion)).toEqual(true)
    expect(isGreaterThanOrEqualToVersion(versionD, oldVersion)).toEqual(true)
    expect(isGreaterThanOrEqualToVersion(versionE, oldVersion)).toEqual(true)
    expect(isGreaterThanOrEqualToVersion(versionF, oldVersion)).toEqual(true)
    expect(isGreaterThanOrEqualToVersion(versionG, oldVersion)).toEqual(true)
    expect(isGreaterThanOrEqualToVersion(versionH, oldVersion)).toEqual(true)
    expect(isGreaterThanOrEqualToVersion(versionI, versionH)).toEqual(true)
  })
})