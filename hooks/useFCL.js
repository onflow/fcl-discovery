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

    WalletUtils.ready(({body, config}) => {
      const fclVersion = config?.client?.fclVersion
      
      if (config?.app) {
        setAppConfig(config.app)
      }

      if (config?.client) {
        setClientConfig(config.client)
      }

      if (fclVersion) {
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
