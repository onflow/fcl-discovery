import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  useStyles,
} from '@chakra-ui/react'
import { ComponentProps } from 'react'
import { IoChevronBack } from 'react-icons/io5'
import CloseIcon from './Icons/CloseIcon'
import BackIcon from './Icons/BackIcon'

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
    <Flex alignItems="center" justifyContent="space-between" px={5} py={4}>
      {!titleOnly && (
        <Flex flexGrow={1} flexBasis={0} justifyContent="flex-start">
          {onBack && (
            <IconButton
              onClick={onBack}
              icon={<BackIcon h="1.125rem" pr="0.15rem" />}
              aria-label="Close Modal"
              borderRadius="full"
              variant="ghost"
              isRound={true}
              boxSize="1.75rem"
              minW="0"
            ></IconButton>
          )}
        </Flex>
      )}

      <Flex direction="column" justifyContent="center" h="1.75rem">
        <Heading textAlign={'center'} {...titleProps}>
          {title}
        </Heading>
      </Flex>

      {!titleOnly && (
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
