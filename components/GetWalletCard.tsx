import { WalletUtils } from '@onflow/fcl'
import { SUPPORTED_VERSIONS } from '../helpers/constants'
import { isExtension } from '../helpers/services'
import { isGreaterThanOrEqualToVersion } from '../helpers/version'
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
  Link,
} from '@chakra-ui/react'
import { Service } from '../types'
import { useConfig } from '../contexts/ConfigContext'
import NextLink from 'next/link'

type Props = {
  icon: string
  name: string
  service: Service
}

export default function GetWalletCard({ icon, name, service }: Props) {
  const { appVersion } = useConfig()

  const installLink = service?.provider?.install_link
  const isExtensionService = isExtension(service)
  const isExtensionServiceInstalled = Boolean(service?.provider?.is_installed)

  const onSelect = () => {
    if (!service) return

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
    <Card size="md" variant="unstyled">
      <CardBody width="100%" display="flex">
        <Stack>
          <Flex alignItems="center" justifyContent="space-between">
            <HStack>
              <Image
                src={icon}
                alt={name}
                borderRadius="md"
                borderWidth="1px"
                borderColor="gray.200"
                borderStyle="solid"
                boxSize="3.5rem"
                alignSelf="start"
                my="auto"
              />
              <Flex direction="column" textAlign="left">
                <Text fontSize="lg" as="b">
                  {name}
                </Text>

                {isExtensionService && !isExtensionServiceInstalled ? (
                  <Text fontSize="sm" color="gray.500">
                    Install Extension
                  </Text>
                ) : null}
              </Flex>
            </HStack>
          </Flex>
        </Stack>

        {/* TODO: Needs to link to install page, will be addressed in future PR */}
        <Button
          href={service.provider.install_link || service.provider.website}
          target="_blank"
          as={NextLink}
          onClick={onSelect}
          variant="outline"
          size="sm"
          colorScheme="blue"
          ml="auto"
          alignSelf="center"
          borderRadius="full"
          textTransform="uppercase"
        >
          Get
        </Button>
      </CardBody>
    </Card>
  )
}
