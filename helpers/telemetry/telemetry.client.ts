import Mixpanel from 'mixpanel-browser'
import { trackWalletConnected, trackWalletDiscoveryRequest } from './telemetry'
import { TelemetryDataClient } from './types'

let mixpanel: any = null

export function getTelemetryClient(baseData: TelemetryDataClient) {
  if (process.env.NEXT_PUBLIC_MIXPANEL_ID && !mixpanel) {
    mixpanel = Mixpanel.init(process.env.MIXPANEL_ID)
  }

  mixpanel.register(baseData)

  return {
    trackWalletDiscoveryRequest: trackWalletDiscoveryRequest(
      mixpanel,
      baseData,
    ),
    trackWalletConnected: trackWalletConnected(mixpanel, baseData),
  }
}
