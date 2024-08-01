import { handleCancel } from '../helpers/window'
import { ChakraProvider } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { theme } from '../config/chakra/theme'

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
