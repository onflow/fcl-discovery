import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { typography } from '../typography'

const headingStyle = defineStyle({
  ...typography.heading,
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
