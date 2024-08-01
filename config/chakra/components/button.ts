import {
  defineStyle,
  defineStyleConfig,
  StyleFunctionProps,
} from '@chakra-ui/react'
import { theme as defaultTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { typography } from '../typography'

const baseStyle = defineStyle({
  borderRadius: 'full',
  ...typography['body2Bold'],
})

const primaryVariant = defineStyle((props: StyleFunctionProps) => ({
  ...defaultTheme.components.Button.variants.solid(props),
}))

const secondaryVariant = defineStyle((props: StyleFunctionProps) => {
  const { colorScheme: c } = props

  return {
    bg: mode(`gray.100`, `gray.700`)(props),
    color: mode(`${c}.500`, `${c}.200`)(props),
    _hover: {
      bg: mode(`gray.200`, `gray.600`)(props),
    },
    _active: {
      bg: mode(`gray.300`, `gray.500`)(props),
    },
  }
})

const sizes = {
  sm: defineStyle({
    px: 'md',
    py: 'sm',
  }),
}

export const buttonConfig = defineStyleConfig({
  baseStyle: baseStyle,
  variants: {
    ...defaultTheme.components.Button.variants,
    primary: primaryVariant,
    secondary: secondaryVariant,
  },
  defaultProps: {
    colorScheme: 'primary',
    variant: 'primary',
    size: 'sm',
  },
  sizes: {
    ...sizes,
  },
})
