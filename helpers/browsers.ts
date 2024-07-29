import { BROWSERS } from './constants'

export function getBrowserInfo(
  userAgent: string
): typeof BROWSERS[keyof typeof BROWSERS] {
  if (userAgent.includes('Chrome')) {
    return BROWSERS.CHROME
  }

  return BROWSERS.BROWSER
}
