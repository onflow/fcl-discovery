import {
  Box,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import NextImage from 'next/image'
import { isDataURL } from '../helpers/urls'
import HybridButton from './HybridButton'

type WalletTypeCardProps = {
  icon: string
  title: string
  description: string
  unstyled?: boolean
  button: {
    text: string
  } & (
    | {
        href: string
      }
    | {
        onClick: () => void
      }
  )
}

export default function WalletTypeCard({
  icon,
  title,
  description,
  unstyled,
  button: { text: buttonText, ...buttonProps },
}: WalletTypeCardProps) {
  return (
    <Flex
      borderRadius="2xl"
      flex={1}
      width="100%"
      justifyContent="center"
      alignItems="center"
      p={6}
      {...(!unstyled
        ? {
            borderWidth: '1px',
            backgroundColor: 'gray.100',
          }
        : {})}
    >
      <SimpleGrid
        columns={2}
        w="sm"
        gap={4}
        templateColumns={'auto 1fr'}
        templateRows={'auto 1fr'}
        alignItems="center"
      >
        <Image
          as={isDataURL(icon) ? 'img' : NextImage}
          src={icon}
          alt={title}
          boxSize="5rem"
          borderRadius="xl"
          my="auto"
        />
        <Stack pt={1}>
          <Heading size="sm">{title}</Heading>
          <Text color="gray.500">{description}</Text>
        </Stack>

        <Box></Box>

        <HybridButton
          size="sm"
          colorScheme="blue"
          borderRadius="full"
          fontWeight="bold"
          fontSize="sm"
          mr="auto"
          {...buttonProps}
        >
          {buttonText}
        </HybridButton>
      </SimpleGrid>
    </Flex>
  )
}
