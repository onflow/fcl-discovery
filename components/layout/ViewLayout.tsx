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
    <Flex overflow="hidden" h="100%" {...rootProps}>
      <Stack
        spacing={0}
        overflow="hidden"
        w="17.875rem"
        display={['none', null, 'flex']}
        flexShrink={0}
      >
        {sidebarHeader}
        {sidebar}
      </Stack>

      <Divider orientation="vertical" display={['none', null, 'block']} />

      <Stack spacing={0} flexGrow={1} overflow="hidden">
        {header}
        <Stack overflow="auto" flexGrow={1} flexShrink={1}>
          {children}
        </Stack>
      </Stack>
    </Flex>
  )
}
