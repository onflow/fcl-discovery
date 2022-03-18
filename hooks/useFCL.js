import {useEffect, useState} from "react"
import {WalletUtils} from "@onflow/fcl"

export function useFCL() {
  const [hasInitialized, setHasInitialized] = useState(false)
  const [loading, setLoading] = useState(false)
  const [appConfig, setAppConfig] = useState()
  const [clientConfig, setClientConfig] = useState()
  const [appVersion, setAppVersion] = useState(null)
  const [extensions, setExtensions] = useState([])
  const [walletInclude, setWalletInclude] = useState([])

  useEffect(() => {
    setHasInitialized(true)
    setLoading(true)

    WalletUtils.ready(({fclVersion, body, config}) => {
      // config.client.fclVersion is only available starting in version 0.0.79-alpha.4
      const appFclVersion = config?.client?.fclVersion || fclVersion || null
      
      if (config?.app) {
        setAppConfig(config.app)
      }

      if (config?.client) {
        setClientConfig(config.client)
      }

      if (appFclVersion) {
        setExtensions(body.extensions)
        setAppVersion(fclVersion)
        setWalletInclude(config.discoveryAuthnInclude || [])
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
    walletInclude
  }
}
