import { Stack } from '@chakra-ui/react'
import ServiceGroup from './ServiceGroup'
import { useMemo } from 'react'
import { Wallet } from '../data/wallets'
import { isExtension } from '../helpers/services'
import { useWalletHistory } from '../hooks/useWalletHistory'

interface ServiceListProps {
  wallets: Wallet[]
  selectedWallet?: Wallet | null
  onClickWallet: (wallet: Wallet) => void
}

export default function ServiceList({
  wallets,
  selectedWallet,
  onClickWallet,
}: ServiceListProps) {
  const { isLastUsed } = useWalletHistory()

  // Get the last used service, installed services, and recommended services
  const { lastUsedWallet, installedWallets, recommendedWallets } = useMemo(
    () =>
      wallets?.reduce(
        (acc, wallet) => {
          const extensionService = wallet.services.find(isExtension)

          if (isLastUsed(wallet)) {
            acc.lastUsedWallet = wallet
          } else if (extensionService?.provider?.is_installed) {
            acc.installedWallets.push(wallet)
          } else {
            acc.recommendedWallets.push(wallet)
          }
          return acc
        },
        {
          lastUsedWallet: null as Wallet | null,
          installedWallets: [] as Wallet[],
          recommendedWallets: [] as Wallet[],
        }
      ),
    [wallets, isLastUsed]
  )

  return (
    <Stack spacing={4}>
      {lastUsedWallet && (
        <ServiceGroup
          title="Last Used"
          wallets={[lastUsedWallet]}
          titleProps={{
            color: 'blue.400',
          }}
          onClickWallet={onClickWallet}
          selectedWallet={selectedWallet}
        />
      )}

      {installedWallets.length > 0 && (
        <ServiceGroup
          title="Installed"
          wallets={installedWallets}
          onClickWallet={onClickWallet}
          selectedWallet={selectedWallet}
        />
      )}

      {recommendedWallets.length > 0 && (
        <ServiceGroup
          title="Recommended"
          wallets={recommendedWallets}
          onClickWallet={onClickWallet}
          selectedWallet={selectedWallet}
        />
      )}
    </Stack>
  )
}
