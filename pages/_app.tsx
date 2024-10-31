import { handleCancel } from '../helpers/window'
import { ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react'
import { theme } from '../config/chakra/theme'
import { AdaptiveModal } from '../components/layout/AdaptiveModal'
import { DeviceProvider } from '../contexts/DeviceContext'
import App, { AppContext, AppProps } from 'next/app'
import { ColorModeSync } from '../components/ColorModeSync'
import { SWRConfig } from 'swr'
import * as Sentry from '@sentry/nextjs'

function MyApp({
  Component,
  pageProps,
}: AppProps<{ userAgent: string }>): JSX.Element {
  const [isOpen, setIsOpen] = useState(true)

  const handleOnClose = () => {
    setIsOpen(false)
    handleCancel()
  }

  return (
    <SWRConfig
      value={{
        onError: (err, key) => Sentry.captureException(err, { extra: { key } }),
      }}
    >
      <ChakraProvider theme={theme}>
        <ColorModeSync />
        <DeviceProvider userAgent={pageProps.userAgent}>
          <AdaptiveModal isOpen={isOpen} onClose={handleOnClose}>
            <Component {...pageProps} />
          </AdaptiveModal>
        </DeviceProvider>
      </ChakraProvider>
    </SWRConfig>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const userAgent =
    appContext.ctx.req?.headers?.['user-agent'] || navigator?.userAgent || ''

  return { ...appProps, pageProps: { ...appProps.pageProps, userAgent } }
}

export default MyApp
