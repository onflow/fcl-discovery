import { Flex, Spinner, Stack } from '@chakra-ui/react'
import ServiceGroup from './ServiceGroup'
import { useMemo } from 'react'
import { Wallet } from '../data/wallets'
import { isExtension } from '../helpers/services'
import { useWalletHistory } from '../hooks/useWalletHistory'
import { useWallets } from '../hooks/useWallets'

interface ServiceListProps {
  wallets: Wallet[]
  selectedWallet?: Wallet | null
  onSelectWallet: (wallet: Wallet) => void
}

export default function ServiceList({
  wallets,
  selectedWallet,
  onSelectWallet,
}: ServiceListProps) {
  const { lastUsedWallet, installedWallets, otherWallets, isLoading } =
    useWallets()

  // Get the last used service, installed services, and recommended services

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
            color: 'blue.400',
          }}
          onSelectWallet={onSelectWallet}
          selectedWallet={selectedWallet}
        />
      )}

      {installedWallets.length > 0 && (
        <ServiceGroup
          title="Installed"
          wallets={installedWallets}
          onSelectWallet={onSelectWallet}
          selectedWallet={selectedWallet}
        />
      )}

      {otherWallets.length > 0 && (
        <ServiceGroup
          title="Others"
          wallets={otherWallets}
          onSelectWallet={onSelectWallet}
          selectedWallet={selectedWallet}
        />
      )}
    </Stack>
  )
}
