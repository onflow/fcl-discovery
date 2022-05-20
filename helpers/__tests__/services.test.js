import { USER_AGENTS } from '../constants'
import {
  combineServices,
  filterOptInServices,
  filterServicesByPlatform,
  getServiceByAddress,
  serviceListOfType,
  sortByAddress,
} from '../services'

jest.mock(
  '../../data/metadata.json',
  () => ({
    'test-address': {
      platforms: {
        chrome: {
          installLink: 'https://www.onflow.org',
        },
      },
    },
  }),
  { virtual: true }
)

describe('services helpers: combineServices', () => {
  it('should combine services with right ordering and filter unique', () => {
    const serviceA = {
      endpoint: 'https://flow-wallet.blocto.app/authn',
      provider: {
        address: 1,
        name: 'Blocto',
      },
    }

    const serviceB = {
      endpoint: 'https://fcl-ledger.onflow.org/mainnet/authn',
      provider: {
        address: 2,
        name: 'Ledger',
      },
    }

    const serviceC = {
      endpoint: 'liquality',
      provider: {
        address: 3,
        name: 'Liquality Wallet Extension',
      },
    }

    const serviceListOne = [serviceA, serviceB]
    const serviceListTwo = [serviceC, serviceC]
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

    const serviceList = [serviceA, serviceB, serviceC]

    expect(serviceListOfType(serviceList, 'authn').length).toEqual(1)
    expect(serviceListOfType(serviceList, 'authn')[0]).toEqual(serviceA)
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

    expect(filterOptInServices(serviceListA, includeListA).length).toEqual(2)
    expect(filterOptInServices(serviceListA, includeListA)).toEqual(
      expectedResponseA
    )
    expect(filterOptInServices(serviceListB, includeListB).length).toEqual(3)
    expect(filterOptInServices(serviceListB, includeListB)).toEqual(
      expectedResponseB
    )
  })
})

describe('services helpers: getServiceByAddress', () => {
  it('should pick correct address', () => {
    const address = '0xB'

    const serviceA = {
      type: 'authn',
      provider: {
        address: '0xA',
      },
    }

    const serviceB = {
      type: 'authn',
      provider: {
        address: address,
      },
    }

    const serviceC = {
      type: 'authn',
      provider: {
        address: '0xC',
      },
    }

    const services = [serviceA, serviceB, serviceC]

    expect(getServiceByAddress(services, address)).toEqual(serviceB)
  })
})

describe('services helpers: sortByAddress', () => {
  it('should put selected installed first', () => {
    const address = '0xB'

    const serviceA = {
      type: 'authn',
      provider: {
        address: '0xA',
      },
    }

    const serviceB = {
      type: 'authn',
      provider: {
        address: address,
      },
    }

    const serviceC = {
      type: 'authn',
      provider: {
        address: '0xC',
      },
    }

    const services = [serviceA, serviceB, serviceC]
    const expectedRes = [serviceB, serviceA, serviceC]

    expect(sortByAddress(services, address)).toEqual(expectedRes)
  })

  it('if no selected address it should return services as is', () => {
    const address = null

    const serviceA = {
      type: 'authn',
      provider: {
        address: '0xA',
      },
    }

    const serviceB = {
      type: 'authn',
      provider: {
        address: '0xB',
      },
    }

    const serviceC = {
      type: 'authn',
      provider: {
        address: '0xC',
      },
    }

    const services = [serviceA, serviceB, serviceC]

    expect(sortByAddress(services, address)).toEqual(services)
  })

  it('if selected address is not in services it should return services as is', () => {
    const address = '0xC'

    const serviceA = {
      type: 'authn',
      provider: {
        address: '0xA',
      },
    }

    const serviceB = {
      type: 'authn',
      provider: {
        address: '0xB',
      },
    }

    const services = [serviceA, serviceB]

    expect(sortByAddress(services, address)).toEqual(services)
  })
})

describe('services helpers: filterServicesByPlatform', () => {
  it('should filter services if they do not have required platform', () => {
    const platform = USER_AGENTS.CHROME

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
    const expectedRes = [serviceA, serviceC]

    expect(filterServicesByPlatform(platform)(services)).toEqual(expectedRes)
  })

  it('should show all services if no platform defined', () => {
    const platform = null

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
    const expectedRes = [serviceA, serviceB, serviceC]

    expect(filterServicesByPlatform(platform)(services)).toEqual(expectedRes)
  })
})
