import blocto from '../../data/wallets/blocto/blocto'
import flowWallet from '../../data/wallets/flow-wallet/flow-wallet'
import { USER_AGENTS_SUBSTRINGS } from '../constants'
import { legacyProviderToWallet } from '../inject-wallets'
import {
  combineServices,
  filterOptInServices,
  filterServicesByPlatform,
  filterUniqueServices,
  serviceListOfType,
} from '../services'
import { walletsForNetwork } from '../wallets'

jest.mock(
  '../../data/metadata.json',
  () => ({
    'test-address': {
      platforms: {
        chrome: {
          install_link: 'https://www.onflow.org',
        },
      },
    },
  }),
  { virtual: true }
)

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
      serviceList
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
      serviceList
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
      expectedListOne
    )
    expect(combineServices(serviceListOne, serviceListTwo, true)).toEqual(
      expectedListTwo
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
      type: 'authn',
      provider: {
        address: '0xA',
      },
    }

    const serviceB = {
      type: 'authz',
      provider: {
        address: '0xB',
      },
    }

    const serviceC = {
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

    const walletsA = serviceListA.map(x => legacyProviderToWallet(x.provider))
    const walletsB = serviceListB.map(x => legacyProviderToWallet(x.provider))

    const filterOptInServicesA = filterOptInServices({
      wallets: walletsA,
      includeList: includeListA,
    })
    const filterOptInServicesB = filterOptInServices({
      wallets: walletsB,
      includeList: includeListB,
    })

    expect(filterOptInServicesA(serviceListA).length).toEqual(2)
    expect(filterOptInServicesB(serviceListA)).toEqual(expectedResponseA)
    expect(filterOptInServicesB(serviceListB).length).toEqual(3)
    expect(filterOptInServicesB(serviceListB)).toEqual(expectedResponseB)
  })
})

describe('services helpers: filterServicesByPlatform', () => {
  it('should filter services if they do not have required platform', () => {
    const platform = USER_AGENTS_SUBSTRINGS.CHROME

    const serviceA = {
      type: 'authn',
      method: 'EXT/RPC',
      provider: {
        address: 'test-address',
      },
    }

    const serviceB = {
      type: 'authn',
      method: 'EXT/RPC',
      provider: {
        address: '0x123',
      },
    }

    const serviceC = {
      type: 'authn',
      method: 'IFRAME/RPC',
      provider: {
        address: '0xC',
      },
    }

    const services = [serviceA, serviceB, serviceC]
    const wallets = services.map(x => legacyProviderToWallet(x.provider))
    const expectedRes = [serviceA, serviceB, serviceC]

    expect(filterServicesByPlatform({ wallets, platform })(services)).toEqual(
      expectedRes
    )
  })
})
