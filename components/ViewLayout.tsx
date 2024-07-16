import { Stack } from '@chakra-ui/react'
import ViewHeader from './ViewHeader'
import { ComponentProps, ReactNode } from 'react'

type ViewLayoutProps = {
  children: ReactNode
  header?: ComponentProps<typeof ViewHeader>
}

export default function ViewLayout({ children, header }: ViewLayoutProps) {
  return (
    <Stack spacing={0} overflow="hidden">
      {header && <ViewHeader {...header} />}
      {children}
    </Stack>
  )
}
