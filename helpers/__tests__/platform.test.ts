import { USER_AGENTS_SUBSTRINGS } from '../constants'
import { hasUserAgent } from '../platform'

const chromeUserAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36'
const safariUserAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_4) AppleWebKit/537.36 (KHTML, like Gecko) Version/15.3 Safari/537.36'

describe('Helpers: userAgent', () => {
  let windowSpy

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get')
  })

  afterEach(() => {
    windowSpy.mockRestore()
  })

  test('should check for present user agent', () => {
    windowSpy.mockImplementation(() => ({
      navigator: {
        userAgent: chromeUserAgent,
      },
    }))

    expect(hasUserAgent(USER_AGENTS_SUBSTRINGS.CHROME)).toBe(true)
  })

  test('should check for non-existant user agent', () => {
    windowSpy.mockImplementation(() => ({
      navigator: {
        userAgent: safariUserAgent,
      },
    }))

    expect(hasUserAgent(USER_AGENTS_SUBSTRINGS.CHROME)).toBe(false)
  })
})
