import { CloseIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { IoChevronBack } from 'react-icons/io5'

type HeaderProps = {
  title?: string
  alignment?: 'center' | 'left' | 'right'
  onClose?: () => void
  onBack?: () => void
}

export default function ViewHeader({
  title,
  onClose,
  onBack,
  alignment,
}: HeaderProps) {
  return (
    <Flex alignItems="center" position="relative" p="4" h="65px">
      <Text
        position="absolute"
        left="0"
        right="0"
        fontSize="xl"
        fontWeight="bold"
        textAlign={alignment || 'center'}
        px="8"
      >
        {title}
      </Text>

      {onBack && (
        <IconButton
          onClick={onBack}
          icon={<IoChevronBack />}
          aria-label="Close Modal"
          borderRadius="full"
          variant="ghost"
          size="sm"
          color="blue.500"
          fontWeight="bold"
          fontSize="1.5rem"
        ></IconButton>
      )}

      {onClose && (
        <IconButton
          onClick={onClose}
          icon={<CloseIcon />}
          aria-label="Close Modal"
          borderRadius="full"
          bg="gray.100"
          color="black"
          ml="auto"
          size="sm"
        ></IconButton>
      )}
    </Flex>
  )
}
