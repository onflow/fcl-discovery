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
        w="xs"
        gap={4}
        templateColumns={'auto 1fr'}
        templateRows={'auto 1fr'}
        alignItems="center"
      >
        <Image
          as={isDataURL(icon) ? 'img' : NextImage}
          src={icon}
          alt={title}
          boxSize="4.5rem"
          borderRadius="xl"
          my="auto"
        />
        <Stack pt={1}>
          <Text textStyle="body1Bold">{title}</Text>
          <Text textStyle="body2">{description}</Text>
        </Stack>

        {/* Placeholder for grid */}
        <Box></Box>

        <HybridButton
          variant="primary"
          size="sm"
          borderRadius="full"
          mr="auto"
          {...buttonProps}
        >
          {buttonText}
        </HybridButton>
      </SimpleGrid>
    </Flex>
  )
}
