import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { typography } from '../typography'

const headingStyle = defineStyle({
  ...typography.Heading,
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
