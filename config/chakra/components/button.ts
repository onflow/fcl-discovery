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

const primaryVariant = defineStyle((props: StyleFunctionProps) => {
  const { colorScheme: c } = props
  const background = mode(`${c}.500`, `${c}.200`)(props)

  return {
    bg: background,
    color: mode('white', `gray.800`)(props),
    _hover: {
      transform: 'scale(1.07)',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease-in-out',
    },
    _active: {
      transform: 'scale(0.93)',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease-in-out',
    },
  }
})

const secondaryVariant = defineStyle((props: StyleFunctionProps) => {
  const { colorScheme: c } = props

  return {
    bg: 'buttonBackground',
    color: mode(`${c}.500`, `${c}.200`)(props),
    _hover: {
      bg: 'buttonBackground',
      transform: 'scale(1.07)',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease-in-out',
    },
    _active: {
      bg: 'buttonBackground',
      transform: 'scale(0.93)',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease-in-out',
    },
  }
})

const ghostVariant = defineStyle(props => {
  const { colorScheme: c, theme } = props

  return {
    color: mode(`${c}.500`, `${c}.200`)(props),
    bg: 'transparent',
    _hover: {
      bg: 'transparent',
      transform: 'scale(1.07)',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease-in-out',
    },
    _active: {
      bg: 'transparent',
      transform: 'scale(0.93)',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease-in-out',
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
    ghost: ghostVariant,
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
