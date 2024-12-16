import Mixpanel from 'mixpanel'
import { TelemetryDataServer } from './types'

let hasInitialized = false

export function getTelemetryServer(baseData: TelemetryDataServer) {
  if (process.env.NEXT_PUBLIC_MIXPANEL_ID && !hasInitialized) {
    Mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID)
  }

  return {
    trackWalletDiscoveryRequest: async () =>
      new Promise<void>(resolve => {
        Mixpanel.track('Wallet Discovery Request', baseData, () => resolve())
      }),
  }
}
