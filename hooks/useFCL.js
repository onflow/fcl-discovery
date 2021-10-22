import { useEffect, useState } from "react";
import {WalletUtils} from "@onflow/fcl"
import { valid as isValidVersion } from "semver"

export function useFCL() {
  const [appVersion, setAppVersion] = useState(null)
  const [extensions, setExtensions] = useState([])

  useEffect(() => {
    const unmount = WalletUtils.onMessageFromFCL(
      "FCL:VIEW:READY:RESPONSE",
      ({fclVersion, body}) => {
        if (isValidVersion(fclVersion)) {
          setExtensions(body.extensions)
          setAppVersion(fclVersion)
        }
      }
    )
  
    WalletUtils.sendMsgToFCL("FCL:VIEW:READY")
  
    return unmount
  }, [])

  return {
    appVersion,
    extensions
  }
}