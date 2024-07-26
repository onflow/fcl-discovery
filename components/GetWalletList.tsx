import { Stack } from '@chakra-ui/react'
import { useWallets } from '../hooks/useWallets'
import GetWalletCard from './GetWalletCard'
import { Wallet } from '../data/wallets'

interface GetWalletListProps {
  onGetWallet: (wallet: Wallet) => void
}

export default function GetWalletList({ onGetWallet }: GetWalletListProps) {
  const { wallets } = useWallets()

  return (
    <Stack spacing={4}>
      {wallets.map(wallet => {
        return (
          <GetWalletCard
            key={wallet.uid}
            wallet={wallet}
            onButtonClick={() => onGetWallet(wallet)}
          />
        )
      })}
    </Stack>
  )
}
