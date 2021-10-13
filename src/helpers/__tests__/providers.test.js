import { combineProviders } from "../providers";

describe('providers helpers: combineProviders', () => {
  it('should combine providers with right ordering and filter unique', () => {

    const providerA = {
      "id": 1,
      "provider": {
        "name": "Blocto",
        "icon": "/images/blocto.png",
        "description": "Your Entrance To The Blockchain World.",
        "color": "#afd8f7",
        "contact_email": "support@blocto.app",
        "authn_endpoint": "https://flow-wallet.blocto.app/authn",
        "origin": "https://blocto.portto.io",
        "enabled": true
      }
    }

    const providerB = {
      "id": 3,
      "provider": {
        "name": "Ledger",
        "icon": "/images/ledger.jpg",
        "description": "Ledger wallets, designed with the highest security standards.",
        "color": "#1e2029",
        "contact_email": "support@ledger.com",
        "authn_endpoint": "https://fcl-ledger.onflow.org/mainnet/authn",
        "origin": "https://ledger.com",
        "enabled": true
      }
    }

    const providerC = {
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

    const providerListOne = [providerA, providerB]
    const providerListTwo = [providerC, providerC]
    const expectedListOne = [providerA, providerB, providerC]
    const expectedListTwo = [providerC, providerA, providerB]

    expect(combineProviders(providerListOne, providerListTwo)).toEqual(expectedListOne)
    expect(combineProviders(providerListOne, providerListTwo, true)).toEqual(expectedListTwo)
  })
})