import Mixpanel from 'mixpanel'
import { FCL_SERVICE_METHODS } from '../constants'

export function trackWalletDiscoveryRequest(mixpanel: Mixpanel.Mixpanel) {
  return () => {
    mixpanel?.track('Wallet Discovery Request')
  }
}

export function trackWalletConnected(mixpanel: Mixpanel.Mixpanel) {
  return (walletUid: string, serviceMethod: FCL_SERVICE_METHODS) => {
    mixpanel?.track('Wallet Connected', {
      walletUid: walletUid,
      method: serviceMethod,
    })
  }
}
