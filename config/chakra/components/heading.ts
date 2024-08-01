import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { toRem } from '../util/sizes'

const headingStyle = defineStyle({
  fontSize: toRem(18),
  lineHeight: toRem(24),
  fontWeight: '700',
})

export const headingConfig = defineStyleConfig({
  variants: {
    heading: headingStyle,
  },
  defaultProps: {
    variant: 'heading',
  },
  baseStyle: {},
})
