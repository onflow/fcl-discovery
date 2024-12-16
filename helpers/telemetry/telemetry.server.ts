import Mixpanel from 'mixpanel'
import { TelemetryDataServer } from './types'

let mixpanel: Mixpanel.Mixpanel | null = null

export function getTelemetryServer(baseData: TelemetryDataServer) {
  if (process.env.NEXT_PUBLIC_MIXPANEL_ID && !mixpanel) {
    Mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID)
  }

  return {
    trackWalletDiscoveryRequest: async () =>
      new Promise<void>(resolve => {
        mixpanel?.track('Wallet Discovery Request', baseData, () => resolve())
      }),
  }
}
