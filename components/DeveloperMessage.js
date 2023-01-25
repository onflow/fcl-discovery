import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function FlowHeader() {
  return (
    <Alert status="warning" marginBottom={3}>
      <AlertIcon />
      <AlertTitle>Missing Config</AlertTitle>
      <AlertDescription>
        See how to set your app title and icon{' '}
        <Link
          href="https://github.com/onflow/fcl-discovery/blob/master/README.md#configuration"
          isExternal
        >
          here <ExternalLinkIcon mx="2px" />
        </Link>
        .
      </AlertDescription>
    </Alert>
  )
}
