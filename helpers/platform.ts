import { USER_AGENTS_SUBSTRINGS } from './constants'

export const getUserAgent = () => window?.navigator?.userAgent

export const hasUserAgent = (type: string) =>
  window?.navigator?.userAgent.includes(type)

export const getBrowserFromUserAgent = (userAgent: string) => {
  for (const value of Object.values(USER_AGENTS_SUBSTRINGS)) {
    if (userAgent?.includes(value)) {
      return value
    }
  }
}

export function isMobile(userAgent: string) {
  return /Android|iPhone|iPad|iPod/i.test(userAgent)
}
