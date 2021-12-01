import {combineServices, constructApiQueryParams, filterOptInServices, serviceListOfType} from "../services"

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

describe("services helpers: serviceListOfType", () => {
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

    expect(serviceListOfType(serviceList, "authn").length).toEqual(1)
    expect(serviceListOfType(serviceList, "authn")[0]).toEqual(serviceA)
  })
})

describe("services helpers: filterOptInServices", () => {
  it("should only include optIn services if specified", () => {
    const optInAddress = "0xC"
    
    const serviceA = {
      type: "authn",
      provider: {
        address: "0xA"
      }
    }

    const serviceB = {
      type: "authz",
      provider: {
        address: "0xB"
      }
    }

    const serviceC = {
      type: "pre-authz",
      optIn: true,
      provider: {
        address: optInAddress
      }
    }

    const serviceListA = [serviceA, serviceB, serviceC]
    const includeListA = []
    const expectedResponseA = [serviceA, serviceB]

    const serviceListB = [serviceA, serviceB, serviceC]
    const includeListB = [optInAddress]
    const expectedResponseB = [serviceA, serviceB, serviceC]

    expect(filterOptInServices(serviceListA, includeListA).length).toEqual(2)
    expect(filterOptInServices(serviceListA, includeListA)).toEqual(expectedResponseA)
    expect(filterOptInServices(serviceListB, includeListB).length).toEqual(3)
    expect(filterOptInServices(serviceListB, includeListB)).toEqual(expectedResponseB)
  })
})

describe("constructApiQueryParams", () => {
  it("it should construct API query params", () => {
    const filters = {
      include: ["0x1", "0x2"]
    }

    expect(constructApiQueryParams(filters)).toEqual("?include=0x1&include=0x2")
  })
})