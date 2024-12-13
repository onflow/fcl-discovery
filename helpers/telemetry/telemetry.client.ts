import Mixpanel from 'mixpanel-browser'
import { trackWalletConnected, trackWalletDiscoveryRequest } from './telemetry'
import { TelemetryConfigClient } from './types'

let mixpanel: any = null

export function getTelemetryClient(
  config: TelemetryConfigClient,
  baseData: any,
) {
  if (process.env.NEXT_PUBLIC_MIXPANEL_ID && !mixpanel) {
    mixpanel = Mixpanel.init(process.env.MIXPANEL_ID)
  }

  mixpanel.register(config)

  return {
    trackWalletDiscoveryRequest: trackWalletDiscoveryRequest(
      mixpanel,
      baseData,
    ),
    trackWalletConnected: trackWalletConnected(mixpanel, baseData),
  }
}
