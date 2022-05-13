import { PATHS } from './constants'

export const createPathFromArray = (arr = []) =>
  `/${arr.join('/')}`.toLowerCase()

export const isValidPath = path => {
  if (!path) return false
  const pathStr = createPathFromArray(path)
  return Object.values(PATHS).some(p => p === pathStr)
}

export const getNetworkFromPath = path =>
  path && path.length === 2 ? path[0].toLowerCase() : 'mainnet'
