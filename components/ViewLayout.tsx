import { Divider, Flex, Stack } from '@chakra-ui/react'
import { ComponentProps, ReactNode } from 'react'

type ViewLayoutProps = {
  children: ReactNode
  header?: ReactNode
  sidebar?: ReactNode
  sidebarHeader?: ReactNode
} & ComponentProps<typeof Stack>

export default function ViewLayout({
  children,
  header,
  sidebar,
  sidebarHeader,
  ...rootProps
}: ViewLayoutProps) {
  return (
    <Flex w={750} h={500} maxH={600} overflow="hidden" {...rootProps}>
      <Stack spacing={0} overflow="hidden" w={300}>
        {sidebarHeader}
        {sidebar}
      </Stack>

      <Divider orientation="vertical" />

      <Stack spacing={0} overflow="hidden" flexGrow={1}>
        {header}
        {children}
      </Stack>
    </Flex>
  )
}
