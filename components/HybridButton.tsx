import { Button, ButtonProps, RightJoinProps } from '@chakra-ui/react'
import NextLink, { LinkProps } from 'next/link'

type BaseProps = {
  children: React.ReactNode
}

type LinkButtonProps = RightJoinProps<LinkProps, ButtonProps> & BaseProps

type StandardButtonProps = ButtonProps & BaseProps

type HybridButtonProps = LinkButtonProps | StandardButtonProps

function HybridButton({ children, ...props }: HybridButtonProps) {
  if ('href' in props) {
    return (
      <Button as={NextLink} target="_blank" {...props}>
        {children}
      </Button>
    )
  } else {
    return <Button {...props}>{children}</Button>
  }
}

export default HybridButton
