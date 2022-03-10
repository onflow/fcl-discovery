import FlowHeader from "./FlowHeader"
import AppHeader from "./AppHeader"
import {useFCL} from "../../hooks/useFCL"
import {isGreaterThanOrEqualToVersion} from "../../helpers/version"
import {SUPPORTED_VERSIONS} from "../../helpers/constants"
import Explainer from "../Explainer"

export default function Header() {
  const {clientConfig} = useFCL()
  const isAppHeaderSupported = isGreaterThanOrEqualToVersion(clientConfig?.fclVersion, SUPPORTED_VERSIONS.APP_CONFIG)

  return (
    <>
      {isAppHeaderSupported ? (
        <>
          <AppHeader />
          <Explainer />
        </>
      ) : (
        <FlowHeader />
      )}
    </>
  )
}
