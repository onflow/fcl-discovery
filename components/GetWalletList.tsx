import { Stack } from '@chakra-ui/react'
import { useWallets } from '../hooks/useWallets'
import GetWalletCard from './GetWalletCard'

export default function GetWalletList() {
  const { wallets } = useWallets()

  return (
    <Stack spacing={4}>
      {wallets.map((wallet, index) => {
        return (
          <GetWalletCard
            key={wallet.provider.address ?? index}
            service={wallet}
            name={wallet?.provider?.name ?? ''}
            icon={wallet?.provider?.icon ?? ''}
          />
        )
      })}
    </Stack>
  )
}
