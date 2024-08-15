import { Wallet } from '../data/wallets'
import { useDevice } from '../contexts/DeviceContext'
import { DeviceInfo, DeviceType } from '../helpers/device'
import { useConfig } from '../contexts/FclContext'
import { FCL_SERVICE_METHODS } from '../helpers/constants'
import { useMemo } from 'react'

export function useInstallLinks(wallet: Wallet) {
  const { deviceInfo } = useDevice()
  const { supportedStrategies } = useConfig()

  const links = useMemo(() => {
    return getCompatibleInstallLinks(wallet, supportedStrategies, deviceInfo)
  }, [wallet, supportedStrategies, deviceInfo])
  return links
}

export function getInstallLinkForMethod(
  wallet: Wallet,
  method: FCL_SERVICE_METHODS,
  deviceInfo: DeviceInfo,
): string | null {
  switch (method) {
    case FCL_SERVICE_METHODS.WC:
      if (deviceInfo.type === DeviceType.MOBILE) {
        return (
          wallet.installLink?.[deviceInfo.platform] ||
          wallet.installLink?.mobile ||
          null
        )
      }
      return wallet.installLink?.mobile || null
    case FCL_SERVICE_METHODS.EXT:
      return (
        wallet.installLink?.[deviceInfo.browser] ||
        wallet.installLink?.browser ||
        null
      )
  }

  return null
}

export function getCompatibleInstallLinks(
  wallet: Wallet,
  supportedStrategies: FCL_SERVICE_METHODS[],
  deviceInfo: DeviceInfo,
) {
  const installLinks: Record<FCL_SERVICE_METHODS, string> = {} as Record<
    any,
    any
  >
  supportedStrategies.forEach(strategy => {
    // Special case - mobile devices say that they "support" the extension method but de facto they don't
    if (
      strategy === FCL_SERVICE_METHODS.EXT &&
      deviceInfo.type === DeviceType.MOBILE
    ) {
      return
    }

    const link = getInstallLinkForMethod(wallet, strategy, deviceInfo)
    if (link) {
      installLinks[strategy] = link
    }
  })

  return installLinks
}
