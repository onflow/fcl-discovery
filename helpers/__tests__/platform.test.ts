import { Browser } from '../browsers'
import { DesktopPlatform, DeviceType, getDeviceInfo } from '../device'

describe('Helpers: userAgent', () => {
  test('should detect chrome desktop user agent', () => {
    const info = getDeviceInfo(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36',
    )
    expect(info.platform).toBe(DesktopPlatform.WINDOWS)
    expect(info.browser).toBe(Browser.CHROME)
    expect(info.type).toBe(DeviceType.DESKTOP)
    expect(info.isTablet).toBe(false)
  })

  test('should detect safari desktop user agent', () => {
    const info = getDeviceInfo(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15',
    )
    expect(info.platform).toBe(DesktopPlatform.MAC)
    expect(info.browser).toBe(Browser.SAFARI)
    expect(info.type).toBe(DeviceType.DESKTOP)
    expect(info.isTablet).toBe(false)
  })

  test('should detect chrome mobile user agent', () => {
    const info = getDeviceInfo(
      'Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Mobile Safari/537.36',
    )
    expect(info.platform).toBe('android')
    expect(info.browser).toBe(Browser.CHROME)
    expect(info.type).toBe(DeviceType.MOBILE)
    expect(info.isTablet).toBe(false)
  })

  test('should detect safari mobile user agent', () => {
    const info = getDeviceInfo(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Mobile/15E148 Safari/604.1',
    )
    expect(info.platform).toBe('ios')
    expect(info.browser).toBe(Browser.SAFARI)
    expect(info.type).toBe(DeviceType.MOBILE)
    expect(info.isTablet).toBe(false)
  })

  test('should detect firefox desktop user agent', () => {
    const info = getDeviceInfo(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0',
    )
    expect(info.platform).toBe(DesktopPlatform.WINDOWS)
    expect(info.browser).toBe(Browser.FIREFOX)
    expect(info.type).toBe(DeviceType.DESKTOP)
    expect(info.isTablet).toBe(false)
  })

  test('should detect firefox mobile user agent', () => {
    const info = getDeviceInfo(
      'Mozilla/5.0 (Android 12; Mobile; rv:100.0) Gecko/100.0 Firefox/100.0',
    )
    expect(info.platform).toBe('android')
    expect(info.browser).toBe(Browser.FIREFOX)
    expect(info.type).toBe(DeviceType.MOBILE)
    expect(info.isTablet).toBe(false)
  })

  test('should detect edge desktop user agent', () => {
    const info = getDeviceInfo(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 Edg/',
    )
    expect(info.platform).toBe(DesktopPlatform.WINDOWS)
    expect(info.browser).toBe(Browser.EDGE)
    expect(info.type).toBe(DeviceType.DESKTOP)
    expect(info.isTablet).toBe(false)
  })

  test('should detect edge mobile user agent', () => {
    const info = getDeviceInfo(
      'Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Mobile Safari/537.36 Edg/',
    )
    expect(info.platform).toBe('android')
    expect(info.browser).toBe(Browser.EDGE)
    expect(info.type).toBe(DeviceType.MOBILE)
    expect(info.isTablet).toBe(false)
  })

  test('should detect opera desktop user agent', () => {
    const info = getDeviceInfo(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/',
    )
    expect(info.platform).toBe(DesktopPlatform.WINDOWS)
    expect(info.browser).toBe(Browser.OPERA)
    expect(info.type).toBe(DeviceType.DESKTOP)
    expect(info.isTablet).toBe(false)
  })

  test('should detect opera mobile user agent', () => {
    const info = getDeviceInfo(
      'Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Mobile Safari/537.36 OPR/',
    )
    expect(info.platform).toBe('android')
    expect(info.browser).toBe(Browser.OPERA)
    expect(info.type).toBe(DeviceType.MOBILE)
    expect(info.isTablet).toBe(false)
  })

  test('should detect unknown browser user agent', () => {
    const info = getDeviceInfo('abcdefg')
    expect(info.platform).toBe(DesktopPlatform.UNKNOWN)
    expect(info.browser).toBe(Browser.UNKNOWN)
    expect(info.type).toBe(DeviceType.DESKTOP)
    expect(info.isTablet).toBe(false)
  })
})
