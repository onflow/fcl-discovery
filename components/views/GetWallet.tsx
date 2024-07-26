import { Stack } from '@chakra-ui/react'
import ViewLayout from '../ViewLayout'
import WalletTypeCard from '../WalletTypeCard'
import ChromeIcon from '../Icons/chrome.svg'
import { Wallet } from '../../data/wallets'

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
  return (
    <ViewLayout
      header={{
        title: `Get ${wallet.name}`,
        onBack,
        onClose: onCloseModal,
      }}
    >
      <Stack flexGrow={1} alignItems="center" spacing={4} px={6} pb={6}>
        {wallet.installLink?.browser && (
          <WalletTypeCard
            variant="link"
            icon={ChromeIcon}
            title={`${wallet.name} for Chrome`}
            description={
              'Access your wallet directly from your preferred web browser.'
            }
            buttonText="Add to Chrome"
            href={wallet.installLink.browser}
          ></WalletTypeCard>
        )}
        {wallet.installLink?.mobile && (
          <WalletTypeCard
            variant="button"
            icon={wallet.icon}
            title={`${wallet.name} for Mobile`}
            description={`Explore the Flow Blockchain using your mobile device.`}
            buttonText="Get the App"
            onButtonClick={() => onGetQRCode?.(wallet)}
          ></WalletTypeCard>
        )}
      </Stack>
    </ViewLayout>
  )
}
