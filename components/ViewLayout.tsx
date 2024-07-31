import { Container, Divider, Flex, Stack } from '@chakra-ui/react'
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
    <Flex
      w={['26rem', null, '46rem']}
      h="min(32rem, calc(100vh - 4rem))"
      overflow="hidden"
      {...rootProps}
    >
      <Stack
        spacing={0}
        overflow="hidden"
        w="18rem"
        display={['none', null, 'flex']}
      >
        {sidebarHeader}
        {sidebar}
      </Stack>

      <Divider orientation="vertical" display={['none', null, 'block']} />

      <Stack spacing={0} overflow="hidden" flexGrow={1}>
        {header}
        {children}
      </Stack>
    </Flex>
  )
}
