import { combineServices, serviceListOfType } from "../services";

describe('services helpers: combineServices', () => {
  it('should combine services with right ordering and filter unique', () => {

    const serviceA = {
      "id": 1,
      "endpoint": "https://flow-wallet.blocto.app/authn",
      "provider": {
        "name": "Blocto"
      }
    }

    const serviceB = {
      "id": 2,
      "endpoint": "https://fcl-ledger.onflow.org/mainnet/authn",
      "provider": {
        "name": "Ledger"
      }
    }

    const serviceC = {
      "id": 3,
      endpoint: "liquality",
      provider: {
        name: "Liquality Wallet Extension",
      }
    }

    const serviceListOne = [serviceA, serviceB]
    const serviceListTwo = [serviceC, serviceC]
    const expectedListOne = [serviceA, serviceB, serviceC]
    const expectedListTwo = [serviceC, serviceA, serviceB]

    expect(combineServices(serviceListOne, serviceListTwo)).toEqual(expectedListOne)
    expect(combineServices(serviceListOne, serviceListTwo, true)).toEqual(expectedListTwo)
  })
})

describe('services helpers: serviceListOfType', () => {
  it('should combine services with right ordering and filter unique', () => {

    const serviceA = {
      "id": 1,
      "type": "authn"
    }

    const serviceB = {
      "id": 2,
      "type": "authz"
    }

    const serviceC = {
      "id": 2,
      "type": "pre-authz"
    }

    const serviceList = [serviceA, serviceB, serviceC]

    expect(serviceListOfType(serviceList, "authn").length).toEqual(1)
    expect(serviceListOfType(serviceList, "authn")[0]).toEqual(serviceA)
  })
})