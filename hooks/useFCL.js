import { useEffect, useState } from 'react'
import { WalletUtils } from '@onflow/fcl'

export function useFCL() {
  const [hasInitialized, setHasInitialized] = useState(false)
  const [loading, setLoading] = useState(false)
  const [appConfig, setAppConfig] = useState()
  const [clientConfig, setClientConfig] = useState()
  const [appVersion, setAppVersion] = useState(null)
  const [extensions, setExtensions] = useState([])
  const [walletInclude, setWalletInclude] = useState([])
  const [wcProviderId, setWcProviderId] = useState(null)

  useEffect(() => {
    setHasInitialized(true)
    setLoading(true)

    WalletUtils.ready(({ fclVersion, body, config }) => {
      // config.client.fclVersion is only available starting in version 0.0.79-alpha.4
      // config?.client?.extensions starts in fcl v1
      const appFclVersion = config?.client?.fclVersion || fclVersion || null
      const clientExtensions = config?.client?.extensions || body?.extensions || []
      const wcProviderId = '1234' // TODO: figure out where this comes from // maybe? .put("discovery.authn.include", ["0x1234", "wc:providerId"])
      
      if (config?.app) {
        setAppConfig(config.app)
      }

      if (config?.client) {
        setClientConfig(config.client)
      }

      if (appFclVersion) {
        setExtensions(clientExtensions)
        setAppVersion(appFclVersion)
        setWalletInclude(config.discoveryAuthnInclude || [])
      }

      if (wcProviderId) {
        setWcProviderId(wcProviderId)
      }

      setLoading(false)
    })
  }, [])

  return {
    hasInitialized,
    loading,
    appConfig,
    clientConfig,
    appVersion,
    extensions,
    walletInclude,
    wcProviderId
  }
}
