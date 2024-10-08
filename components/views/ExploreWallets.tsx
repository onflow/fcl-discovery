import { Stack, Text } from '@chakra-ui/react'
import { Wallet } from '../../data/wallets'
import GetWalletCard from '../GetWalletCard'
import { useWallets } from '../../hooks/useWallets'
import { useMemo } from 'react'
import { getCompatibleInstallLinks } from '../../hooks/useInstallLinks'
import { useConfig } from '../../contexts/FclContext'
import { useDevice } from '../../contexts/DeviceContext'

interface ExploreWalletsProps {
  onGetWallet: (wallet: Wallet) => void
}

export default function ExploreWallets({ onGetWallet }: ExploreWalletsProps) {
  const { wallets } = useWallets()
  const { supportedStrategies } = useConfig()
  const { deviceInfo } = useDevice()
  const installLinks = useMemo(
    () =>
      wallets.map(wallet =>
        getCompatibleInstallLinks(wallet, supportedStrategies, deviceInfo),
      ),
    [wallets],
  )

  return (
    <Stack spacing={0} flexGrow={1} overflow="hidden">
      <Stack px={5} pb={5} overflow="auto">
        <Stack spacing="1rem">
          {wallets?.map((wallet, idx) => {
            // If the wallet has install links, we move to next view to install
            const onClick = Object.keys(installLinks[idx]).length
              ? () => onGetWallet(wallet)
              : undefined
            // Fallback to website if no onClick
            const href = onClick ? undefined : wallet.website

            // No installation path
            if (!onClick && !href) {
              return null
            }

            return (
              <GetWalletCard
                key={wallet.uid}
                wallet={wallet}
                getButtonOptions={{
                  onClick: onClick,
                  href: href,
                }}
              />
            )
          })}
        </Stack>
      </Stack>
      <Stack
        px={5}
        py={6}
        maxW="xs"
        spacing={2}
        justifyContent="center"
        mx="auto"
        textAlign="center"
      >
        <Text textStyle="body1Bold">Not what you're looking for?</Text>
        <Text display={['inline', null, 'none']} textStyle="body2">
          Return to the main screen to select a different wallet provider
        </Text>
        <Text display={['none', null, 'inline']} textStyle="body2">
          Select a wallet on the left to get started with a different wallet
          provider.
        </Text>
      </Stack>
    </Stack>
  )
}
