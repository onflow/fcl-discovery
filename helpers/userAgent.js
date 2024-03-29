import { USER_AGENTS_SUBSTRINGS } from './constants'

export const getUserAgent = () => window?.navigator?.userAgent

export const hasUserAgent = type => window?.navigator?.userAgent.includes(type)

export const getPlatform = () => {
  for (const value of Object.values(USER_AGENTS_SUBSTRINGS)) {
    if (hasUserAgent(value)) {
      return value
    }
  }
}

export const getPlatformFromUserAgent = userAgent => {
  for (const value of Object.values(USER_AGENTS_SUBSTRINGS)) {
    if (userAgent?.includes(value)) {
      return value
    }
  }
}
