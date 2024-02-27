import { NETWORKS } from './constants'

export const isTestnet = () => {
  return window.location.pathname.split('/').includes(NETWORKS.TESTNET) || window.location.pathname.split('/').includes(NETWORKS.PREVIEWNET)
}
