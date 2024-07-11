import { Stack } from '@chakra-ui/react'
import ServiceGroup from './ServiceGroup'
import { useLastUsedState } from '../hooks/useLastUsedState'
import { Service } from '../types'
import { useMemo } from 'react'

interface ServiceListProps {
  services: Service[]
}

export default function ServiceList({ services }: ServiceListProps) {
  const { lastUsed: lastUsedAddr } = useLastUsedState()

  // Get the last used service, installed services, and recommended services
  const { lastUsedService, installedServices, recommendedServices } = useMemo(
    () =>
      services.reduce(
        (acc, service) => {
          if (service.provider.address === lastUsedAddr && lastUsedAddr) {
            acc.lastUsedService = service
          } else if (service.provider.is_installed) {
            acc.installedServices.push(service)
          } else {
            acc.recommendedServices.push(service)
          }
          return acc
        },
        {
          lastUsedService: null,
          installedServices: [] as Service[],
          recommendedServices: [] as Service[],
        }
      ),
    [services, lastUsedAddr]
  )

  return (
    <Stack spacing={2}>
      {lastUsedService && (
        <ServiceGroup
          title="Last Used"
          services={[lastUsedService]}
          titleProps={{
            color: 'blue.400',
          }}
        />
      )}

      {installedServices.length > 0 && (
        <ServiceGroup title="Installed" services={installedServices} />
      )}

      {recommendedServices.length > 0 && (
        <ServiceGroup title="Recommended" services={recommendedServices} />
      )}
    </Stack>
  )
}
