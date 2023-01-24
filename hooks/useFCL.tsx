import { useEffect, useState } from 'react'
import { WalletUtils } from '@onflow/fcl'
import { Service, Strategy } from '../types'

type WalletUtilsProps = {
  fclVersion: string
  body: { [key: string]: any }
  config: { [key: string]: any }
}

export const useFCL = (): {
  hasInitialized: boolean
  loading: boolean
  appConfig: { [key: string]: any }
  clientConfig: { [key: string]: any }
  appVersion: string
  walletInclude: string[]
  clientServices: Service[]
  supportedStrategies: Strategy[]
} => {
  const [hasInitialized, setHasInitialized] = useState(false)
  const [loading, setLoading] = useState(false)
  const [appConfig, setAppConfig] = useState<{[key: string]: any}>()
  const [clientConfig, setClientConfig] = useState<{[key: string]: any}>()
  const [appVersion, setAppVersion] = useState<string>(null)
  const [walletInclude, setWalletInclude] = useState<string[]>([])
  const [clientServices, setClientServices] = useState<Service[]>([])
  const [supportedStrategies, setSupportedStrategies] = useState<Strategy[]>([])

  useEffect(() => {
    setHasInitialized(true)
    setLoading(true)

    try {
      WalletUtils.ready(({ fclVersion, body, config } : WalletUtilsProps) => {
        // config.client.fclVersion is only available starting in version 0.0.79-alpha.4
        // config?.client?.extensions starts in fcl v1
        const appFclVersion = config?.client?.fclVersion || fclVersion || null
        const services =
          config?.client?.clientServices ||
          config?.client?.extensions ||
          body?.extensions ||
          []
        const clientSupportedStrategies =
          config?.client?.supportedStrategies || []

        if (config?.app) {
          setAppConfig(config.app)
        }

        if (config?.client) {
          setClientConfig(config.client)
        }

        if (appFclVersion) {
          setAppVersion(appFclVersion)
          setWalletInclude(
            config?.discoveryAuthnInclude ||
              config?.client?.discoveryAuthnInclude ||
              []
          )
        }

        if (services) {
          setClientServices(services)
        }

        if (clientSupportedStrategies) {
          setSupportedStrategies(clientSupportedStrategies)
        }

        setLoading(false)
      })
    } catch (_) {
      console.log(
        'Error occured, please see docs: https://developers.flow.com/tools/fcl-js/reference/discovery'
      )
    }
  }, [])

  return {
    hasInitialized,
    loading,
    appConfig,
    clientConfig,
    appVersion,
    walletInclude,
    clientServices,
    supportedStrategies,
  }
}
