import mixpanel from 'mixpanel-browser'
import { TelemetryDataClient } from './types'
import { FCL_SERVICE_METHODS } from '../constants'

const hasMixpanel = Boolean(process.env.NEXT_PUBLIC_MIXPANEL_ID)

if (hasMixpanel) {
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
      if (hasMixpanel) {
        mixpanel.track('Wallet Connected', {
          walletUid: walletUid,
          method: serviceMethod,
          ...baseData,
        })
      }
    },
  }
}
