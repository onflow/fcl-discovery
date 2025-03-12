import { HStack, IconButton, Text, Tooltip } from '@chakra-ui/react'
import CopyIcon from './icons/CopyIcon'
import { ComponentProps, ReactNode, useEffect, useRef, useState } from 'react'
import { CheckIcon, WarningIcon } from '@chakra-ui/icons'

type CopyButtonProps = {
  text: string
} & Partial<ComponentProps<typeof IconButton>>

export default function CopyButton({
  text,
  isDisabled,
  ...props
}: CopyButtonProps) {
  const size = '1.75rem'
  const checkSize = '1.15rem'

  const [showCheck, setShowCheck] = useState(false)
  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const icon = showCheck ? (
    <CheckIcon boxSize={checkSize} />
  ) : (
    <CopyIcon boxSize={size} />
  )

  function onClick() {
    navigator.clipboard.writeText(text)
    setShowCheck(true)
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current)
    }
    checkTimeoutRef.current = setTimeout(() => {
      setShowCheck(false)
    }, 1000)
  }

  const [isClipboardAllowed, setIsClipboardAllowed] = useState(true)
  useEffect(() => {
    navigator.permissions
      .query({ name: 'clipboard-write' as PermissionName })
      .then(result => {
        setIsClipboardAllowed(result?.state === 'granted')
      })
      .catch(() => {
        setIsClipboardAllowed(false)
      })
  }, [])

  const wrapTooltip = (node: ReactNode) => {
    if (isClipboardAllowed) {
      return node
    }

    return (
      <Tooltip
        label={
          isClipboardAllowed ? null : (
            <HStack>
              <WarningIcon color="red.500" />
              <Text textStyle="body2">No Clipboard Access</Text>
            </HStack>
          )
        }
        placement="bottom"
        borderRadius="md"
        px={2}
        py={1}
      >
        {node}
      </Tooltip>
    )
  }

  return wrapTooltip(
    <IconButton
      variant="ghost"
      color="foreground.60%"
      size="sm"
      borderRadius="full"
      aria-label="Copy"
      minW={0}
      boxSize={size}
      icon={icon}
      onClick={onClick}
      isRound
      isDisabled={isDisabled || !isClipboardAllowed}
      {...props}
    ></IconButton>,
  )
}
