import { Flex, Text } from '@chakra-ui/react'
import { Service } from '../types'
import ServiceCard from './ServiceCard'

interface ServiceGroupProps {
  title: string
  services: Service[]
  titleProps?: React.ComponentProps<typeof Text>
}

export default function ServiceGroup({
  title,
  services,
  titleProps,
}: ServiceGroupProps) {
  return (
    <Flex direction="column">
      <Text fontSize="lg" fontWeight="bold" mb={2} {...titleProps}>
        {title}
      </Text>
      {services.map((service, index) => {
        return (
          <ServiceCard
            key={service?.provider?.address ?? index}
            service={service}
            name={service?.provider?.name ?? ''}
            icon={service?.provider?.icon ?? ''}
          />
        )
      })}
    </Flex>
  )
}
