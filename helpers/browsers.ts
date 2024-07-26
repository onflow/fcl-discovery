export enum BrowserType {
  CHROME = 'chrome',
}

export function getBrowserType(userAgent: string): BrowserType {
  if (userAgent.includes('Chrome')) {
    return BrowserType.CHROME
  }

  throw new Error('Unsupported browser')
}
