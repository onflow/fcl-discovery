import Mixpanel from 'mixpanel'
import { FCL_SERVICE_METHODS } from './constants'

let mixpanel: Mixpanel.Mixpanel | null = null

type TelemetryConfig = {
  fclVersion: string
  type: 'UI' | 'API'
  network: string
}

type TelemetryConfigClient = TelemetryConfig & {
  parent: string
}

type TelemetryConfigServer = TelemetryConfig & {
  origin?: string
}

export function getTelemetryClient(config: TelemetryConfigClient) {
  if (process.env.NEXT_PUBLIC_MIXPANEL_ID) {
    mixpanel = Mixpanel.init(process.env.MIXPANEL_ID, config)
  }

  return {
    trackWalletDiscoveryRequest,
    trackWalletConnected,
  }
}

export function getTelemetryServer(config: TelemetryConfigServer) {
  if (process.env.MIXPANEL_ID && !mixpanel) {
    mixpanel = Mixpanel.init(process.env.MIXPANEL_ID, config)
  }

  return {
    trackWalletDiscoveryRequest,
    trackWalletConnected,
  }
}

function trackWalletDiscoveryRequest() {
  mixpanel?.track('Wallet Discovery Request')
}

function trackWalletConnected(
  walletUid: string,
  serviceMethod: FCL_SERVICE_METHODS,
) {
  mixpanel?.track('Wallet Connected', {
    walletUid: walletUid,
    method: serviceMethod,
  })
}
