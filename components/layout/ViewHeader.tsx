import { Flex, FlexProps, Heading, IconButton, Text } from '@chakra-ui/react'
import { ComponentProps } from 'react'
import CloseIcon from '../icons/CloseIcon'
import BackIcon from '../icons/BackIcon'

type HeaderProps = {
  title?: string
  titleOnly?: boolean
  titleProps?: ComponentProps<typeof Text>
  onClose?: () => void
  onBack?: () => void
} & FlexProps

export default function ViewHeader({
  title,
  titleOnly,
  titleProps,
  onClose,
  onBack,
}: HeaderProps) {
  return (
    <Flex alignItems="center" px={5} h="3.75rem" flexShrink={0}>
      {true && (
        <Flex flexGrow={1} flexBasis={0} justifyContent="flex-start">
          {onBack && (
            <IconButton
              onClick={onBack}
              icon={<BackIcon h="1.125rem" pr="0.15rem" />}
              aria-label="Close Modal"
              variant="ghost"
              isRound={true}
              boxSize="1.75rem"
              minW="0"
            ></IconButton>
          )}
        </Flex>
      )}

      <Heading {...titleProps}>{title}</Heading>

      {true && (
        <Flex flexGrow={1} flexBasis={0} justifyContent="flex-end">
          {onClose && (
            <IconButton
              onClick={onClose}
              variant="secondary"
              icon={<CloseIcon h="0.625rem" />}
              aria-label="Close Modal"
              isRound={true}
              boxSize="1.75rem"
              minW="0"
              color="rgba(0, 0, 0, 0.6)"
            ></IconButton>
          )}
        </Flex>
      )}
    </Flex>
  )
}
