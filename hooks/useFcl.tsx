import { useEffect, useRef, useState } from 'react'
import { WalletUtils } from '@onflow/fcl'
import { Service, Strategy } from '../types'
import { LocalRpcMethod } from '../helpers/constants'

const CUSTOM_IPC = 'FCL:VIEW:CUSTOM_IPC'

type WalletUtilsProps = {
  fclVersion: string
  body: { [key: string]: any }
  config: { [key: string]: any }
}

export interface FclConfig {
  appConfig: { [key: string]: any }
  clientConfig: { [key: string]: any }
  appVersion: string
  walletInclude: string[]
  clientServices: Service[]
  supportedStrategies: Strategy[]
  walletconnect?: {
    uri?: string
  }
}

export function useFcl() {
  const [config, setConfig] = useState<FclConfig | null>(null)
  const [error, setError] = useState<string | null>(null)
  const timeout = useRef<NodeJS.Timeout | null>(null)

  function handleWcUriUpdate(uri: string) {
    console.log('update')
    setConfig(prevConfig => {
      if (!prevConfig) return null
      return {
        ...prevConfig,
        walletconnect: {
          ...prevConfig.walletconnect,
          uri,
        },
      }
    })
  }

  useEffect(() => {
    try {
      WalletUtils.ready(({ fclVersion, body, config }: WalletUtilsProps) => {
        // config.client.fclVersion is only available starting in version 0.0.79-alpha.4
        // config?.client?.extensions starts in fcl v1
        const state = {
          appConfig: config.app,
          clientConfig: config.client,
          appVersion: config.client?.fclVersion || fclVersion || null,
          walletInclude:
            config.discoveryAuthnInclude ||
            config.client.discoveryAuthnInclude ||
            [],
          clientServices:
            config.client?.clientServices ||
            config.client?.extensions ||
            body.extensions ||
            [],
          supportedStrategies: config.client?.supportedStrategies || [],
          walletconnect: {
            uri: config.client?.walletconnect?.uri,
          },
        } as FclConfig

        setConfig(state)
        clearTimeout(timeout.current)
      })

      timeout.current = setTimeout(() => {
        setError(
          'Error occured, if you are the developer please check the console for more information.'
        )
        console.error(
          'Timeout: No response from FCL received within 5s - please ensure the application you are trying to connect to is running FCL & has the correct configuration and try again.'
        )
      }, 5000)
    } catch (e) {
      clearTimeout(timeout.current)
      setError(
        'Error occured, if you are the developer please check the console for more information.'
      )

      console.error(e)
      console.error(
        "An error has occured connecting to the dApp's FCL instance, please see docs: https://developers.flow.com/tools/fcl-js/reference/discovery"
      )
    }

    const teardownRpcListener = WalletUtils.onMessageFromFCL(
      CUSTOM_IPC,
      ({ payload: msg }: { payload: any }) => {
        if (msg.jsonrpc !== '2.0') return
        if (msg?.method === LocalRpcMethod.NOTIFY_WC_URI_UPDATE) {
          handleWcUriUpdate(msg.params.uri)
        }
      }
    )

    return () => {
      clearTimeout(timeout.current)
      teardownRpcListener()
    }
  }, [])

  return {
    error,
    config,
    isLoading: !config && !error,
  }
}
