import { CloseIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { ComponentProps } from 'react'
import { IoChevronBack } from 'react-icons/io5'

type HeaderProps = {
  title?: string
  titleOnly?: boolean
  titleProps?: ComponentProps<typeof Text>
  onClose?: () => void
  onBack?: () => void
}

export default function ViewHeader({
  title,
  titleOnly,
  titleProps,
  onClose,
  onBack,
}: HeaderProps) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      px={6}
      pt={4}
      pb={6}
    >
      {!titleOnly && (
        <Flex flexGrow={1} flexBasis={0} justifyContent="flex-start">
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
        </Flex>
      )}

      <Text
        fontSize="xl"
        fontWeight="bold"
        textAlign={'center'}
        {...titleProps}
      >
        {title}
      </Text>

      {!titleOnly && (
        <Flex flexGrow={1} flexBasis={0} justifyContent="flex-end">
          {onClose && (
            <IconButton
              onClick={onClose}
              icon={<CloseIcon />}
              aria-label="Close Modal"
              borderRadius="full"
              bg="gray.100"
              color="black"
              size="sm"
            ></IconButton>
          )}
        </Flex>
      )}
    </Flex>
  )
}
