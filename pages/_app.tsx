import { CloseIcon } from '@chakra-ui/icons'
import { handleCancel } from '../helpers/window'
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  IconButton,
  ModalHeader,
  Text,
} from '@chakra-ui/react'
import {
  extendTheme,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'transparent',
      },
      font: {
        heading:
          '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu;',
        body: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu;',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: 'none',
        },
      },
    },
    IconButton: {
      baseStyle: {
        _focus: {
          boxShadow: 'none',
        },
      },
    },
  },
})

function MyApp({ Component, pageProps }) {
  const [isOpen, setIsOpen] = useState(true)

  const handleOnClose = useCallback(() => {
    setIsOpen(false)
    handleCancel()
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Modal isOpen={isOpen} onClose={handleOnClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          maxH="700px"
          borderRadius="2xl"
          display="flex"
          flexDirection="column"
          padding={0}
        >
          <ModalHeader>
            <Flex alignItems="center" position="relative">
              <Text position="absolute" left="50%" transform="translateX(-50%)">
                Connect Wallet
              </Text>

              <IconButton
                onClick={handleOnClose}
                icon={<CloseIcon fontSize="1em" />}
                aria-label="Close Modal"
                borderRadius="full"
                bg="gray.100"
                color="black"
                ml="auto"
                size="sm"
              ></IconButton>
            </Flex>
          </ModalHeader>
          <ModalBody
            flex="1"
            h="0"
            display="flex"
            flexDirection="column"
            padding={0}
          >
            <Component {...pageProps} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  )
}

export default MyApp
