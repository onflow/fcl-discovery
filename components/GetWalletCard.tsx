import { Flex, HStack, Text } from '@chakra-ui/react'
import { Wallet } from '../data/wallets'
import HybridButton from './HybridButton'
import FeatureTag from './FeatureTag'
import WalletIcon from './icons/WalletIcon'

type Props = {
  wallet: Wallet
  getButtonOptions: {
    href?: string
    onClick?: () => void
  }
}

export default function GetWalletCard({ wallet, getButtonOptions }: Props) {
  const { href, onClick: onGetWallet } = getButtonOptions
  const walletFeatures = wallet.features?.map(feature => feature) || []
  return (
    <HStack spacing={3} p="0.375rem">
      <WalletIcon
        wallet={wallet}
        borderWidth="1px"
        borderStyle="solid"
        boxSize="3rem"
        alignSelf="start"
        my="auto"
      />
      <Flex direction="column" textAlign="left" gap={1}>
        <Text fontSize="lg" as="b">
          {wallet.name}
        </Text>

        <HStack mt={1}>
          {walletFeatures.map(featureId => (
            <FeatureTag key={featureId} featureId={featureId} />
          ))}
        </HStack>
      </Flex>

      <HybridButton
        variant="secondary"
        size="sm"
        ml="auto"
        alignSelf="center"
        borderRadius="full"
        onClick={onGetWallet}
        // Can't be undefined
        {...{
          ...(href && { href }),
        }}
      >
        Get
      </HybridButton>
    </HStack>
  )
}
