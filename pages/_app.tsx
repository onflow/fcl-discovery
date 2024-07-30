import { handleCancel } from '../helpers/window'
import { ChakraProvider } from '@chakra-ui/react'
import {
  extendTheme,
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { SWRConfig } from 'swr'

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
          borderRadius="3xl"
          flexDirection="column"
          w="auto"
          h="auto"
          maxW="none"
          maxH="none"
          display="flex"
        >
          <Component {...pageProps} />
        </ModalContent>
      </Modal>
    </ChakraProvider>
  )
}

export default MyApp
