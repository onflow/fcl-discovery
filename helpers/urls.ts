export function replacePort(currentUrl: string, portOverride: string): string {
  let url = new URL(currentUrl)
  url.port = portOverride
  return url.toString()
}

export function isDataURL(url: string) {
  try {
    const parsedURL = new URL(url)
    return parsedURL.protocol === 'data:'
  } catch (e) {
    return false
  }
}
