import { Stack } from '@chakra-ui/react'
import WalletTypeCard from '../WalletTypeCard'
import { Wallet } from '../../data/wallets'
import { getUserAgent } from '../../helpers/platform'
import { getBrowserInfo } from '../../helpers/browsers'

interface GetWalletProps {
  onGetQRCode: (wallet: Wallet) => void
  wallet: Wallet
}

export default function GetWallet({ wallet, onGetQRCode }: GetWalletProps) {
  const browserInfo = getBrowserInfo(getUserAgent())
  const browserInstallLink =
    wallet.installLink?.[browserInfo.id] || wallet.installLink?.browser

  return (
    <Stack flexGrow={1} alignItems="center" spacing={4} px={5} pb={5}>
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
  )
}
