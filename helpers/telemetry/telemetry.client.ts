import mixpanel from 'mixpanel-browser'
import { TelemetryDataClient } from './types'
import { FCL_SERVICE_METHODS } from '../constants'

if (process.env.NEXT_PUBLIC_MIXPANEL_ID) {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID)
}

export function clientTelemetry(baseData: TelemetryDataClient) {
  return {
    trackWalletConnected: ({
      walletUid,
      serviceMethod,
    }: {
      walletUid: string
      serviceMethod: FCL_SERVICE_METHODS
    }) => {
      mixpanel.track('Wallet Connected', {
        walletUid: walletUid,
        method: serviceMethod,
        ...baseData,
      })
    },
  }
}
