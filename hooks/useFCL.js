import {useEffect, useState} from "react"
import {WalletUtils} from "@onflow/fcl"

export function useFCL() {
  const [appVersion, setAppVersion] = useState(null)
  const [extensions, setExtensions] = useState([])
  const [walletInclude, setWalletInclude] = useState([])

  useEffect(() => {
    WalletUtils.ready(({fclVersion, body, config}) => {
      if (fclVersion) {
        setExtensions(body.extensions)
        setAppVersion(fclVersion)
        setWalletInclude(config.discoveryAuthnInclude || [])
      }
    })
  }, [])

  return {
    appVersion,
    extensions,
    walletInclude
  }
}
