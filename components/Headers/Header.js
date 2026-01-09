import FlowHeader from './FlowHeader'
import AppHeader from './AppHeader'
import DeveloperMessage from '../DeveloperMessage'
import { isGreaterThanOrEqualToVersion } from '../../helpers/version'
import { SUPPORTED_VERSIONS, FCL_SERVICE_METHODS } from '../../helpers/constants'
import { isTestnet as isTestnetFn } from '../../helpers/networks'
import { useConfig } from '../../contexts/FclContext'

export default function Header() {
  const isTestnet = isTestnetFn()
  const { appConfig, appVersion, supportedStrategies } = useConfig()
  const isMissingAppConfig = !(appConfig?.icon && appConfig?.title)
  const isMissingWalletConnect = !supportedStrategies?.includes(FCL_SERVICE_METHODS.WC)
  const isAppHeaderSupported = isGreaterThanOrEqualToVersion(
    appVersion,
    SUPPORTED_VERSIONS.APP_CONFIG,
  )

  const showMissingAppConfig =
    isTestnet &&
    isMissingAppConfig &&
    isAppHeaderSupported

  const showMissingWalletConnect =
    isTestnet &&
    isMissingWalletConnect &&
    isAppHeaderSupported

  const showDeveloperMessage =
    showMissingAppConfig || showMissingWalletConnect

  return (
    <>
      {isAppHeaderSupported ? (
        <>
          <AppHeader />
          {showDeveloperMessage && (
            <DeveloperMessage
              showMissingAppConfig={showMissingAppConfig}
              showMissingWalletConnect={showMissingWalletConnect}
            />
          )}
        </>
      ) : (
        <FlowHeader />
      )}
    </>
  )
}
