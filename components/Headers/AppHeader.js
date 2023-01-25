import { Image, Text, Heading, HStack, Stack } from '@chakra-ui/react'
import { useFCL } from '../../hooks/useFCL'

export default function AppHeader() {
  const { appConfig, clientConfig } = useFCL()
  const title = appConfig?.title ? `Connect to ${appConfig?.title}` : 'Connect'

  return (
    <Stack marginBottom={25}>
      <Heading as="h2" size="md">
        {title}
      </Heading>
      <HStack>
        {appConfig?.icon && (
          <Image
            src={appConfig.icon}
            alt="Logo"
            borderRadius={50}
            boxSize="25px"
          />
        )}
        <Text color="grey">{clientConfig?.hostname || 'Unknown'}</Text>
      </HStack>
    </Stack>
  )
}
