import { Center, Flex, Image, Text } from '@chakra-ui/react'

export default function FlowHeader() {
  return (
    <>
      <Center>
        <Flex flexDirection="column" alignItems="center" marginBottom={4}>
          <Image 
            src="/logo.svg" alt="Logo"
            w='140px'
            h='auto'
            marginBottom={3}
          />
          <Text color='grey'>
            Choose a Provider
          </Text>
        </Flex>
      </Center>
    </>
  )
}
