import { useConfig } from '../contexts/FclContext'
import { getTelemetryClient } from '../helpers/telemetry'

export function useTelemetry() {
  const cfg = useConfig()
  return getTelemetryClient({
    network: cfg.network,
    type: 'UI',
    fclVersion: cfg.appVersion,
    parent: window?.parent?.location?.href,
  })
}
