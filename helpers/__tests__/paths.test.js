import { createPathFromArray } from "../paths"

describe('paths helpers: createPathFromArray', () => {
  it('should create paths from array of directories', () => {
    const arrOne = ['authn']
    const arrTwo = ['testnet', 'authn']
    const arrThree = ['canarynet', 'authn']

    const expectedResponseOne = '/authn'
    const expectedResponseTwo = '/testnet/authn'
    const expectedResponseThree = '/canarynet/authn'

    expect(createPathFromArray(arrOne)).toEqual(expectedResponseOne)
    expect(createPathFromArray(arrTwo)).toEqual(expectedResponseTwo)
    expect(createPathFromArray(arrThree)).toEqual(expectedResponseThree)
  })
})