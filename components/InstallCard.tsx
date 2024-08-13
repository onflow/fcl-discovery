import { useDevice } from '../contexts/DeviceContext'
import { Wallet } from '../data/wallets'
import { getBrowserInfo } from '../helpers/browsers'
import { FCL_SERVICE_METHODS } from '../helpers/constants'
import { DeviceType } from '../helpers/device-info'
import { useInstallLinks } from '../hooks/useInstallLinks'
import WalletTypeCard from './WalletTypeCard'

type InstallCardProps = {
  wallet: Wallet
  type: FCL_SERVICE_METHODS
  onInstallMobile: () => void
}

export function InstallCard({
  wallet,
  type,
  onInstallMobile,
}: InstallCardProps) {
  const { deviceInfo } = useDevice()
  const installLink = useInstallLinks(wallet)[type]

  switch (type) {
    case FCL_SERVICE_METHODS.WC:
      return (
        <WalletTypeCard
          icon={wallet.icon}
          title={`${wallet.name} for Mobile`}
          description={`Explore the Flow Blockchain using your mobile device.`}
          button={{
            text:
              deviceInfo.type === DeviceType.MOBILE
                ? 'Download'
                : 'Scan QR Code',
            onClick: onInstallMobile,
          }}
        ></WalletTypeCard>
      )
    case FCL_SERVICE_METHODS.EXT:
      if (deviceInfo.type !== DeviceType.DESKTOP) {
        return null
      }
      const browserInfo = getBrowserInfo(deviceInfo.browser)

      return (
        <WalletTypeCard
          icon={browserInfo.icon}
          title={`${wallet.name} for ${browserInfo.name}`}
          description={
            'Access your wallet directly from your preferred web browser.'
          }
          button={{
            text: `Add to ${browserInfo.name}`,
            href: installLink,
          }}
        ></WalletTypeCard>
      )
    default:
      return null
  }
}
