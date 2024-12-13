import Mixpanel from 'mixpanel'
import { TelemetryConfigServer } from './types'
import { trackWalletConnected, trackWalletDiscoveryRequest } from './telemetry'

let mixpanel: Mixpanel.Mixpanel | null = null

export function getTelemetryServer(config: TelemetryConfigServer) {
  if (process.env.MIXPANEL_ID && !mixpanel) {
    mixpanel = Mixpanel.init(process.env.MIXPANEL_ID, config)
  }

  return {
    trackWalletDiscoveryRequest: trackWalletDiscoveryRequest(mixpanel),
    trackWalletConnected: trackWalletConnected(mixpanel),
  }
}
