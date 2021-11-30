import {combineServices, filterListedExtensions, serviceListOfProp} from "../services"

describe("services helpers: combineServices", () => {
  it("should combine services with right ordering and filter unique", () => {
    const serviceA = {
      id: 1,
      endpoint: "https://flow-wallet.blocto.app/authn",
      provider: {
        name: "Blocto",
      },
    }

    const serviceB = {
      id: 2,
      endpoint: "https://fcl-ledger.onflow.org/mainnet/authn",
      provider: {
        name: "Ledger",
      },
    }

    const serviceC = {
      id: 3,
      endpoint: "liquality",
      provider: {
        name: "Liquality Wallet Extension",
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

describe("services helpers: serviceListOfProp", () => {
  it("should combine services with right ordering and filter unique", () => {
    const serviceA = {
      id: 1,
      type: "authn",
    }

    const serviceB = {
      id: 2,
      type: "authz",
    }

    const serviceC = {
      id: 2,
      type: "pre-authz",
    }

    const serviceList = [serviceA, serviceB, serviceC]

    expect(serviceListOfProp(serviceList, "type", "authn").length).toEqual(1)
    expect(serviceListOfProp(serviceList, "type", "authn")[0]).toEqual(serviceA)
  })
})

describe("services helpers: filterListedExtensions", () => {
  it("should filter out extensions that are not listed in services", () => {
    const serviceA = {
      "platform": "web/extension",
      "provider": {
        "name": "Extension One"
      }
    }

    const serviceB = {
      "platform": "web/extension",
      "provider": {
        "name": "Extension Two"
      }
    }

    const serviceList = [serviceA, serviceB]
    const extensions = [serviceA]
    const expectedResponse = [serviceA]

    expect(filterListedExtensions(serviceList, extensions).length).toEqual(1)
    expect(filterListedExtensions(serviceList, extensions)).toEqual(expectedResponse)
  })
})