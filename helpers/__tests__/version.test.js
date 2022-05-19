import { isGreaterThanOrEqualToVersion } from '../version'

describe('isGreaterThanOrEqualToVersion', () => {
  it('it should check if versions are greater than or equal to', () => {
    const supportedVersion = '0.0.78'
    const versionA = '0.0.77'
    const versionB = '0.0.77-alpha.2'
    const versionC = '0.0.78'
    const versionD = '0.0.78-alpha.3'
    const versionE = '0.0.79'
    const versionF = '0.0.79-alpha.1'
    const versionG = '1.0.79'
    const versionH = '1.0.79-alpha.2'
    const versionI = '1.0.79-alpha.3'
    const versionJ = '0.0.78-alpha.9'
    const versionK = '0.0.78-alpha.10'
    const versionL = '1.0.0'
    const versionM = '1.2.0'
    expect(isGreaterThanOrEqualToVersion(versionA, supportedVersion)).toEqual(
      false
    )
    expect(isGreaterThanOrEqualToVersion(versionB, supportedVersion)).toEqual(
      false
    )
    expect(isGreaterThanOrEqualToVersion(versionC, supportedVersion)).toEqual(
      true
    )
    expect(isGreaterThanOrEqualToVersion(versionD, supportedVersion)).toEqual(
      false
    )
    expect(isGreaterThanOrEqualToVersion(versionD, versionC)).toEqual(false)
    expect(isGreaterThanOrEqualToVersion(versionC, versionD)).toEqual(true)
    expect(isGreaterThanOrEqualToVersion(versionE, supportedVersion)).toEqual(
      true
    )
    expect(isGreaterThanOrEqualToVersion(versionF, supportedVersion)).toEqual(
      true
    )
    expect(isGreaterThanOrEqualToVersion(versionG, supportedVersion)).toEqual(
      true
    )
    expect(isGreaterThanOrEqualToVersion(versionH, supportedVersion)).toEqual(
      true
    )
    expect(isGreaterThanOrEqualToVersion(versionI, versionH)).toEqual(true)
    expect(isGreaterThanOrEqualToVersion(versionK, versionJ)).toEqual(true)
    expect(isGreaterThanOrEqualToVersion(versionJ, versionK)).toEqual(false)
    expect(isGreaterThanOrEqualToVersion(versionL, versionM)).toEqual(false)
    expect(isGreaterThanOrEqualToVersion(versionC, versionM)).toEqual(false)
    expect(isGreaterThanOrEqualToVersion(versionM, versionL)).toEqual(true)
    expect(isGreaterThanOrEqualToVersion(versionC, versionK)).toEqual(false)
  })
})
