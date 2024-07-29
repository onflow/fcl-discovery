import { Stack } from '@chakra-ui/react'
import ViewLayout from '../ViewLayout'
import WalletTypeCard from '../WalletTypeCard'
import ChromeIcon from '../Icons/chrome.svg'
import { Wallet } from '../../data/wallets'
import { getBrowserFromUserAgent, getUserAgent } from '../../helpers/platform'
import { getBrowserInfo } from '../../helpers/browsers'

interface GetWalletProps {
  onBack: () => void
  onCloseModal: () => void
  onGetQRCode: (wallet: Wallet) => void
  wallet: Wallet
}

export default function GetWallet({
  onBack,
  onCloseModal,
  wallet,
  onGetQRCode,
}: GetWalletProps) {
  const browserInfo = getBrowserInfo(getUserAgent())
  const browserInstallLink =
    wallet.installLink?.[browserInfo.id] || wallet.installLink?.browser

  return (
    <ViewLayout
      header={{
        title: `Get ${wallet.name}`,
        onBack,
        onClose: onCloseModal,
      }}
    >
      <Stack flexGrow={1} alignItems="center" spacing={4} px={6} pb={6}>
        {browserInstallLink && (
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
        )}
        {wallet.installLink?.mobile && (
          <WalletTypeCard
            icon={wallet.icon}
            title={`${wallet.name} for Mobile`}
            description={`Explore the Flow Blockchain using your mobile device.`}
            button={{
              text: 'Scan with Phone',
              onClick: () => onGetQRCode?.(wallet),
            }}
          ></WalletTypeCard>
        )}
      </Stack>
    </ViewLayout>
  )
}
