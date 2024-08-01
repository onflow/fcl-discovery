import { extendTheme, ThemeOverride } from '@chakra-ui/react'
import { toRem } from './util/sizes'
import { headingConfig } from './components/heading'
import { textConfig } from './components/text'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'transparent',
      },
    },
  },
  fonts: {
    body: '-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    heading:
      '-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
  },
  textStyles: {
    'Body 1': {
      fontSize: toRem(16),
      lineHeight: toRem(20),
    },
    'Body 1 (Bold)': {
      fontSize: toRem(16),
      lineHeight: toRem(20),
      fontWeight: '700',
    },
    'Body 2': {
      fontSize: toRem(14),
      lineHeight: toRem(18),
    },
    'Body 2 (Bold)': {
      fontSize: toRem(14),
      lineHeight: toRem(18),
      fontWeight: '700',
    },
  },
  components: {
    Heading: headingConfig,
    Text: textConfig,
  },
} satisfies ThemeOverride)
