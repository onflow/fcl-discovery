import { Divider, Stack } from '@chakra-ui/react'
import ViewLayout from '../ViewLayout'
import WalletTypeCard from '../WalletTypeCard'
import ChromeIcon from '../Icons/chrome.svg'
import { Wallet } from '../../data/wallets'
import { FCL_SERVICE_METHODS } from '../../helpers/constants'
import * as fcl from '@onflow/fcl'
import { Fragment, useCallback } from 'react'
import { Service } from '../../types'
import { useConfig } from '../../contexts/ConfigContext'
import { toTitleCase } from '../../helpers/strings'

interface GetWalletProps {
  onBack: () => void
  onCloseModal: () => void
  onConnectQRCode: () => void
  wallet: Wallet
}

export default function ConnectWallet({
  onBack,
  onCloseModal,
  onConnectQRCode,
  wallet,
}: GetWalletProps) {
  const { walletConnectUri } = useConfig()
  const connectToService = useCallback(
    async (service: Service) => {
      // WC/RPC is a special case where we need to show a QR code within Discovery
      if (service.method === FCL_SERVICE_METHODS.WC && walletConnectUri) {
        onConnectQRCode()
      } else {
        fcl.WalletUtils.redirect(service)
      }
    },
    [walletConnectUri, onConnectQRCode]
  )

  const getServiceInfo = (service: Service) => {
    const titleCasedName = toTitleCase(wallet.name)
    let title: string, description: string, buttonText: string, icon: string
    switch (service.method) {
      case FCL_SERVICE_METHODS.WC:
        title = `${titleCasedName} Mobile`
        description = `Confirm the connection in the mobile app`
        buttonText = `Scan QR Code`
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
    <ViewLayout
      header={{
        title: `Connect to ${wallet.name}`,
        onBack,
        onClose: onCloseModal,
      }}
    >
      <Stack flexGrow={1} alignItems="center" spacing={4} px={6} pb={6}>
        {wallet.services.map((service, i) => {
          const { title, description, buttonText, icon } =
            getServiceInfo(service)
          return (
            <Fragment key={i}>
              <WalletTypeCard
                icon={icon}
                title={title}
                description={description}
                button={{
                  text: buttonText,
                  onClick: () => connectToService(service),
                }}
                unstyled
              ></WalletTypeCard>
              {i < wallet.services.length - 1 && (
                <Divider w="90%" borderColor="gray.300" />
              )}
            </Fragment>
          )
        })}
      </Stack>
    </ViewLayout>
  )
}
