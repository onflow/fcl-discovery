import { useCallback, useMemo } from 'react'
import { Wallet } from '../data/wallets'
import { useDevice } from '../contexts/DeviceContext'
import { DeviceType } from '../helpers/device-info'
import { useConfig } from '../contexts/FclContext'
import { FCL_SERVICE_METHODS } from '../helpers/constants'

export function useInstallLinks(wallet: Wallet) {
  const { deviceInfo } = useDevice()
  const { supportedStrategies } = useConfig()

  const getInstallLink = useCallback(
    (strategy: FCL_SERVICE_METHODS) => {
      let installLink: string | null = null
      switch (strategy) {
        case FCL_SERVICE_METHODS.WC:
          if (deviceInfo.type === DeviceType.MOBILE) {
            installLink =
              wallet.installLink?.[deviceInfo.platform] ||
              wallet.installLink?.mobile
          } else {
            installLink = wallet.installLink?.mobile
          }
          break
        case FCL_SERVICE_METHODS.EXT:
          if (deviceInfo.type !== DeviceType.DESKTOP) {
            return null
          }

          installLink =
            wallet.installLink?.[deviceInfo.browser] ||
            wallet.installLink?.browserExtension

          if (!installLink) {
            return null
          }
          break
      }

      return installLink
    },
    [deviceInfo, wallet],
  )

  const links = useMemo(() => {
    if (!wallet) {
      return {}
    }

    const res = supportedStrategies.reduce(
      (acc, strategy) => {
        let installLink: string | null = getInstallLink(strategy)

        if (!installLink) {
          return acc
        }
        return { ...acc, [strategy]: installLink }
      },
      {} as Record<FCL_SERVICE_METHODS, string>,
    )
    return res
  }, [deviceInfo, wallet, supportedStrategies])

  return links
}
