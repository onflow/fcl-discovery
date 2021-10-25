import { useEffect, useState } from "react";
import {WalletUtils} from "@onflow/fcl"
import { valid as isValidVersion } from "semver"

export function useFCL() {
  const [appVersion, setAppVersion] = useState(null)
  const [extensions, setExtensions] = useState([])

  useEffect(() => {
    WalletUtils.ready(({fclVersion, body}) => {
      if (isValidVersion(fclVersion)) {
        setExtensions(body.extensions)
        setAppVersion(fclVersion)
      }
    })
  }, [])

  return {
    appVersion,
    extensions
  }
}