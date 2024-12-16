import mixpanel from 'mixpanel-browser'
import { TelemetryDataClient } from './types'
import { FCL_SERVICE_METHODS } from '../constants'

console.log(process.env.NEXT_PUBLIC_MIXPANEL_ID)
if (process.env.NEXT_PUBLIC_MIXPANEL_ID) {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID)
}

export function clientTelemetry(baseData: TelemetryDataClient) {
  return {
    trackWalletConnected: async ({
      walletUid,
      serviceMethod,
    }: {
      walletUid: string
      serviceMethod: FCL_SERVICE_METHODS
    }) => {
      return new Promise<void>(resolve => {
        mixpanel.track(
          'Wallet Connected',
          {
            walletUid: walletUid,
            method: serviceMethod,
            ...baseData,
          },
          () => resolve(),
        )
      })
    },
  }
}
