import useSWR from 'swr/immutable'
import { useConfig } from '../contexts/FclContext'
import { Wallet } from '../data/wallets'
import { isExtension } from '../helpers/services'
import { useWalletHistory } from './useWalletHistory'
import { useMemo } from 'react'
import { useDevice } from '../contexts/DeviceContext'
import { getCompatibleInstallLinks } from './useInstallLinks'

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
  const { userAgent, deviceInfo } = useDevice()

  const {
    appVersion,
    clientConfig,
    walletInclude,
    clientServices,
    supportedStrategies,
    network,
    port,
  } = useConfig()

  const params = new URLSearchParams()
  params.append('discoveryType', 'UI')
  params.append('enableExperimentalWalletsEndpoint', 'true')
  params.append('origin', window.location.origin)

  const requestUrl = `/api/${network.toLowerCase()}/wallets?${params.toString()}`
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

  const installLinks = useMemo(
    () =>
      data?.reduce(
        (acc, wallet) => {
          const links = getCompatibleInstallLinks(
            wallet,
            supportedStrategies,
            deviceInfo,
          )
          if (Object.keys(links).length > 0) {
            acc[wallet.uid] = links
          }
          return acc
        },
        {} as Record<string, Record<string, string>>,
      ) || {},
    [data, supportedStrategies, deviceInfo],
  )

  const { wallets, lastUsedWallet, installedWallets, otherWallets } =
    useMemo(() => {
      let lastUsedWallet: Wallet | null = null
      const installedWallets: Wallet[] = []
      const otherWallets: Wallet[] = []
      for (const wallet of (data || []) as Wallet[]) {
        if (!installLinks[wallet.uid] && !wallet.services.length) {
          continue
        }

        const hasExtension = wallet.services.some(s => isExtension(s))
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
    installLinks,
    error,
    isLoading: !data && !error,
  }
}
