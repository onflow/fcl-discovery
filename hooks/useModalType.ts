'use client'

import { useBreakpointValue } from '@chakra-ui/react'

export function useModalType() {
  const isDrawer = useBreakpointValue(
    { base: true, sm: false },
    { ssr: true, fallback: 'sm' },
  )
  return isDrawer ? 'drawer' : 'modal'
}
