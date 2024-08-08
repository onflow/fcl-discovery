import { extendTheme, ThemeOverride } from '@chakra-ui/react'
import { toRem } from './util/sizes'
import { headingConfig } from './components/heading'
import { textConfig } from './components/text'
import { buttonConfig } from './components/button'
import { typography } from './typography'

export const theme = extendTheme({
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
  colors: {
    primary: {
      '50': '#94B8FF',
      '100': '#7FA9FF',
      '200': '#699BFF',
      '300': '#548DFF',
      '400': '#3E7EFF',
      '500': '#2970FF',
      '600': '#2565E6',
      '700': '#215ACC',
      '800': '#1D4EB3',
      '900': '#194399',
    },
    backgroundElevated: '#F7F7F7',
    buttonBackground: '#F2F2F2',
    borderColor: '#E0E0E0',
  },
  space: {
    xs: toRem(5),
    sm: toRem(8),
    md: toRem(12),
    lg: toRem(16),
    xl: toRem(20),
  },
} satisfies ThemeOverride)
