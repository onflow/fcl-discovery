export type TelemetryData = {
  fclVersion: string
  type: 'UI' | 'API'
  network: string
}

export type TelemetryDataServer = TelemetryData & {
  origin?: string
}

export type TelemetryDataClient = TelemetryData & {
  parent: string
}
