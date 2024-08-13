import ChromeIcon from '../components/Icons/chrome.svg'
import FirefoxIcon from '../components/Icons/firefox.svg'
import SafariIcon from '../components/Icons/safari.svg'
import EdgeIcon from '../components/Icons/edge.svg'
import OperaIcon from '../components/Icons/opera.svg'

export enum Browser {
  CHROME = 'chrome',
  FIREFOX = 'firefox',
  SAFARI = 'safari',
  EDGE = 'edge',
  OPERA = 'opera',
  UNKNOWN = 'unknown',
}

export function getBrowserInfo(browser: Browser): {
  name: string
  icon: string
} {
  switch (browser) {
    case Browser.CHROME:
      return {
        name: 'Chrome',
        icon: ChromeIcon,
      }
    case Browser.FIREFOX:
      return {
        name: 'Firefox',
        icon: FirefoxIcon,
      }
    case Browser.SAFARI:
      return {
        name: 'Safari',
        icon: SafariIcon,
      }
    case Browser.OPERA:
      return {
        name: 'Opera',
        icon: OperaIcon,
      }
    case Browser.EDGE:
      return {
        name: 'Edge',
        icon: EdgeIcon,
      }
    case Browser.UNKNOWN:
      return {
        name: 'Browser',
        icon: ChromeIcon,
      }
    default:
      // Make sure to add a case for each browser
      const _exhaustiveCheck: never = browser
      return {
        name: 'Browser',
        icon: ChromeIcon,
      }
  }
}
