import { useConfig } from '../contexts/FclContext'
import { getTelemetryClient } from '../helpers/telemetry/telemetry.client'

export function useTelemetry() {
  const cfg = useConfig()
  return getTelemetryClient({
    network: cfg.network,
    type: 'UI',
    fclVersion: cfg.appVersion,
    parent:
      window.location != window.parent.location ? document.referrer : undefined,
  })
}
