import { Stack } from '@chakra-ui/react'
import { useWallets } from '../hooks/useWallets'
import GetWalletCard from './GetWalletCard'

export default function GetWalletList() {
  const { wallets } = useWallets()

  return (
    <Stack spacing={4}>
      {wallets.map(wallet => {
        return <GetWalletCard key={wallet.uid} wallet={wallet} />
      })}
    </Stack>
  )
}
