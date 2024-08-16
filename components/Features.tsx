import { Box, HStack, Tag, Text, IconButton } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { AVAILABLE_FEATURES } from '../helpers/constants'
import { useConfig } from '../contexts/FclContext'

export default function Features() {
  const { clientConfig } = useConfig()
  const featuresListKeys = AVAILABLE_FEATURES.map(f => f.id)
  const suggestedFeatures =
    clientConfig?.discoveryFeaturesSuggested?.filter(f =>
      featuresListKeys.includes(f),
    ) || []
  const hasSuggestedFeatures = suggestedFeatures.length > 0

  return (
    <Box mb={5}>
      {hasSuggestedFeatures && (
        <>
          <HStack mb={3}>
            <Text fontSize="sm" as="b">
              Wallet Requirements
            </Text>
            <IconButton
              isRound={true}
              variant="solid"
              aria-label="Done"
              fontSize="sm"
              size={'xs'}
              icon={<CheckIcon />}
            />
          </HStack>
          <HStack>
            {suggestedFeatures.map((suggestion, index) => (
              <Tag key={index} size="sm">
                {suggestion}
              </Tag>
            ))}
          </HStack>
        </>
      )}
    </Box>
  )
}
