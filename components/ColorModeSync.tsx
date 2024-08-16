import { useColorMode, useColorModePreference } from '@chakra-ui/react'
import { useEffect } from 'react'

// Used to keep users color mode in sync with their preferred color mode
// Chakra is supposed to do it, but when the system color mode is changed
// when the app is closed, Chakra never updates the color mode, so this
// helps keep it in sync.
export function ColorModeSync() {
  const preferredColorMode = useColorModePreference()
  const { setColorMode, colorMode } = useColorMode()

  useEffect(() => {
    if (!preferredColorMode) return
    if (colorMode === preferredColorMode) return
    setColorMode(preferredColorMode)
  }, [preferredColorMode])

  return null
}
