import { isExtension } from '../helpers/services'
import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
  Link,
} from '@chakra-ui/react'
import { Service } from '../types'
import NextLink from 'next/link'

type Props = {
  icon: string
  name: string
  service: Service
}

export default function GetWalletCard({ icon, name, service }: Props) {
  const isExtensionService = isExtension(service)
  const isExtensionServiceInstalled = Boolean(service?.provider?.is_installed)

  return (
    <Card size="md" variant="unstyled">
      <CardBody width="100%" display="flex">
        <Stack>
          <Flex alignItems="center" justifyContent="space-between">
            <HStack>
              <Image
                src={icon}
                alt={name}
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
                  {name}
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
          href={service.provider.install_link || service.provider.website}
          target="_blank"
          as={NextLink}
          variant="outline"
          size="sm"
          colorScheme="blue"
          ml="auto"
          alignSelf="center"
          borderRadius="full"
        >
          Get
        </Button>
      </CardBody>
    </Card>
  )
}
