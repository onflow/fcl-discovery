import { handleCancel } from '../helpers/window'
import { ChakraProvider } from '@chakra-ui/react'
import {
  extendTheme,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      'body': {
        backgroundColor: 'transparent'
      },
    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Modal isOpen={true} onClose={handleCancel} isCentered>
          <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px)'
          />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody paddingTop={5} paddingBottom={5}>
              <Component {...pageProps} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </>
  )
}

export default MyApp
