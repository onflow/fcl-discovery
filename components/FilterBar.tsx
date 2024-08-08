import {
  Button,
  HStack,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'

type Props = {
  availableFilters: string[]
  selectedFilters: string[]
  onSelectedFiltersChange: (selectedFilters: string[]) => void
}

export default function FilterBar({
  availableFilters,
  selectedFilters,
  onSelectedFiltersChange,
}: Props) {
  const handleFilterClick = (filter: string) => {
    const set = new Set(selectedFilters)
    set.has(filter) ? set.delete(filter) : set.add(filter)
    onSelectedFiltersChange([...set])
  }

  return (
    <Stack>
      <HStack
        spacing={2}
        overflowX="hidden"
        flexWrap="wrap"
        flexGrow={1}
        justify={'space-between'}
        pb={2}
      >
        {availableFilters.map(filter => (
          <Button
            size="sm"
            px={2}
            py={1}
            key={filter}
            borderRadius="full"
            variant="secondary"
            bg={selectedFilters.includes(filter) ? 'white' : 'gray'}
            onClick={() => handleFilterClick(filter)}
            flexShrink={0}
          >
            <Text
              textStyle="body2"
              fontSize="0.75rem"
              lineHeight="100%"
              minH={0}
            >
              {filter}
            </Text>
          </Button>
        ))}
      </HStack>
    </Stack>
  )
}
