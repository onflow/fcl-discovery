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

export type DeviceInfo = {
  type: DeviceType.MOBILE | DeviceType.DESKTOP
  platform: MobilePlatform
  browser: Browser
  isTablet: boolean
}

export const getDeviceInfo = (userAgent: string): DeviceInfo => {
  return {
    type: isMobile(userAgent) ? DeviceType.MOBILE : DeviceType.DESKTOP,
    isTablet: isTablet(userAgent),
    platform: getMobilePlatform(userAgent),
    browser: getBrowserFromUserAgent(userAgent),
  }
}

export const getBrowserFromUserAgent = (userAgent: string) => {
  for (const [k, v] of Object.entries(USER_AGENTS_SUBSTRINGS)) {
    const values = Array.isArray(v) ? v : [v]
    for (const value of values) {
      if (userAgent?.includes(value)) {
        return k as Browser
      }
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
