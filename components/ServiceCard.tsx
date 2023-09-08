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
  IconButton,
  Image,
  Spacer,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { FiInfo } from 'react-icons/fi'
import { Service } from '../types'
import { getProviderMetadataByAddress } from '../helpers/metadata'
import { CheckIcon } from '@chakra-ui/icons'
import { useMemo } from 'react'
import FEATURES_LIST from '../data/features.json'

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
}: Props) {
  const { appVersion, clientConfig } = useFCL()
  const [_, setLastUsed] = useLocalStorage(
    LOCAL_STORAGE_KEYS.LAST_INSTALLED,
    null
  )
  const serviceWebsite = service?.provider?.website
  const hasWebsite = Boolean(service?.provider?.website)
  const installLink = service?.provider?.install_link
  const isExtensionService = isExtension(service)
  const isExtensionServiceInstalled = Boolean(service?.provider?.is_installed)
  const supportedFeatures = getProviderMetadataByAddress(service?.provider?.address)?.features?.supported || []
  const isFeaturesSupported = isGreaterThanOrEqualToVersion(
    appVersion,
    SUPPORTED_VERSIONS.SUGGESTED_FEATURES
  )
  const featuresListKeys = FEATURES_LIST.map(f => f.name)
  const suggestedFeatures = clientConfig?.discoveryFeaturesSuggested?.filter(f => featuresListKeys.includes(f)) || []


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

  const hasSuggestedFeatures = useMemo(() => {
    return suggestedFeatures.every(feature => supportedFeatures.includes(feature))
  }, [suggestedFeatures, supportedFeatures])
  

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
          <Stack>
            <Flex alignItems="center" justifyContent="space-between">
              <HStack>
                <Image src={icon} alt={name} borderRadius="full" boxSize="2.7rem" />
                <Text fontSize="lg" as="b">
                  {truncateString(name, 10)}
                </Text>
                {isExtensionService && !isExtensionServiceInstalled && (
                  <Tag size="sm" colorScheme='cyan'>Install Extension</Tag>
                )}
                {lastUsed && <Tag size="sm" colorScheme='cyan'>Last Used</Tag>}
                {isFeaturesSupported && hasSuggestedFeatures && (
                  <IconButton
                    isRound={true}
                    variant='solid'
                    colorScheme='teal'
                    aria-label='Done'
                    fontSize='sm'
                    size={'xs'}
                    icon={<CheckIcon />}
                  />
                )}
              </HStack>
            </Flex>
            <HStack mt={2}>
              {supportedFeatures.map((feature, index) => {
                return <Tag size="sm" colorScheme='gray'>{feature}</Tag>
              })}
            </HStack>
          </Stack>
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
