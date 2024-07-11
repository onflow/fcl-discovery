import { WalletUtils } from '@onflow/fcl'
import { SUPPORTED_VERSIONS } from '../helpers/constants'
import { isExtension } from '../helpers/services'
import { isGreaterThanOrEqualToVersion } from '../helpers/version'
import {
  Card,
  CardBody,
  Flex,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { Service } from '../types'
import { useConfig } from '../contexts/ConfigContext'
import { useLastUsed } from '../hooks/useLastUsed'

type Props = {
  icon: string
  name: string
  service: Service
}

export default function ServiceCard({ icon, name, service }: Props) {
  const { appVersion } = useConfig()

  const installLink = service?.provider?.install_link
  const isExtensionService = isExtension(service)
  const isExtensionServiceInstalled = Boolean(service?.provider?.is_installed)

  const { setLastUsed } = useLastUsed()

  const onSelect = () => {
    if (!service) return

    setLastUsed(service?.provider?.address)

    if (isExtensionService && !isExtensionServiceInstalled) {
      if (installLink) {
        // Extensions require reload of page to inject script into dapp with data
        // Redirecting dapp to install page forces page to be refreshed when returning
        window.parent.location.href = installLink
      }
      return
    }

    if (
      appVersion &&
      isGreaterThanOrEqualToVersion(appVersion, SUPPORTED_VERSIONS.EXTENSIONS)
    ) {
      WalletUtils.redirect(service)
    } else {
      window.location.href = `${service.endpoint}${window.location.search}`
    }
  }

  return (
    <Card
      size="sm"
      as="button"
      _hover={{
        transform: 'scale(1.01)',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease-in-out',
      }}
      onClick={onSelect}
      variant="unstyled"
    >
      <CardBody width="100%">
        <Flex alignItems="center" justifyContent="space-between">
          <Stack>
            <Flex alignItems="center" justifyContent="space-between">
              <HStack>
                <Image
                  src={icon}
                  alt={name}
                  borderRadius="md"
                  border="1px solid lightgrey"
                  boxSize="2.5rem"
                  alignSelf="start"
                />
                <Flex direction="column" textAlign="left">
                  <Text fontSize="lg" as="b">
                    {name}
                  </Text>

                  {isExtensionService && !isExtensionServiceInstalled ? (
                    <Text fontSize="sm" color="gray.500">
                      Install Extension
                    </Text>
                  ) : (
                    <Text visibility="hidden">Placeholder</Text>
                  )}
                </Flex>
              </HStack>
            </Flex>
          </Stack>
        </Flex>
      </CardBody>
    </Card>
  )
}
