import { getVersionFromString, hasValidVersion, isSameOrNewerThanVersion } from "../version"

describe('version helpers: getVersionFromString', () => {
  it('should parse version from string', () => {
    expect(getVersionFromString('0.0.78')).toEqual({
      majorVersion: '0',
      minorVersion: '0',
      patchNumber: '78',
      patchType: undefined
    })
    expect(getVersionFromString('0.0.78-alpha')).toEqual({
      majorVersion: '0',
      minorVersion: '0',
      patchNumber: '78',
      patchType: 'alpha'
    })
  })
})

describe('version helpers: hasValidVersion', () => {
  it('should check parsed version is valid', () => {
    const versionA = {
      majorVersion: '0',
      minorVersion: '0',
      patchNumber: '78',
      patchType: undefined
    }

    const versionB = {
      majorVersion: '0',
      minorVersion: '0',
      patchNumber: '78',
      patchType: null
    }

    const versionC = {
      majorVersion: '0',
      minorVersion: '0',
      patchNumber: '78',
      patchType: 'alpha'
    }

    const versionD = {
      majorVersion: null,
      minorVersion: null,
      patchNumber: null,
      patchType: null
    }

    const versionE = {
      majorVersion: null,
      minorVersion: undefined,
      patchNumber: null,
      patchType: null
    }

    const versionF = {
      majorVersion: null,
      minorVersion: null,
      patchNumber: '78',
      patchType: null
    }

    const versionG = {}

    expect(hasValidVersion(versionA)).toEqual(true)
    expect(hasValidVersion(versionB)).toEqual(true)
    expect(hasValidVersion(versionC)).toEqual(true)
    expect(hasValidVersion(versionD)).toEqual(false)
    expect(hasValidVersion(versionE)).toEqual(false)
    expect(hasValidVersion(versionF)).toEqual(false)
    expect(hasValidVersion(versionG)).toEqual(false)
  })
})

describe('version helpers: isSameOrNewerThanVersion', () => {
  it('should check if version is same or newer than other version', () => {
    const supportedVersion = {
      majorVersion: '0',
      minorVersion: '0',
      patchNumber: '77',
      patchType: undefined
    }

    const versionA = {
      majorVersion: '0',
      minorVersion: '0',
      patchNumber: '77',
      patchType: undefined
    }

    const versionB = {
      majorVersion: '0',
      minorVersion: '0',
      patchNumber: '77',
      patchType: 'alpha'
    }

    const versionC = {
      majorVersion: '0',
      minorVersion: '0',
      patchNumber: '78',
      patchType: undefined
    }

    const versionD = {
      majorVersion: '0',
      minorVersion: '0',
      patchNumber: '78',
      patchType: 'alpha'
    }

    const versionE = {
      majorVersion: '0',
      minorVersion: '0',
      patchNumber: '76',
      patchType: undefined
    }

    expect(isSameOrNewerThanVersion(versionA, supportedVersion)).toEqual(true)
    expect(isSameOrNewerThanVersion(versionB, supportedVersion)).toEqual(true)
    expect(isSameOrNewerThanVersion(versionC, supportedVersion)).toEqual(true)
    expect(isSameOrNewerThanVersion(versionD, supportedVersion)).toEqual(true)
    expect(isSameOrNewerThanVersion(versionE, supportedVersion)).toEqual(false)
  })
})