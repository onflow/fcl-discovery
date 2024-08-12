import { handleCancel } from '../helpers/window'
import { ChakraProvider } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { theme } from '../config/chakra/theme'
import { AdaptiveModal } from '../components/AdaptiveModal'
import { DeviceInfoProvider } from '../contexts/DeviceInfoContext'
import App, { AppContext, AppProps } from 'next/app'

function MyApp({
  Component,
  pageProps,
}: AppProps<{ userAgent: string }>): JSX.Element {
  const [isOpen, setIsOpen] = useState(true)

  const handleOnClose = useCallback(() => {
    setIsOpen(false)
    handleCancel()
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <DeviceInfoProvider userAgent={pageProps.userAgent}>
        <AdaptiveModal isOpen={isOpen} onClose={handleOnClose}>
          <Component {...pageProps} />
        </AdaptiveModal>
      </DeviceInfoProvider>
    </ChakraProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  // Accessing the user agent from the request headers

  const userAgent =
    typeof window === 'undefined'
      ? appContext.ctx.req?.headers['user-agent'] || ''
      : navigator.userAgent

  // Passing userAgent to the pageProps
  return { ...appProps, pageProps: { ...appProps.pageProps, userAgent } }
}

export default MyApp
