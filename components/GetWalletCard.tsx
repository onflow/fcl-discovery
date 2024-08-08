import { isExtension } from '../helpers/services'
import {
  Card,
  CardBody,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Wallet } from '../data/wallets'
import HybridButton from './HybridButton'
import FeatureTag from './FeatureTag'

type Props = {
  wallet: Wallet
  onGetWallet?: () => void
}

export default function GetWalletCard({ wallet, onGetWallet }: Props) {
  const walletFeatures = wallet.features?.map(feature => feature) || []
  return (
    <HStack spacing={3} p="0.375rem">
      <Image
        src={wallet.icon}
        alt={wallet.name}
        borderRadius="lg"
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
        {...(!wallet.installLink
          ? { href: wallet.website }
          : {
              onClick: onGetWallet,
            })}
      >
        Get
      </HybridButton>
    </HStack>
  )
}
