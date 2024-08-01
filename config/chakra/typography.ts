import { SystemStyleObjectRecord } from '@chakra-ui/react'
import { toRem } from './util/sizes'

// This is a pretty common/longstanding issue in Chakra UI where "textStyles" cannot be used for theming.
// https://github.com/chakra-ui/chakra-ui/issues/8264
// https://github.com/chakra-ui/chakra-ui/issues/3884
// (& many other issues exist)
// To use these in our theme we must manually apply them to components.
// `Text` component is unaffected by this issue, but other components like `Heading` and `Button` are.
export const typography = {
  body1: {
    fontSize: toRem(16),
    lineHeight: toRem(20),
  },
  body1Bold: {
    fontSize: toRem(16),
    lineHeight: toRem(20),
    fontWeight: '700',
  },
  body2: {
    fontSize: toRem(14),
    lineHeight: toRem(18),
  },
  body2Bold: {
    fontSize: toRem(14),
    lineHeight: toRem(18),
    fontWeight: '700',
  },
  heading: {
    fontSize: toRem(18),
    lineHeight: toRem(24),
    fontWeight: '700',
  },
} satisfies SystemStyleObjectRecord
