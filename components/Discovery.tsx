import { SUPPORTED_VERSIONS } from '../helpers/constants'
import { Container, Divider, HStack, Link, Stack, Text } from '@chakra-ui/react'
import { isGreaterThanOrEqualToVersion } from '../helpers/version'
import ServiceList from './ServiceList'
import { useWallets } from '../hooks/useWallets'
import { useConfig } from '../contexts/ConfigContext'

export default function Discovery() {
  const { wallets, error } = useWallets()
  const { appVersion } = useConfig()
  const isFeaturesSupported = isGreaterThanOrEqualToVersion(
    appVersion,
    SUPPORTED_VERSIONS.SUGGESTED_FEATURES
  )

  if (!wallets) return <div />
  if (error) return <div>Error Loading Data</div>

  return (
    <Stack overflow="hidden" spacing={0}>
      <Container
        display="flex"
        flexDirection="column"
        overflow="scroll"
        px={8}
        pb={4}
      >
        {/* TODO: this to be replaced with a filter bar & auto-suggest */}
        {/* isFeaturesSupported && <Features /> */}
        <ServiceList services={wallets} />
      </Container>

      <Divider borderColor="gray.300" />

      <HStack justifyContent="space-between" alignItems="center" padding={6}>
        <Text fontSize="sm">Don't have a wallet?</Text>

        <Link href="https://fcl.dev" isExternal>
          <Text fontSize="sm" color="blue.500">
            Learn More
          </Text>
        </Link>
      </HStack>
    </Stack>
  )
}
