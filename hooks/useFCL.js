import {useEffect, useState} from "react"
import {WalletUtils} from "@onflow/fcl"

export function useFCL() {
  const [hasInitialized, setHasInitialized] = useState(false)
  const [loading, setLoading] = useState(false)
  const [appVersion, setAppVersion] = useState(null)
  const [extensions, setExtensions] = useState([])
  const [walletInclude, setWalletInclude] = useState([])

  useEffect(() => {
    setHasInitialized(true)
    setLoading(true)

    WalletUtils.ready(({fclVersion, body, config}) => {
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
    appVersion,
    extensions,
    walletInclude
  }
}
