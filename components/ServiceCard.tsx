import { isExtension } from '../helpers/services'
import {
  Card,
  CardBody,
  Flex,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { Wallet } from '../data/wallets'

interface ServiceCardProps {
  wallet: Wallet
}

export default function ServiceCard({ wallet }: ServiceCardProps) {
  const extensionService = wallet.services.find(isExtension)
  const isExtensionService = !!extensionService
  const isExtensionServiceInstalled = extensionService?.provider?.is_installed

  const onSelect = () => {
    // TODO: implement connect wallet logic, future PR
  }

  return (
    <Card
      size="sm"
      as="button"
      _hover={{
        transform: 'scale(1.01)',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease-in-out',
      }}
      onClick={onSelect}
      variant="unstyled"
    >
      <CardBody width="100%">
        <Flex alignItems="center" justifyContent="space-between">
          <Stack>
            <Flex alignItems="center" justifyContent="space-between">
              <HStack>
                <Image
                  src={wallet.icon}
                  alt={wallet.name}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderStyle="solid"
                  boxSize="2.7rem"
                  alignSelf="start"
                  my="auto"
                />
                <Flex direction="column" textAlign="left">
                  <Text fontSize="lg" as="b">
                    {wallet.name}
                  </Text>

                  {isExtensionService && !isExtensionServiceInstalled ? (
                    <Text fontSize="sm" color="gray.500">
                      Install Extension
                    </Text>
                  ) : null}
                </Flex>
              </HStack>
            </Flex>
          </Stack>
        </Flex>
      </CardBody>
    </Card>
  )
}
