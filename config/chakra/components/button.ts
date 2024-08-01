import {
  defineStyle,
  defineStyleConfig,
  StyleFunctionProps,
  SystemStyleInterpolation,
} from '@chakra-ui/react'
import { theme as defaultTheme } from '@chakra-ui/react'

const primaryVariant = defineStyle((props: StyleFunctionProps) => ({
  ...defaultTheme.components.Button.variants.solid(props),
}))

const secondaryVariant = defineStyle((props: StyleFunctionProps) => ({
  ...defaultTheme.components.Button.variants.solid(props),
}))

const sizes = {
  sm: defineStyle({
    px: 'md',
    py: 'sm',
  }),
}

export const buttonConfig = defineStyleConfig({
  baseStyle: {
    borderRadius: 'full',
    textStyle: 'Body 2 (Bold)',
  },
  variants: {
    ...defaultTheme.components.Button.variants,
    primary: primaryVariant as SystemStyleInterpolation,
    secondary: secondaryVariant as SystemStyleInterpolation,
  },
  defaultProps: {
    colorScheme: 'primary',
    size: 'sm',
  },
  sizes: {
    ...defaultTheme.components.Button.sizes,
    ...sizes,
  },
})
