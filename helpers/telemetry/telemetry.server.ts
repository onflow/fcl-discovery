import Mixpanel from 'mixpanel'
import { TelemetryDataServer } from './types'

let mixpanel: Mixpanel.Mixpanel | null = null
if (process.env.NEXT_PUBLIC_MIXPANEL_ID) {
  Mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID)
}

export function serverTelemetry(baseData: TelemetryDataServer) {
  return {
    trackWalletDiscoveryRequest: () =>
      mixpanel?.track('Wallet Discovery Request', baseData),
  }
}
