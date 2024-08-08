import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import ServiceList from '../ServiceList'
import { useWallets } from '../../hooks/useWallets'
import { isGreaterThanOrEqualToVersion } from '../../helpers/version'
import { useConfig } from '../../contexts/FclContext'
import { AVAILABLE_FEATURES, SUPPORTED_VERSIONS } from '../../helpers/constants'
import { Wallet } from '../../data/wallets'
import { useIsCollapsed } from '../../hooks/useIsCollapsed'
import FilterBar from '../FilterBar'
import features from '../../data/features'
import { useState } from 'react'

type Props = {
  onSelectWallet: (wallet: Wallet) => void
  onSwitchToLearnMore?: () => void
  selectedWallet?: Wallet | null
}

export default function WalletSelection({
  onSwitchToLearnMore,
  onSelectWallet,
  selectedWallet,
}: Props) {
  const { wallets } = useWallets()
  const isCollapsed = useIsCollapsed()
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  return (
    <Stack spacing={0} flexGrow={1} overflow="hidden">
      <Stack overflow="scroll" px={4} pb={5} flexGrow={1}>
        {/* TODO: RESTORE
        <FilterBar
          availableFilters={AVAILABLE_FEATURES.map(f => f.name)}
          selectedFilters={selectedFilters}
          onSelectedFiltersChange={setSelectedFilters}
        />*/}

        <ServiceList
          onSelectWallet={onSelectWallet}
          wallets={wallets}
          selectedWallet={selectedWallet}
        />
      </Stack>

      {isCollapsed && (
        <>
          <Divider color="gray.300" />
          <HStack justifyContent="space-between" alignItems="center" p={5}>
            <Text fontSize="sm">Don't have a wallet?</Text>

            <Button onClick={onSwitchToLearnMore} variant="link" padding={0}>
              Learn More
            </Button>
          </HStack>
        </>
      )}
    </Stack>
  )
}
