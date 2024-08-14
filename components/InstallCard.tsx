import { DownloadIcon } from '@chakra-ui/icons'
import { useDevice } from '../contexts/DeviceContext'
import { Wallet } from '../data/wallets'
import { getBrowserInfo } from '../helpers/browsers'
import { FCL_SERVICE_METHODS } from '../helpers/constants'
import { DeviceType } from '../helpers/device'
import ActionCard from './ActionCard'

type InstallCardProps = {
  wallet: Wallet
  type: FCL_SERVICE_METHODS
  installLink: string
  onInstallMobile: () => void
}

export function InstallCard({
  wallet,
  type,
  installLink,
  onInstallMobile,
}: InstallCardProps) {
  const { deviceInfo } = useDevice()

  switch (type) {
    case FCL_SERVICE_METHODS.WC:
      return (
        <ActionCard
          icon={wallet.icon}
          title={`${wallet.name} for Mobile`}
          description={`Explore the Flow Blockchain using your mobile device.`}
          button={{
            text:
              deviceInfo.type === DeviceType.MOBILE
                ? 'Download App'
                : 'Scan QR Code',
            onClick: onInstallMobile,
            leftIcon: <DownloadIcon />,
          }}
        ></ActionCard>
      )
    case FCL_SERVICE_METHODS.EXT:
      if (deviceInfo.type !== DeviceType.DESKTOP) {
        return null
      }
      const browserInfo = getBrowserInfo(deviceInfo.browser)

      return (
        <ActionCard
          icon={browserInfo.icon}
          title={`${wallet.name} for ${browserInfo.name}`}
          description={
            'Access your wallet directly from your preferred web browser.'
          }
          button={{
            text: `Add to ${browserInfo.name}`,
            href: installLink,
            leftIcon: <DownloadIcon />,
          }}
        ></ActionCard>
      )
    default:
      return null
  }
}
