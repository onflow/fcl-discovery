import { useMemo } from 'react'
import { Wallet } from '../data/wallets'
import { useDevice } from '../contexts/DeviceContext'
import { useConfig } from '../contexts/FclContext'
import { FCL_SERVICE_METHODS } from '../helpers/constants'

export function useInstallLinks(wallet: Wallet) {
  const { deviceInfo } = useDevice()
  const { supportedStrategies } = useConfig()

  const links: Record<FCL_SERVICE_METHODS, string> = useMemo(() => {
    if (!wallet) {
      return {} as Record<FCL_SERVICE_METHODS, string>
    }

    const res = supportedStrategies.reduce(
      (acc, strategy) => {
        let installLink: string | null = null
        switch (strategy) {
          case FCL_SERVICE_METHODS.WC:
            installLink = wallet.installLink.mobile || null
            break
          case FCL_SERVICE_METHODS.EXT:
            installLink = wallet.installLink.browser || null
            break
        }

        if (!installLink) {
          return acc
        }
        return { ...acc, [strategy]: installLink }
      },
      {} as Record<FCL_SERVICE_METHODS, string>,
    )
    return res
  }, [deviceInfo, wallet, supportedStrategies])

  console.log('installLinks', links)

  return links
}
