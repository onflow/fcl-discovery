import { Browser } from './browsers'
import { USER_AGENTS_SUBSTRINGS } from './constants'

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
  browser: Browser
}

export type MobileDeviceInfo = BaseDeviceInfo & {
  type: DeviceType.MOBILE
  platform: MobilePlatform
  isTablet: boolean
}

export type DesktopDeviceInfo = BaseDeviceInfo & {
  type: DeviceType.DESKTOP
  platform: DesktopPlatform
}

export type DeviceInfo = MobileDeviceInfo | DesktopDeviceInfo

export const getDeviceInfo = (userAgent: string): DeviceInfo => {
  const browser = getBrowserFromUserAgent(userAgent)

  if (isMobile(userAgent)) {
    const info = {
      type: DeviceType.MOBILE,
      isTablet: isTablet(userAgent),
      platform: getMobilePlatform(userAgent),
      browser,
    } as MobileDeviceInfo

    return info
  } else {
    return {
      type: DeviceType.DESKTOP,
      platform: getDesktopPlatform(userAgent),
      browser,
    } as DesktopDeviceInfo
  }
}

export const getBrowserFromUserAgent = (userAgent: string) => {
  for (const value of Object.values(USER_AGENTS_SUBSTRINGS)) {
    if (userAgent?.includes(value)) {
      return value
    }
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
