export enum BrowserType {
  CHROME = 'chrome',
}

export function getBrowserType(userAgent: string): BrowserType | null {
  if (userAgent.includes('Chrome')) {
    return BrowserType.CHROME
  }

  return null
}
