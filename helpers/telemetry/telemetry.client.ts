import * as mixpanel from 'mixpanel-browser'
import { TelemetryDataClient } from './types'
import { FCL_SERVICE_METHODS } from '../constants'

let hasInitialized = false

export function getTelemetryClient(baseData: TelemetryDataClient) {
  if (process.env.NEXT_PUBLIC_MIXPANEL_ID && !hasInitialized) {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID)
    hasInitialized = true
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
