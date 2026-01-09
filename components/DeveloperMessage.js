import {
  Alert,
  AlertIcon,
  AlertDescription,
  Link,
  VStack,
  Text,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function DeveloperMessage({
  showMissingAppConfig = false,
  showMissingWalletConnect = false,
}) {
  return (
    <VStack spacing={2} mx={4} mb={2} align="stretch">
      {showMissingAppConfig && (
        <Alert status="warning" py={2} px={3} borderRadius="md" fontSize="xs">
          <AlertIcon boxSize="14px" />
          <AlertDescription>
            <Text as="span" fontWeight="semibold">Missing Config:</Text>{' '}
            <Link
              href="https://github.com/onflow/fcl-discovery/blob/master/README.md#configuration"
              isExternal
            >
              Set app title and icon <ExternalLinkIcon mx="2px" />
            </Link>
          </AlertDescription>
        </Alert>
      )}
      {showMissingWalletConnect && (
        <Alert status="info" py={2} px={3} borderRadius="md" fontSize="xs">
          <AlertIcon boxSize="14px" />
          <AlertDescription>
            <Text as="span" fontWeight="semibold">Mobile Wallets:</Text>{' '}
            Set <code>walletconnect.projectId</code> in FCL config.{' '}
            <Link
              href="https://developers.flow.com/build/tools/clients/fcl-js/discovery"
              isExternal
            >
              Learn more <ExternalLinkIcon mx="2px" />
            </Link>
          </AlertDescription>
        </Alert>
      )}
    </VStack>
  )
}
