import { isExtension } from '../helpers/services'
import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Wallet } from '../data/wallets'

type Props = {
  wallet: Wallet
  onButtonClick: () => void
}

export default function GetWalletCard({ wallet, onButtonClick }: Props) {
  const extensionService = wallet.services.find(isExtension)
  const isExtensionService = !!extensionService
  const isExtensionServiceInstalled = extensionService?.provider?.is_installed

  return (
    <Card size="md" variant="unstyled">
      <CardBody width="100%" display="flex">
        <Stack>
          <Flex alignItems="center" justifyContent="space-between">
            <HStack spacing={3}>
              <Image
                src={wallet.icon}
                alt={wallet.name}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.200"
                borderStyle="solid"
                boxSize="3.5rem"
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

        {/* TODO: Needs to link to install page, will be addressed in future PR */}
        <Button
          variant="outline"
          size="sm"
          colorScheme="blue"
          ml="auto"
          alignSelf="center"
          borderRadius="full"
          onClick={onButtonClick}
        >
          Get
        </Button>
      </CardBody>
    </Card>
  )
}
