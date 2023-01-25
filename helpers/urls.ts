export function replacePort(currentUrl: string, portOverride: string): string {
  let url = new URL(currentUrl)
  url.port = portOverride
  return url.toString()
}
