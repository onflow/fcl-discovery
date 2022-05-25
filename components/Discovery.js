import { useMemo } from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import {
  combineServices,
  filterServicesForInstalledExtensions,
  serviceOfTypeAuthn,
  sortByAddress,
} from '../helpers/services'
import {
  LOCAL_STORAGE_KEYS,
  PATHS,
  SUPPORTED_VERSIONS,
} from '../helpers/constants'
import ServiceCard from './ServiceCard'
import { isGreaterThanOrEqualToVersion } from '../helpers/version'
import Header from './Headers/Header'
import { useStorage } from '../hooks/useStorage'
import { pipe } from '../helpers/pipe'
import { getUserAgent } from '../helpers/userAgent'

const DiscoveryContainer = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 5px 10px 5px 5px;
`

const ProvidersList = styled.div``

const fetcher = (url, opts) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(opts),
  }).then(d => d.json())
}

export const Discovery = ({
  network,
  appVersion,
  extensions,
  walletInclude,
}) => {
  const requestUrl = `/api${PATHS[network.toUpperCase()]}?discoveryType=UI`
  const { data, error } = useSWR(requestUrl, url =>
    fetcher(url, {
      fclVersion: appVersion,
      include: walletInclude,
      userAgent: getUserAgent(),
    })
  )
  const [lastUsed, _] = useStorage(LOCAL_STORAGE_KEYS.LAST_INSTALLED, null)

  const services = useMemo(() => {
    const isSupported = isGreaterThanOrEqualToVersion(
      appVersion,
      SUPPORTED_VERSIONS.EXTENSIONS
    )

    return pipe(
      filterServicesForInstalledExtensions(extensions),
      data => {
        if (!isSupported) return data
        return combineServices(data, extensions, true)
      },
      serviceOfTypeAuthn,
      data => sortByAddress(data, lastUsed)
    )(data)
  }, [data, extensions, appVersion])

  if (!data) return <div />
  if (error) return <div>Error Loading Data</div>

  return (
    <DiscoveryContainer>
      <Header />
      <ProvidersList>
        {services.length === 0 && <div>No Wallets Found</div>}
        {services.map((service, index) => {
          return (
            <ServiceCard
              key={service?.provider?.address ?? index}
              isEnabled={Boolean(service.provider)}
              {...service.provider}
              service={service}
              lastUsed={service?.provider?.address === lastUsed}
            />
          )
        })}
      </ProvidersList>
    </DiscoveryContainer>
  )
}
