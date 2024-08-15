import {
  Box,
  ButtonProps,
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

type ActionCardProps = {
  icon: string
  title: string
  description: string
  button: {
    text: string
  } & (
    | {
        href: string
      }
    | {
        onClick: () => void
      }
  ) &
    ButtonProps
}

export default function ActionCard({
  icon,
  title,
  description,
  button: { text: buttonText, ...buttonProps },
}: ActionCardProps) {
  return (
    <Flex
      borderRadius="2xl"
      flex={1}
      width="100%"
      justifyContent="center"
      alignItems="center"
      p={6}
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
