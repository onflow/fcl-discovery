import { Flex, Spinner, Stack } from '@chakra-ui/react'
import ServiceGroup from './ServiceGroup'
import { Wallet } from '../data/wallets'
import { useWallets } from '../hooks/useWallets'

interface ServiceListProps {
  selectedWallet?: Wallet | null
  onSelectWallet: (wallet: Wallet) => void
}

export default function ServiceList({
  selectedWallet,
  onSelectWallet,
}: ServiceListProps) {
  const { wallets, lastUsedWallet, installedWallets, otherWallets, isLoading } =
    useWallets()

  // Get the last used service, installed services, and other services

  if (isLoading)
    return (
      <Flex justifyContent="center" alignItems="center" flexGrow={1}>
        <Spinner size="lg"></Spinner>
      </Flex>
    )

  return (
    <Stack spacing={4}>
      {lastUsedWallet && (
        <ServiceGroup
          title="Last Used"
          wallets={[lastUsedWallet]}
          titleProps={{
            color: '#3898FF',
          }}
          onSelectWallet={onSelectWallet}
          selectedWallet={selectedWallet}
        />
      )}

      {installedWallets.length > 0 && (
        <ServiceGroup
          title="Installed"
          titleProps={{
            opacity: 0.6,
          }}
          wallets={installedWallets}
          onSelectWallet={onSelectWallet}
          selectedWallet={selectedWallet}
        />
      )}

      {otherWallets.length > 0 && (
        <ServiceGroup
          title={
            otherWallets.length === wallets.length ? 'All Wallets' : 'Others'
          }
          titleProps={{
            opacity: 0.6,
          }}
          wallets={otherWallets}
          onSelectWallet={onSelectWallet}
          selectedWallet={selectedWallet}
        />
      )}
    </Stack>
  )
}
