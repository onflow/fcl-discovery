import { Stack, StackProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

type ViewContainerProps = {
  children: ReactNode
} & StackProps

export function ViewContainer({ children, ...props }: ViewContainerProps) {
  return (
    <Stack flexGrow={1} px={5} pb={5} {...props}>
      {children}
    </Stack>
  )
}
