'use client'
import { useBreakpointValue } from '@chakra-ui/react'

export function useIsCollapsed() {
  const isCollapsed = useBreakpointValue(
    { base: true, md: false },
    { ssr: true, fallback: 'base' }
  )
  return isCollapsed
}
