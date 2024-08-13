import { Wallet } from '../data/wallets'
import { FCL_SERVICE_METHODS } from '../helpers/constants'
import { Service } from '../types'
import ChromeIcon from './Icons/chrome.svg'
import WalletTypeCard from './WalletTypeCard'
import { useDeviceInfo } from '../contexts/DeviceInfoContext'
import { DeviceType } from '../helpers/device-info'

export type ConnectCardProps = {
  onConnect: () => void
  wallet: Wallet
  serviceIdx: number
}

export function ConnectCard({
  onConnect,
  wallet,
  serviceIdx,
}: ConnectCardProps) {
  const info = useConnectCardInfo(wallet, wallet.services[serviceIdx])
  if (!info) {
    return null
  }

  const { title, description, buttonText, icon } = info
  return (
    <WalletTypeCard
      icon={icon}
      title={title}
      description={description}
      button={{
        text: buttonText,
        onClick: onConnect,
      }}
      unstyled
    ></WalletTypeCard>
  )
}

function useConnectCardInfo(wallet: Wallet, service: Service) {
  const { type: deviceType } = useDeviceInfo()
  let title: string, description: string, buttonText: string, icon: string
  switch (service.method) {
    case FCL_SERVICE_METHODS.WC:
      title = `${wallet.name} Mobile`
      description = `Confirm the connection in the mobile app`
      buttonText =
        deviceType === DeviceType.MOBILE ? `Open Wallet` : `Scan QR Code`
      icon = wallet.icon
      break
    case FCL_SERVICE_METHODS.EXT:
      title = `${wallet.name} Extension`
      description = `Confirm the connection in the browser extension`
      buttonText = `Connect`
      icon = ChromeIcon
      break
    case FCL_SERVICE_METHODS.HTTP:
    case FCL_SERVICE_METHODS.POP:
    case FCL_SERVICE_METHODS.IFRAME:
    case FCL_SERVICE_METHODS.TAB:
      title = `Connect to ${wallet.name}`
      description = `Confirm the connection in the web app`
      buttonText = `Connect`
      icon = ChromeIcon
      break
    default:
      title = `Connect to ${wallet.name}`
      description = `Confirm the connection in your wallet`
      buttonText = `Connect`
  }
  return { title, description, buttonText, icon }
}
