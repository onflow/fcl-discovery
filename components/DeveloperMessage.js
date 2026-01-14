import {
  Alert,
  AlertDescription,
  Link,
  VStack,
  Box,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function DeveloperMessage({
  showMissingAppConfig = false,
  showMissingWalletConnect = false,
}) {
  return (
    <VStack spacing={2} mx={4} mb={3} align="stretch">
      {showMissingAppConfig && (
        <Alert
          status="warning"
          py={2}
          px={3}
          borderRadius="lg"
          fontSize="xs"
          variant="subtle"
        >
          <AlertDescription display="flex" alignItems="center" gap={1}>
            <Box as="span" fontWeight="medium">Missing app config.</Box>
            <Link
              href="https://developers.flow.com/build/tools/clients/fcl-js/discovery"
              isExternal
              color="orange.700"
            >
              Set title & icon <ExternalLinkIcon mb="2px" />
            </Link>
          </AlertDescription>
        </Alert>
      )}
      {showMissingWalletConnect && (
        <Alert
          status="info"
          py={2}
          px={3}
          borderRadius="lg"
          fontSize="xs"
          variant="subtle"
        >
          <AlertDescription display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <Box as="span" fontWeight="medium">Enable mobile wallets:</Box>
            <Box as="span">
              set <Box as="code" bg="blue.100" px={1} borderRadius="sm">walletconnect.projectId</Box>
            </Box>
            <Link
              href="https://developers.flow.com/build/tools/clients/fcl-js/discovery"
              isExternal
              color="blue.700"
            >
              Docs <ExternalLinkIcon mb="2px" />
            </Link>
          </AlertDescription>
        </Alert>
      )}
    </VStack>
  )
}
