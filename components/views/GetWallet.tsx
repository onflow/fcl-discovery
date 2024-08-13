import { Stack } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'
import { FCL_SERVICE_METHODS } from '../../helpers/constants'
import { InstallCard } from '../InstallCard'

interface GetWalletProps {
  onGetQRCode: (wallet: Wallet) => void
  wallet: Wallet
}

export default function GetWallet({ wallet, onGetQRCode }: GetWalletProps) {
  return (
    <Stack flexGrow={1} alignItems="center" spacing={4} px={5} pb={5}>
      {Object.values(FCL_SERVICE_METHODS).map(service => {
        return (
          <InstallCard
            key={service}
            type={service}
            wallet={wallet}
            onInstallMobile={() => onGetQRCode(wallet)}
          />
        )
      })}
    </Stack>
  )
}
