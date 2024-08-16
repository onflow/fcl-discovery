import { Circle, Flex, Tag, Text } from '@chakra-ui/react'
import { AVAILABLE_FEATURES } from '../helpers/constants'

type FeatureTagProps = {
  featureId: (typeof AVAILABLE_FEATURES)[number]['id']
}

export default function FeatureTag({ featureId }: FeatureTagProps) {
  const feature = AVAILABLE_FEATURES.find(x => x.id === featureId)

  return (
    <Tag
      size="sm"
      variant="solid"
      borderRadius="full"
      pl={1}
      pr={2}
      py={0}
      background="backgroundElevated"
      borderWidth="1px"
      fontWeight="400"
    >
      <Flex alignItems="center" gap={1}>
        <Circle size="0.375rem" bg={feature.color} ml={1} />
        <Text fontSize="0.625rem">{feature.name}</Text>
      </Flex>
    </Tag>
  )
}
