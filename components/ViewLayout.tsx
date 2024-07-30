import { Divider, Flex, Stack } from '@chakra-ui/react'
import ViewHeader from './ViewHeader'
import { ComponentProps, ReactNode } from 'react'

type ViewLayoutProps = {
  children: ReactNode
  header?: ComponentProps<typeof ViewHeader>
  sidebar?: ReactNode
} & ComponentProps<typeof Stack>

export default function ViewLayout({
  children,
  header,
  sidebar,
  ...rootProps
}: ViewLayoutProps) {
  return (
    <Flex w={750} h={500} maxH={600} overflow="hidden" {...rootProps}>
      <Stack spacing={0} overflow="hidden" w={300}>
        {sidebar}
      </Stack>

      <Divider orientation="vertical" />

      <Stack spacing={0} overflow="hidden" flexGrow={1}>
        {header && <ViewHeader {...header} />}
        {children}
      </Stack>
    </Flex>
  )
}
