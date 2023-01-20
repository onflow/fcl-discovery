import { isTestnet } from '../networks'

describe('Helpers: networks', () => {
  let windowSpy

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get')
  })

  afterEach(() => {
    windowSpy.mockRestore()
  })

  test('should check for testnet', () => {
    windowSpy.mockImplementation(() => ({
      location: {
        pathname: '/testnet/authn',
      },
    }))

    expect(isTestnet()).toBe(true)
  })

  test('should fail if not testnet', () => {
    windowSpy.mockImplementation(() => ({
      location: {
        pathname: '/mainnet/authn',
      },
    }))

    expect(isTestnet()).toBe(false)
  })
})
