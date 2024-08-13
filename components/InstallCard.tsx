import { useDeviceInfo } from '../contexts/DeviceInfoContext'
import { Wallet } from '../data/wallets'
import { getBrowserInfo } from '../helpers/browsers'
import { FCL_SERVICE_METHODS } from '../helpers/constants'
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
  switch (type) {
    case FCL_SERVICE_METHODS.WC:
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
      const browserInfo = getBrowserInfo(useDeviceInfo().userAgent)
      const browserInstallLink =
        wallet.installLink?.[browserInfo.id] ||
        wallet.installLink?.browserExtension
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
