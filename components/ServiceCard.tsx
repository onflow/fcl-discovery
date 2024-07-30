import { isExtension } from '../helpers/services'
import {
  Card,
  CardBody,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Wallet } from '../data/wallets'

interface ServiceCardProps {
  wallet: Wallet
  onClick: () => void
  isSelected?: boolean
}

export default function ServiceCard({
  wallet,
  onClick,
  isSelected,
}: ServiceCardProps) {
  const extensionService = wallet.services.find(isExtension)
  const isExtensionService = !!extensionService
  const isExtensionServiceInstalled = extensionService?.provider?.is_installed

  return (
    <Card
      size="sm"
      as="button"
      _hover={{
        transform: 'scale(1.01)',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease-in-out',
      }}
      onClick={onClick}
      variant="unstyled"
      borderRadius="xl"
      backgroundColor={isSelected ? 'gray.100' : 'white'}
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
