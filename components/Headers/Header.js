import FlowHeader from './FlowHeader'
import AppHeader from './AppHeader'
import DeveloperMessage from '../DeveloperMessage'
import { useFCL } from '../../hooks/useFCL'
import { isGreaterThanOrEqualToVersion } from '../../helpers/version'
import { SUPPORTED_VERSIONS } from '../../helpers/constants'
import { isTestnet as isTestnetFn } from '../../helpers/networks'

export default function Header() {
  const isTestnet = isTestnetFn()
  const { appConfig, appVersion } = useFCL()
  const isMissingConfig = !(appConfig?.icon && appConfig?.title)
  const showDeveloperMessage =
    isTestnet &&
    isMissingConfig &&
    isGreaterThanOrEqualToVersion(appVersion, SUPPORTED_VERSIONS.APP_CONFIG)
  const isAppHeaderSupported = isGreaterThanOrEqualToVersion(
    appVersion,
    SUPPORTED_VERSIONS.APP_CONFIG
  )

  return (
    <>
      {isAppHeaderSupported ? (
        <>
          <AppHeader />
          {showDeveloperMessage && <DeveloperMessage />}
        </>
      ) : (
        <FlowHeader />
      )}
    </>
  )
}
