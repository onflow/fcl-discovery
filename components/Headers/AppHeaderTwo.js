import { Image, Text, Heading, HStack, Stack } from '@chakra-ui/react'
import { useFCL } from '../../hooks/useFCL'

export default function AppHeaderTwo() {
  const { appConfig, clientConfig } = useFCL()
  const title = appConfig?.title ? `Connect to ${appConfig?.title}`: 'Connect'

  return (
    <Stack>
      <Heading as='h2' size='md'>{title}</Heading>
      <HStack>
        {appConfig?.icon &&
          <Image 
            src={appConfig.icon} alt="Logo"
            borderRadius={50}
            boxSize='35px'
          />
        }
        {clientConfig?.hostname &&
          <Text color='grey'>
            {clientConfig.hostname}
          </Text>
        }
      </HStack>
    </Stack>
  )
}