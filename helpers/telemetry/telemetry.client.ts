import * as Mixpanel from 'mixpanel-browser'
import { TelemetryDataClient } from './types'
import { FCL_SERVICE_METHODS } from '../constants'

let mixpanel: Mixpanel.Mixpanel | null = null

export function getTelemetryClient(baseData: TelemetryDataClient) {
  if (process.env.NEXT_PUBLIC_MIXPANEL_ID && !mixpanel) {
    mixpanel = Mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID)
  }

  return {
    trackWalletConnected: async ({
      walletUid,
      serviceMethod,
    }: {
      walletUid: string
      serviceMethod: FCL_SERVICE_METHODS
    }) => {
      return new Promise<void>(resolve => {
        mixpanel?.track(
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
