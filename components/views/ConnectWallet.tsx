import { Divider, Stack } from '@chakra-ui/react'
import WalletTypeCard from '../WalletTypeCard'
import ChromeIcon from '../Icons/chrome.svg'
import { Wallet } from '../../data/wallets'
import { FCL_SERVICE_METHODS } from '../../helpers/constants'
import { Fragment } from 'react'
import { Service } from '../../types'
import { useConfig } from '../../contexts/FclContext'
import { toTitleCase } from '../../helpers/strings'
import { useDeviceInfo } from '../../contexts/DeviceInfoContext'

interface ConnectWalletProps {
  onConnectService: (service: Service) => void
  wallet: Wallet
}

export default function ConnectWallet({
  onConnectService,
  wallet,
}: ConnectWalletProps) {
  const { isMobile } = useDeviceInfo()

  const getServiceInfo = (service: Service) => {
    const titleCasedName = toTitleCase(wallet.name)
    let title: string, description: string, buttonText: string, icon: string
    switch (service.method) {
      case FCL_SERVICE_METHODS.WC:
        title = `${titleCasedName} Mobile`
        description = `Confirm the connection in the mobile app`
        buttonText = isMobile ? `Open Wallet` : `Scan QR Code`
        icon = wallet.icon
        break
      case FCL_SERVICE_METHODS.EXT:
        title = `${titleCasedName} Extension`
        description = `Confirm the connection in the browser extension`
        buttonText = `Connect`
        icon = ChromeIcon
        break
      case FCL_SERVICE_METHODS.HTTP:
      case FCL_SERVICE_METHODS.POP:
      case FCL_SERVICE_METHODS.IFRAME:
      case FCL_SERVICE_METHODS.TAB:
        title = `Connect to ${titleCasedName}`
        description = `Confirm the connection in the web app`
        buttonText = `Connect`
        icon = ChromeIcon
        break
      default:
        title = `Connect to ${titleCasedName}`
        description = `Confirm the connection in your wallet`
        buttonText = `Connect`
    }
    return { title, description, buttonText, icon }
  }

  return (
    <Stack flexGrow={1} alignItems="center" spacing={4} px={5} pb={5}>
      {wallet.services.map((service, i) => {
        const { title, description, buttonText, icon } = getServiceInfo(service)
        return (
          <Fragment key={i}>
            <WalletTypeCard
              icon={icon}
              title={title}
              description={description}
              button={{
                text: buttonText,
                onClick: () => onConnectService(service),
              }}
              unstyled
            ></WalletTypeCard>
            {i < wallet.services.length - 1 && <Divider w="90%" />}
          </Fragment>
        )
      })}
    </Stack>
  )
}
