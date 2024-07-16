import { Flex, Stack, Text } from '@chakra-ui/react'
import { Service } from '../types'
import ServiceCard from './ServiceCard'

interface ServiceGroupProps {
  title: string
  services: Service[]
  titleProps?: React.ComponentProps<typeof Text>
  cardProps?: React.ComponentProps<typeof ServiceCard>
}

export default function ServiceGroup({
  title,
  services,
  titleProps,
  cardProps,
}: ServiceGroupProps) {
  return (
    <Stack spacing={1}>
      <Text fontSize="lg" fontWeight="bold" mb={2} {...titleProps}>
        {title}
      </Text>
      <Stack spacing={2}>
        {services.map((service, index) => {
          return (
            <ServiceCard
              key={service?.provider?.address ?? index}
              service={service}
              name={service?.provider?.name ?? ''}
              icon={service?.provider?.icon ?? ''}
              {...cardProps}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}
