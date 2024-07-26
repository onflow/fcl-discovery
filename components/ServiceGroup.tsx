import { Stack, Text } from '@chakra-ui/react'
import ServiceCard from './ServiceCard'
import { Wallet } from '../data/wallets'

interface ServiceGroupProps {
  title: string
  wallets: Wallet[]
  titleProps?: React.ComponentProps<typeof Text>
  cardProps?: React.ComponentProps<typeof ServiceCard>
}

export default function ServiceGroup({
  title,
  wallets,
  titleProps,
  cardProps,
}: ServiceGroupProps) {
  return (
    <Stack spacing={1}>
      <Text fontSize="lg" fontWeight="bold" mb={2} {...titleProps}>
        {title}
      </Text>
      <Stack spacing={2}>
        {wallets.map(wallet => {
          return <ServiceCard key={wallet.uid} wallet={wallet} {...cardProps} />
        })}
      </Stack>
    </Stack>
  )
}
