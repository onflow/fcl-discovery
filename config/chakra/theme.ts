import { extendTheme, ThemeOverride } from '@chakra-ui/react'
import { toRem } from './util/sizes'
import { headingConfig } from './components/heading'
import { textConfig } from './components/text'
import { buttonConfig } from './components/button'
import { typography } from './typography'
import { baseColors, semanticColorTokens } from './colors'

export const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  styles: {
    global: {
      body: {
        backgroundColor: 'transparent',
        color: 'foreground',
      },
      '*': {
        borderColor: 'borderColor',
      },
      html: {
        // This is a workaround to prevent color scheme mismatch between
        // the parent and the iframe.  Some browsers (e.g. Chrome) render
        // a blank canvas when the color scheme mismatches, causing transparency
        // issues.  (FCL currently sets the color scheme to white.)
        //
        // We must force the browser to believe that our app is naive to color
        // schemes for the foreseeable future until a better solution is found.
        //
        // The downside is that the app will not render well if a user
        // uses forced dark mode in their browser, but this is fairly trivial.
        colorScheme: 'normal !important',
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
  colors: baseColors,
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
