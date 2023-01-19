import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { Message } from '../components/Message'
import { NETWORKS, SUPPORTED_VERSIONS } from '../helpers/constants'
import { getNetworkFromPath } from '../helpers/paths'
import { isGreaterThanOrEqualToVersion } from '../helpers/version'
import { handleCancel } from '../helpers/window'
import { useFCL } from '../hooks/useFCL'
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

const MessageAnchor = styled.div`
  position: absolute;
  bottom: 0;
  right: 20px;
  left: 20px;
`

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { path } = router.query
  const network = getNetworkFromPath(path)
  const isTestnet = network === NETWORKS.TESTNET
  const { appConfig, appVersion } = useFCL()
  const isMissingConfig = !(appConfig?.icon && appConfig?.title)
  const showDeveloperMessage =
    isTestnet &&
    isMissingConfig &&
    isGreaterThanOrEqualToVersion(appVersion, SUPPORTED_VERSIONS.APP_CONFIG)
  const [messageOpen, setMessageOpen] = useState(true)

  const developerMessage =
    "👋 Hey Flow dev (you're only seeing this on Testnet), looks like you're missing some app configuration. You can add an icon and title to brand this for your app by setting it in your FCL config."
  const developerLink =
    'https://github.com/onflow/fcl-discovery/blob/master/README.md#configuration'

  const closeMessage = event => {
    event.stopPropagation()
    setMessageOpen(false)
  }

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
      {showDeveloperMessage && messageOpen && (
        <MessageAnchor>
          <Message
            text={developerMessage}
            link={developerLink}
            onClose={closeMessage}
          />
        </MessageAnchor>
      )}
    </>
  )
}

export default MyApp
