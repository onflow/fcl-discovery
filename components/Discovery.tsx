import useSWR from 'swr'
import { sortByAddress } from '../helpers/services'
import { LOCAL_STORAGE_KEYS, PATHS } from '../helpers/constants'
import ServiceCard from './ServiceCard'
import Header from './Headers/Header'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getUserAgent } from '../helpers/userAgent'
import { Container, Stack } from '@chakra-ui/react'
import { Service, Strategy } from '../types'

const fetcher = (url, opts) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(opts),
  }).then(d => d.json())
}

type Props = {
  network: string
  appVersion: string
  extensions: Service[]
  walletInclude: string[]
  clientServices: Service[]
  supportedStrategies: Strategy[]
  port: number
}

export const Discovery = ({
  network,
  appVersion,
  extensions,
  walletInclude,
  clientServices,
  supportedStrategies,
  port,
}: Props) => {
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
      network,
      port,
    })
  )
  const [lastUsed, _] = useLocalStorage(LOCAL_STORAGE_KEYS.LAST_INSTALLED, null)
  const services = sortByAddress(data, lastUsed)

  if (!data) return <div />
  if (error) return <div>Error Loading Data</div>

  return (
    <Container paddingTop={5} paddingBottom={5}>
      <Header />
      <Stack spacing='12px'>
        {services.length === 0 && <div>No Wallets Found</div>}
        {services.map((service, index) => {
          return (
            <ServiceCard
              key={service?.provider?.address ?? index}
              {...service.provider}
              service={service}
              lastUsed={service?.provider?.address === lastUsed}
            />
          )
        })}
      </Stack>
    </Container>
  )
}
