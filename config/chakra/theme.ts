import { extendTheme, ThemeOverride } from '@chakra-ui/react'
import { toRem } from './util/sizes'
import { headingConfig } from './components/heading'
import { textConfig } from './components/text'
import { buttonConfig } from './components/button'
import { typography } from './typography'
import { lightColors, semanticColorTokens } from './colors'

export const theme = extendTheme({
  initialColorMode: 'system',
  useSystemColorMode: true,
  styles: {
    global: {
      body: {
        backgroundColor: 'transparent',
      },
      '*': {
        borderColor: 'borderColor',
      },
    },
  },
  fonts: {
    body: 'SFRounded,ui-rounded,"SF Pro Rounded",-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    heading:
      'SFRounded,ui-rounded,"SF Pro Rounded",-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
  },
  textStyles: typography,
  components: {
    Heading: headingConfig,
    Text: textConfig,
    Button: buttonConfig,
  },
  colors: lightColors,
  space: {
    xs: toRem(5),
    sm: toRem(8),
    md: toRem(12),
    lg: toRem(16),
    xl: toRem(20),
  },
  semanticTokens: {
    colors: semanticColorTokens,
  },
} satisfies ThemeOverride)
