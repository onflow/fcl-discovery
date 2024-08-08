import { isExtension } from '../helpers/services'
import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { Wallet } from '../data/wallets'
import FeatureTag from './FeatureTag'

interface ServiceCardProps {
  wallet: Wallet
  onClick: () => void
  isSelected?: boolean
}

export default function ServiceCard({
  wallet,
  onClick,
  isSelected,
}: ServiceCardProps) {
  const walletFeatures = wallet.features?.map(feature => feature) || []

  return (
    <Button
      h="auto"
      _hover={{
        bg: isSelected ? 'primary.500' : 'backgroundElevated',
      }}
      onClick={onClick}
      variant="unstyled"
      borderRadius="xl"
      backgroundColor={isSelected ? 'primary.500' : 'transparent'}
    >
      <HStack p="sm">
        <Image
          src={wallet.icon}
          alt={wallet.name}
          borderRadius="lg"
          borderWidth={isSelected ? 0 : '1px'}
          borderStyle="solid"
          bg="white"
          boxSize="1.75rem"
          alignSelf="start"
        />
        <Flex direction="column" textAlign="left">
          <Text textStyle="body1Bold" color={isSelected ? 'white' : 'black'}>
            {wallet.name}
          </Text>

          <HStack mt={1}>
            {walletFeatures.map(featureId => (
              <FeatureTag key={featureId} featureId={featureId} />
            ))}
          </HStack>
        </Flex>
      </HStack>
    </Button>
  )
}
