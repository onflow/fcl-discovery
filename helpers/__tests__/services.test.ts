import { Service } from '../../types'
import { injectedServiceToWallet } from '../inject-wallets'
import {
  combineServices,
  filterExcludedServices,
  filterOptInServices,
  filterServicesByPlatform,
  filterUniqueServices,
  serviceListOfType,
} from '../services'
import { extractWalletServices } from '../wallets'

describe('services helpers: filterUniqueServices', () => {
  it('should filter services by address', () => {
    const serviceA = {
      endpoint: 'https://walletone.com/authn',
      provider: {
        address: 1,
        name: 'Wallet One',
      },
    }

    const serviceB = {
      endpoint: 'https://wallettwo.com/authn',
      provider: {
        address: 2,
        name: 'Wallet Two',
      },
    }

    const serviceC = {
      endpoint: 'https://walletthree.com/authn',
      provider: {
        address: 3,
        name: 'Wallet Three',
      },
    }

    const serviceD = {
      endpoint: 'https://walletthree.com/authn',
      provider: {
        address: 3,
        name: 'Wallet Three',
      },
    }

    const serviceList = [serviceA, serviceB, serviceC, serviceD]
    const expectedList = [serviceA, serviceB, serviceC]
    const filteredList = filterUniqueServices({ address: true, uid: false })(
      serviceList,
    )

    expect(filteredList).toEqual(expectedList)
    expect(filteredList.length).toEqual(3)
  })

  it('should filter services by uid or address', () => {
    const serviceA = {
      endpoint: 'https://walletone.com/authn',
      provider: {
        address: 1,
        name: 'Wallet One',
      },
    }

    const serviceB = {
      endpoint: 'https://wallettwo.com/authn',
      provider: {
        address: 2,
        name: 'Wallet Two',
      },
    }

    const serviceC = {
      endpoint: 'https://walletthree.com/authn',
      uid: 'walletthree#authn',
      provider: {
        address: null,
        name: 'Wallet Three',
      },
    }

    const serviceD = {
      endpoint: 'https://walletthree.com/authn',
      uid: 'walletthree#authn',
      provider: {
        address: null,
        name: 'Wallet Three',
      },
    }

    const serviceList = [serviceA, serviceB, serviceC, serviceD]
    const expectedList = [serviceA, serviceB, serviceC]
    const filteredList = filterUniqueServices({ address: true, uid: true })(
      serviceList,
    )

    expect(filteredList).toEqual(expectedList)
    expect(filteredList.length).toEqual(3)
  })
})

describe('services helpers: combineServices', () => {
  it('should combine services with right ordering', () => {
    const serviceA = {
      endpoint: 'https://walletone.com/authn',
      provider: {
        address: 1,
        name: 'Wallet One',
      },
    }

    const serviceB = {
      endpoint: 'https://wallettwo.com/authn',
      provider: {
        address: 2,
        name: 'Wallet Two',
      },
    }

    const serviceC = {
      endpoint: 'https://walletthree.com/authn',
      provider: {
        address: 3,
        name: 'Wallet Three',
      },
    }

    const serviceListOne = [serviceA, serviceB]
    const serviceListTwo = [serviceC]
    const expectedListOne = [serviceA, serviceB, serviceC]
    const expectedListTwo = [serviceC, serviceA, serviceB]

    expect(combineServices(serviceListOne, serviceListTwo)).toEqual(
      expectedListOne,
    )
    expect(combineServices(serviceListOne, serviceListTwo, true)).toEqual(
      expectedListTwo,
    )
  })
})

describe('services helpers: serviceListOfType', () => {
  it('should combine services with right ordering and filter unique', () => {
    const serviceA = {
      type: 'authn',
    }

    const serviceB = {
      type: 'authz',
    }

    const serviceC = {
      type: 'pre-authz',
    }

    const serviceList = serviceListOfType('authn')([
      serviceA,
      serviceB,
      serviceC,
    ])

    expect(serviceList.length).toEqual(1)
    expect(serviceList[0]).toEqual(serviceA)
  })
})

describe('services helpers: filterOptInServices', () => {
  it('should only include optIn services if specified', () => {
    const optInAddress = '0xC'

    const serviceA = {
      uid: 'a',
      type: 'authn',
      provider: {
        address: '0xA',
      },
    }

    const serviceB = {
      uid: 'b',
      type: 'authz',
      provider: {
        address: '0xB',
      },
    }

    const serviceC = {
      uid: 'c',
      type: 'pre-authz',
      optIn: true,
      provider: {
        address: optInAddress,
      },
    }

    const serviceListA = [serviceA, serviceB, serviceC]
    const includeListA = []
    const expectedResponseA = [serviceA, serviceB]

    const serviceListB = [serviceA, serviceB, serviceC]
    const includeListB = [optInAddress]
    const expectedResponseB = [serviceA, serviceB, serviceC]

    const walletsA = serviceListA.map(x =>
      injectedServiceToWallet(x as Service),
    )
    const walletsB = serviceListB.map(x =>
      injectedServiceToWallet(x as Service),
    )

    const filterOptInServicesA = filterOptInServices({
      wallets: walletsA,
      includeList: includeListA,
    })
    const filterOptInServicesB = filterOptInServices({
      wallets: walletsB,
      includeList: includeListB,
    })

    expect(filterOptInServicesA(serviceListA).length).toEqual(2)
    expect(filterOptInServicesA(serviceListA)).toEqual(expectedResponseA)
    expect(filterOptInServicesB(serviceListB).length).toEqual(3)
    expect(filterOptInServicesB(serviceListB)).toEqual(expectedResponseB)
  })
})

describe('services helpers: filterExcludedServices', () => {
  it('should filter out excluded services', () => {
    const excludeList = ['0xC']

    const serviceA = {
      uid: 'a',
      type: 'authn',
      provider: {
        address: '0xA',
      },
    }

    const serviceB = {
      uid: 'b',
      type: 'authz',
      provider: {
        address: '0xB',
      },
    }

    const serviceC = {
      uid: 'c',
      type: 'pre-authz',
      provider: {
        address: '0xC',
      },
    }

    const serviceList = [serviceA, serviceB, serviceC]
    const expectedResponse = [serviceA, serviceB]

    const wallets = serviceList.map(x => injectedServiceToWallet(x as Service))

    const result = filterExcludedServices({
      wallets,
      excludeList: excludeList,
    })(serviceList)

    expect(result.length).toEqual(2)
    expect(result).toEqual(expectedResponse)
  })
})

describe('services helpers: filterServicesByPlatform', () => {
  it('should filter services if they do not have required platform', () => {
    const platform = 'chrome'

    const serviceA = {
      uid: 'a',
      type: 'authn',
      method: 'EXT/RPC',
      provider: {
        address: 'test-address',
      },
      walletUid: 'test-address',
    }

    const serviceB = {
      uid: 'b',
      type: 'authn',
      method: 'EXT/RPC',
      provider: {
        address: '0x123',
      },
      walletUid: '0x123',
    }

    const serviceC = {
      uid: 'c',
      type: 'authn',
      method: 'IFRAME/RPC',
      provider: {
        address: '0xC',
      },
      walletUid: '0xC',
    }

    const wallets = [serviceA, serviceB, serviceC].map(x => ({
      ...injectedServiceToWallet(x as any),
      services: [x],
    }))
    const services = extractWalletServices(wallets as any)
    const extensions = []
    const expectedRes = [serviceA, serviceB, serviceC]

    expect(
      filterServicesByPlatform({ wallets, platform, extensions })(services),
    ).toEqual(expectedRes)
  })
})
