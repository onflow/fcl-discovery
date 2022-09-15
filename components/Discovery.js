import useSWR from 'swr'
import styled from 'styled-components'
import { sortByAddress } from '../helpers/services'
import { LOCAL_STORAGE_KEYS, PATHS } from '../helpers/constants'
import ServiceCard from './ServiceCard'
import Header from './Headers/Header'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getUserAgent } from '../helpers/userAgent'

const DiscoveryContainer = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 5px 10px 20px 5px;
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
  clientServices,
  supportedStrategies,
}) => {
  const requestUrl = `/api${PATHS[network.toUpperCase()]}?discoveryType=UI`
  const { data, error } = useSWR(requestUrl, url =>
    fetcher(url, {
      type: ['authn'],
      fclVersion: appVersion,
      include: walletInclude,
      extensions,
      userAgent: getUserAgent(),
      clientServices, // TODO: maybe combine this with extensions except version support then needs to be fixed in later step
      supportedStrategies,
    })
  )
  const [lastUsed, _] = useLocalStorage(LOCAL_STORAGE_KEYS.LAST_INSTALLED, null)
  const services = sortByAddress(data, lastUsed)

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
