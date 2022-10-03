export function replacePort(currentUrl: string, portOverride: string) {
  let url = new URL(currentUrl)
  url.port = portOverride
  return url.toString()
}