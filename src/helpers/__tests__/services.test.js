import { combineServices, serviceListOfType } from "../services";

describe('services helpers: combineServices', () => {
  it('should combine services with right ordering and filter unique', () => {

    const serviceA = {
      "id": 1,
      "endpoint": "https://flow-wallet.blocto.app/authn",
      "provider": {
        "name": "Blocto",
        "icon": "/images/blocto.png",
        "description": "Your Entrance To The Blockchain World.",
        "color": "#afd8f7",
        "supportEmail": "support@blocto.app",
        "website": "https://blocto.portto.io",
        "enabled": true
      }
    }

    const serviceB = {
      "id": 3,
      "endpoint": "https://fcl-ledger.onflow.org/mainnet/authn",
      "provider": {
        "name": "Ledger",
        "icon": "/images/ledger.jpg",
        "description": "Ledger wallets, designed with the highest security standards.",
        "color": "#1e2029",
        "supportEmail": "support@ledger.com",
        "website": "https://ledger.com",
        "enabled": true
      }
    }

    const serviceC = {
      f_type: "Service",
      f_vsn: "1.0.0",
      type: "authn",
      uid: "liquality-wallet#authn",
      endpoint: "liquality",
      id: "0xf8d6e0586b0a20c7",
      identity: {
        address: "0xf8d6e0586b0a20c7",
      },
      provider: {
        address: null,
        name: "Liquality Wallet Extension",
        icon: null,
        description: "Liquality Wallet Extension for Chrome",
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