import { Stack } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'
import { InstallCard } from '../InstallCard'
import { useConfig } from '../../contexts/FclContext'

interface GetWalletProps {
  onInstallMobile: (wallet: Wallet) => void
  wallet: Wallet
}

export default function GetWallet({ wallet, onInstallMobile }: GetWalletProps) {
  const { supportedStrategies } = useConfig()
  return (
    <Stack flexGrow={1} alignItems="center" spacing={4} px={5} pb={5}>
      {supportedStrategies.map(service => {
        return (
          <InstallCard
            key={service}
            type={service}
            wallet={wallet}
            onInstallMobile={() => onInstallMobile(wallet)}
          />
        )
      })}
    </Stack>
  )
}
