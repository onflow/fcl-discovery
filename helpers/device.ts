import { Browser } from './browsers'

export enum DeviceType {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}

export enum DesktopPlatform {
  MAC = 'mac',
  WINDOWS = 'windows',
  LINUX = 'linux',
  UNKNOWN = 'unknown',
}

export enum MobilePlatform {
  IOS = 'ios',
  ANDROID = 'android',
  UNKNOWN = 'unknown',
}

export type BaseDeviceInfo = {
  type: DeviceType
  platform: DesktopPlatform | MobilePlatform
  browser: Browser
  isTablet: boolean
}

export type DesktopInfo = {
  type: DeviceType.DESKTOP
  platform: DesktopPlatform
  browser: Browser
  isTablet: false
}

export type MobileInfo = {
  type: DeviceType.MOBILE
  platform: MobilePlatform
  browser: Browser
  isTablet: boolean
}

export type DeviceInfo = DesktopInfo | MobileInfo

export const getDeviceInfo = (userAgent: string): DeviceInfo => {
  if (isMobile(userAgent)) {
    return {
      type: DeviceType.MOBILE,
      isTablet: isTablet(userAgent),
      platform: getMobilePlatform(userAgent),
      browser: getBrowserFromUserAgent(userAgent),
    }
  }

  return {
    type: DeviceType.DESKTOP,
    isTablet: false,
    platform: getDesktopPlatform(userAgent),
    browser: getBrowserFromUserAgent(userAgent),
  }
}

export const getBrowserFromUserAgent = (userAgent: string) => {
  if (userAgent.includes('Opera') || userAgent.includes('OPR/')) {
    return Browser.OPERA
  } else if (userAgent.includes('Edg')) {
    return Browser.EDGE
  } else if (userAgent.includes('Chrome')) {
    return Browser.CHROME
  } else if (userAgent.includes('Safari')) {
    return Browser.SAFARI
  } else if (userAgent.includes('Firefox')) {
    return Browser.FIREFOX
  }
  return Browser.UNKNOWN
}

export function getDesktopPlatform(userAgent: string) {
  if (userAgent.includes('Mac')) {
    return DesktopPlatform.MAC
  } else if (userAgent.includes('Windows')) {
    return DesktopPlatform.WINDOWS
  } else if (userAgent.includes('Linux')) {
    return DesktopPlatform.LINUX
  }
  return DesktopPlatform.UNKNOWN
}

export function getMobilePlatform(userAgent: string) {
  if (isIOS(userAgent)) {
    return MobilePlatform.IOS
  } else if (isAndroid(userAgent)) {
    return MobilePlatform.ANDROID
  }
  return MobilePlatform.UNKNOWN
}

export function isTablet(userAgent: string) {
  return /iPad/i.test(userAgent)
}

export function isIOS(userAgent: string) {
  return /iPhone|iPad|iPod/i.test(userAgent)
}

export function isAndroid(userAgent: string) {
  return /Android/i.test(userAgent)
}

export function isMobile(userAgent: string) {
  return isIOS(userAgent) || isAndroid(userAgent)
}
