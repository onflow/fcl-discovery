import { useEffect, useRef, useState } from 'react'
import { WalletUtils } from '@onflow/fcl'
import { Service, Strategy } from '../types'
import {
  CUSTOM_IPC,
  FclRpcMethods,
  DiscoveryRpcMethods,
  DiscoveryRpcMethod,
  FclRpcMethod,
} from '../helpers/constants'
import { RpcClient } from '../contexts/rpc/rpc-client'
import { mutate } from 'swr'
import { genGetUriKey } from './useUri'

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
  rpcEnabled?: boolean
}

export function useFcl() {
  const [config, setConfig] = useState<FclConfig | null>(null)
  const [error, setError] = useState<string | null>(null)
  const timeout = useRef<NodeJS.Timeout | null>(null)
  const rpcRef = useRef<RpcClient<FclRpcMethods, DiscoveryRpcMethods> | null>(
    null
  )
  const rpc = rpcRef.current

  function initFclRpc() {
    const { rpc: rpcClient, receive: receiveRpc } = RpcClient.create<
      FclRpcMethods,
      DiscoveryRpcMethods
    >((msg: any) => {
      WalletUtils.sendMsgToFCL(CUSTOM_IPC, { payload: msg })
    })

    const unsubFcl = WalletUtils.onMessageFromFCL(
      CUSTOM_IPC,
      ({ payload: msg }: { payload: any }) => {
        receiveRpc(msg)
      }
    )

    return {
      rpc: rpcClient,
      teardown: unsubFcl,
    }
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
          rpcEnabled: config.client?.discoveryRpcEnabled || false,
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

    // Initialize RPC
    const { teardown: teardownRpcListener, rpc: rpcClient } = initFclRpc()
    rpcRef.current = rpcClient

    return () => {
      clearTimeout(timeout.current)
      teardownRpcListener()
    }
  }, [])

  return {
    error,
    config,
    rpc,
    isLoading: !config && !error,
  }
}
