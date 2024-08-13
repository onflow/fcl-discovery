import { useDeviceInfo } from '../contexts/DeviceInfoContext'
import { Wallet } from '../data/wallets'
import { getBrowserInfo } from '../helpers/browsers'
import { FCL_SERVICE_METHODS } from '../helpers/constants'
import { DeviceType, MobilePlatform } from '../helpers/device-info'
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
  const deviceInfo = useDeviceInfo()

  switch (type) {
    case FCL_SERVICE_METHODS.WC:
      let mobileInstallLink
      if (deviceInfo.type === DeviceType.MOBILE) {
        mobileInstallLink =
          wallet.installLink?.[deviceInfo.platform] ||
          wallet.installLink?.mobile
      } else {
        mobileInstallLink = wallet.installLink?.mobile
      }

      if (!mobileInstallLink) {
        return null
      }

      return (
        <WalletTypeCard
          icon={wallet.icon}
          title={`${wallet.name} for Mobile`}
          description={`Explore the Flow Blockchain using your mobile device.`}
          button={{
            text: 'Download',
            onClick: onInstallMobile,
          }}
        ></WalletTypeCard>
      )
    case FCL_SERVICE_METHODS.EXT:
      if (deviceInfo.type !== DeviceType.DESKTOP) {
        return null
      }

      const browserInstallLink =
        wallet.installLink?.[deviceInfo.browser] ||
        wallet.installLink?.browserExtension

      if (!browserInstallLink) {
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
            href: browserInstallLink,
          }}
        ></WalletTypeCard>
      )
    default:
      return null
  }
}
