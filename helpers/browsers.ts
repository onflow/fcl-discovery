import ChromeIcon from '../components/Icons/chrome.svg'

export enum Browser {
  CHROME = 'chrome',
  FIREFOX = 'firefox',
  SAFARI = 'safari',
  EDGE = 'edge',
  OPERA = 'opera',
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
        icon: ChromeIcon,
      }
    case Browser.SAFARI:
      return {
        name: 'Safari',
        icon: ChromeIcon,
      }
    case Browser.OPERA:
      return {
        name: 'Opera',
        icon: ChromeIcon,
      }
    case Browser.EDGE:
      return {
        name: 'Edge',
        icon: ChromeIcon,
      }
    case null:
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
