export type TelemetryConfig = {
  fclVersion: string
  type: 'UI' | 'API'
  network: string
}

export type TelemetryConfigServer = TelemetryConfig & {
  origin?: string
}

export type TelemetryConfigClient = TelemetryConfig & {
  parent: string
}
