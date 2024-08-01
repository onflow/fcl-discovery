import { StyleFunctionProps } from '@chakra-ui/react'
import { mergeDeepRight } from 'rambda'

export function extendVariant(variant: any, extend: any) {
  return (props: StyleFunctionProps) => {
    return mergeDeepRight(
      typeof variant === 'function' ? variant(props) : variant,
      typeof extend === 'function' ? extend(props) : extend,
    )
  }
}
