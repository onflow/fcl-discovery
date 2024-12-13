import Mixpanel from 'mixpanel'
import { TelemetryDataServer } from './types'
import { trackWalletConnected, trackWalletDiscoveryRequest } from './telemetry'

let mixpanel: Mixpanel.Mixpanel | null = null

export function getTelemetryServer(baseData: TelemetryDataServer) {
  if (process.env.MIXPANEL_ID && !mixpanel) {
    mixpanel = Mixpanel.init(process.env.MIXPANEL_ID)
  }

  return {
    trackWalletDiscoveryRequest: trackWalletDiscoveryRequest(
      mixpanel,
      baseData,
    ),
    trackWalletConnected: trackWalletConnected(mixpanel, baseData),
  }
}
