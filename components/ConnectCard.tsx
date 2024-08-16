import { Wallet } from '../data/wallets'
import { FCL_SERVICE_METHODS } from '../helpers/constants'
import { Service } from '../types'
import ActionCard from './ActionCard'
import { useDevice } from '../contexts/DeviceContext'
import { DeviceType } from '../helpers/device'
import { getBrowserInfo } from '../helpers/browsers'
import { useRpc } from '../contexts/FclContext'

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
    <ActionCard
      icon={icon}
      title={title}
      description={description}
      button={{
        text: buttonText,
        onClick: onConnect,
      }}
    ></ActionCard>
  )
}

function useConnectCardInfo(wallet: Wallet, service: Service) {
  const { deviceInfo } = useDevice()
  const { rpcEnabled } = useRpc()

  let title: string, description: string, buttonText: string, icon: string
  switch (service.method) {
    case FCL_SERVICE_METHODS.WC:
      title = `${wallet.name} Mobile`
      description = `Confirm the connection in the mobile app`
      if (deviceInfo.type === DeviceType.MOBILE) {
        buttonText = `Open Wallet`
      } else {
        // Older clients may skip scanning QR and use existing session
        buttonText = rpcEnabled ? `Scan QR Code` : `Open Wallet`
      }
      icon = wallet.icon
      break
    case FCL_SERVICE_METHODS.EXT:
      title = `${wallet.name} Extension`
      description = `Confirm the connection in the browser extension`
      buttonText = `Connect`
      icon = getBrowserInfo(deviceInfo.browser).icon
      break
    case FCL_SERVICE_METHODS.HTTP:
    case FCL_SERVICE_METHODS.POP:
    case FCL_SERVICE_METHODS.IFRAME:
    case FCL_SERVICE_METHODS.TAB:
      title = `Connect to ${wallet.name}`
      description = `Confirm the connection in the web app`
      buttonText = `Connect`
      icon = getBrowserInfo(deviceInfo.browser).icon
      break
    default:
      title = `Connect to ${wallet.name}`
      description = `Confirm the connection in your wallet`
      buttonText = `Connect`
  }
  return { title, description, buttonText, icon }
}
