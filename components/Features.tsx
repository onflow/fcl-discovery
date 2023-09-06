import { Box, HStack, Tag, Text, IconButton } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { useFCL } from '../hooks/useFCL'

export default function Features() {
  const { clientConfig } = useFCL()
  const suggestedFeatures = clientConfig?.discoveryFeaturesSuggested || []

  return (
    <Box mb={5}>
        <HStack mb={3}>
          <Text fontSize='sm' as='b'>Wallet Requirements</Text>
          <IconButton
            isRound={true}
            variant='solid'
            colorScheme='teal'
            aria-label='Done'
            fontSize='sm'
            size={'xs'}
            icon={<CheckIcon />}
          />
        </HStack>
        <HStack>
          {suggestedFeatures.map((suggestion, index) => (
            <Tag key={index} size='sm'>{suggestion}</Tag>
          ))}
        </HStack>
    </Box>
  )
}