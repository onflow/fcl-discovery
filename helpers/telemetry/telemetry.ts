import Mixpanel from 'mixpanel'
import { FCL_SERVICE_METHODS } from '../constants'

export function trackWalletDiscoveryRequest(
  mixpanel: Mixpanel.Mixpanel,
  baseData: any,
) {
  return () => {
    mixpanel?.track('Wallet Discovery Request', baseData)
  }
}

export function trackWalletConnected(
  mixpanel: Mixpanel.Mixpanel,
  baseData: any,
) {
  return (walletUid: string, serviceMethod: FCL_SERVICE_METHODS) => {
    mixpanel?.track('Wallet Connected', {
      walletUid: walletUid,
      method: serviceMethod,
      ...baseData,
    })
  }
}
