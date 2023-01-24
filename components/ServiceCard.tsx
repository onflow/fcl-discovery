import { WalletUtils } from '@onflow/fcl'
import { LOCAL_STORAGE_KEYS, SUPPORTED_VERSIONS } from '../helpers/constants'
import { isExtension } from '../helpers/services'
import { isGreaterThanOrEqualToVersion } from '../helpers/version'
import { truncateString } from '../helpers/strings'
import { useFCL } from '../hooks/useFCL'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Icon,
  Image,
  Spacer,
  Tag,
  Text,
} from '@chakra-ui/react'
import { FiInfo } from 'react-icons/fi'
import { Service } from '../types'

type Props = {
  isEnabled: boolean
  icon: string
  name: string
  service: Service
  lastUsed: boolean
}

export default function ServiceCard({
  icon,
  name,
  service,
  lastUsed = false,
} : Props) {
  const { appVersion } = useFCL()
  const [_, setLastUsed] = useLocalStorage(
    LOCAL_STORAGE_KEYS.LAST_INSTALLED,
    null
  )
  const serviceWebsite = service?.provider?.website
  const hasWebsite = Boolean(service?.provider?.website)
  const installLink = service?.provider?.install_link
  const isExtensionService = isExtension(service)
  const isExtensionServiceInstalled = Boolean(service?.provider?.is_installed)

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

  const openMoreInfo = e => {
    e.stopPropagation()
    if (!hasWebsite) return
    window.open(serviceWebsite, '_blank')
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
    >
      <CardBody width="100%">
        <Flex alignItems="center" justifyContent="space-between">
          <HStack>
            <Image src={icon} alt={name} borderRadius="full" boxSize="3rem" />
            <Text fontSize="lg" as="b">
              {truncateString(name, 13)}
            </Text>
            {isExtensionService && !isExtensionServiceInstalled && (
              <Tag size="sm">Install Extension</Tag>
            )}
            {lastUsed && <Tag size="sm">Last Used</Tag>}
          </HStack>
          <Spacer />
          {hasWebsite && (
            <Box
              color="lightgrey"
              _hover={{
                transform: 'scale(1.1)',
                transitionDuration: '0.2s',
                transitionTimingFunction: 'ease-in-out',
              }}
              onClick={openMoreInfo}
            >
              <Icon as={FiInfo} boxSize="1.5rem" />
            </Box>
          )}
        </Flex>
      </CardBody>
    </Card>
    
  )
}
