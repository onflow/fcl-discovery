import { Stack } from '@chakra-ui/react'
import ViewHeader from './ViewHeader'
import { ComponentProps, ReactNode } from 'react'

type ViewLayoutProps = {
  children: ReactNode
  header?: ComponentProps<typeof ViewHeader>
}

export default function ViewLayout({
  children,
  header,
  ...props
}: ViewLayoutProps) {
  return (
    <Stack direction="column" h="full" spacing={0}>
      {header && <ViewHeader {...header} />}
      {children}
    </Stack>
  )
}
