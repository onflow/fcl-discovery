import { IconButton } from '@chakra-ui/react'
import CopyIcon from './icons/CopyIcon'
import { ComponentProps, useRef, useState } from 'react'
import { CheckIcon } from '@chakra-ui/icons'

type CopyButtonProps = {
  text: string
} & Partial<ComponentProps<typeof IconButton>>

export default function CopyButton({ text, ...props }: CopyButtonProps) {
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

  return (
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
      {...props}
    ></IconButton>
  )
}
