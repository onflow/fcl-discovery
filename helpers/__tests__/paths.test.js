import {createPathFromArray, isValidPath, getNetworkFromPath} from "../paths"

describe("paths helpers: createPathFromArray", () => {
  it("should create paths from array of directories", () => {
    const arrOne = ["authn"]
    const arrTwo = ["testnet", "authn"]
    const arrThree = ["canarynet", "authn"]

    const expectedResponseOne = "/authn"
    const expectedResponseTwo = "/testnet/authn"
    const expectedResponseThree = "/canarynet/authn"

    expect(createPathFromArray(arrOne)).toEqual(expectedResponseOne)
    expect(createPathFromArray(arrTwo)).toEqual(expectedResponseTwo)
    expect(createPathFromArray(arrThree)).toEqual(expectedResponseThree)
  })
})

describe("paths helpers: isValidPath", () => {
  it("should check a path is valid", () => {
    const pathOne = ["authn"]
    const pathTwo = ["testnet", "authn"]
    const pathThree = ["canarynet", "authn"]
    const pathFour = ["foo", "bar"]

    expect(isValidPath(pathOne)).toBe(true)
    expect(isValidPath(pathTwo)).toBe(true)
    expect(isValidPath(pathThree)).toBe(true)
    expect(isValidPath(pathFour)).toBe(false)
  })
})

describe("paths helpers: getNetworkFromPath", () => {
  it("should check a path is valid", () => {
    const pathOne = ["authn"]
    const pathTwo = ["testnet", "authn"]
    const pathThree = ["canarynet", "authn"]

    expect(getNetworkFromPath(pathOne)).toEqual("mainnet")
    expect(getNetworkFromPath(pathTwo)).toEqual("testnet")
    expect(getNetworkFromPath(pathThree)).toEqual("canarynet")
  })
})
