import useSWR from 'swr/immutable'
import { useConfig } from '../contexts/FclContext'
import { Wallet } from '../data/wallets'
import { isExtension } from '../helpers/services'
import { useWalletHistory } from './useWalletHistory'
import { useMemo } from 'react'
import { useDevice } from '../contexts/DeviceContext'

const genKey = (url: string, opts: any) => [url, JSON.stringify(opts)]

const fetcher = async <T>(url: string, opts: any) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(opts),
  }).then(d => d.json() as Promise<T>)
}

export function useWallets() {
  const { isLastUsed } = useWalletHistory()
  const { userAgent } = useDevice()

  const {
    appVersion,
    clientConfig,
    walletInclude,
    clientServices,
    supportedStrategies,
    network,
    port,
  } = useConfig()

  const requestUrl = `/api/${network.toLowerCase()}/wallets?discoveryType=UI`
  const body = {
    type: ['authn'],
    fclVersion: appVersion,
    include: walletInclude,
    features: {
      suggested: clientConfig?.discoveryFeaturesSuggested || [],
    },
    userAgent,
    clientServices, // TODO: maybe combine this with extensions except version support then needs to be fixed in later step
    supportedStrategies,
    network,
    port,
  }

  const { data, error } = useSWR(genKey(requestUrl, body), ([url]) =>
    fetcher<Wallet[]>(url, body),
  )

  const { wallets, lastUsedWallet, installedWallets, otherWallets } =
    useMemo(() => {
      let lastUsedWallet = null
      const installedWallets = []
      const otherWallets = []
      for (const wallet of (data || []) as Wallet[]) {
        const hasExtension = wallet.services.some(isExtension)
        if (isLastUsed(wallet)) {
          lastUsedWallet = wallet
        } else if (hasExtension) {
          installedWallets.push(wallet)
        } else {
          otherWallets.push(wallet)
        }
      }

      return {
        wallets: [
          ...(lastUsedWallet ? [lastUsedWallet] : []),
          ...installedWallets,
          ...otherWallets,
        ],
        lastUsedWallet,
        installedWallets,
        otherWallets,
      }
    }, [data, isLastUsed])

  return {
    wallets,
    lastUsedWallet,
    installedWallets,
    otherWallets,
    error,
    isLoading: !data && !error,
  }
}
