export function replacePort(currentUrl: string, portOverride: string): string {
  let url = new URL(currentUrl)
  url.port = portOverride
  return url.toString()
}

export function replaceHost(currentUrl: string, hostOverride: string): string {
  let url = new URL(currentUrl)
  url.host = hostOverride
  return url.toString()
}