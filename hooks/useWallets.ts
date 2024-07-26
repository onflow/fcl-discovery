import useSWR from 'swr'
import { PATHS } from '../helpers/constants'
import { useConfig } from '../contexts/ConfigContext'
import { getUserAgent } from '../helpers/platform'
import { Service } from '../types'

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
  const {
    appVersion,
    clientConfig,
    walletInclude,
    clientServices,
    supportedStrategies,
    network,
    port,
  } = useConfig()

  const requestUrl = `/api${PATHS[network.toUpperCase()]}?discoveryType=UI`
  const body = {
    type: ['authn'],
    fclVersion: appVersion,
    include: walletInclude,
    features: {
      suggested: clientConfig?.discoveryFeaturesSuggested || [],
    },
    userAgent: getUserAgent(),
    clientServices, // TODO: maybe combine this with extensions except version support then needs to be fixed in later step
    supportedStrategies,
    network,
    port,
  }

  const { data: wallets, error } = useSWR(genKey(requestUrl, body), url =>
    fetcher<Service[]>(url, body)
  )

  return { wallets, error, isLoading: !wallets && !error }
}
