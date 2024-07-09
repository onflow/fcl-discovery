import { Flex, Stack } from '@chakra-ui/react'
import ViewHeader from './ViewHeader'

type ViewLayoutProps = {
  children: React.ReactNode
  header?: React.ComponentProps<typeof ViewHeader>
}

export default function ViewLayout({ children, header }: ViewLayoutProps) {
  return (
    <Stack direction="column" h="full" spacing={0}>
      {header && <ViewHeader {...header} />}
      {children}
    </Stack>
  )
}
