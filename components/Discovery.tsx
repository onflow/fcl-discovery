import { sortByAddress } from '../helpers/services'
import { LOCAL_STORAGE_KEYS, SUPPORTED_VERSIONS } from '../helpers/constants'
import ServiceCard from './ServiceCard'
import Header from './Headers/Header'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Container, Stack } from '@chakra-ui/react'
import Features from './Features'
import { isGreaterThanOrEqualToVersion } from '../helpers/version'
import { useWallets } from '../hooks/useWallets'
import { useConfig } from '../contexts/ConfigContext'

export const Discovery = () => {
  const { wallets: data, error } = useWallets()
  const [lastUsed, _] = useLocalStorage(LOCAL_STORAGE_KEYS.LAST_INSTALLED, null)
  const services = sortByAddress(data, lastUsed)

  const { appVersion } = useConfig()
  const isFeaturesSupported = isGreaterThanOrEqualToVersion(
    appVersion,
    SUPPORTED_VERSIONS.SUGGESTED_FEATURES
  )

  if (!data) return <div />
  if (error) return <div>Error Loading Data</div>

  return (
    <Container paddingTop={5} paddingBottom={5}>
      <Header />
      {isFeaturesSupported && <Features />}
      <Stack spacing="12px">
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
