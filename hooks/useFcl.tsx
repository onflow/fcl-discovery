import { useEffect, useRef, useState } from 'react'
import { WalletUtils } from '@onflow/fcl'
import { RpcClient } from '@onflow/util-rpc'
import { Service, Strategy } from '../types'
import { CUSTOM_RPC } from '../helpers/constants'
import {
  DiscoveryNotification,
  FclRequests,
  FclRpcClient,
} from '../helpers/rpc'

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

  const [rpc, setRpc] = useState<FclRpcClient | null>(null)
  const rpcEnabled = config?.rpcEnabled

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
          'Error occured, if you are the developer please check the console for more information.',
        )
        console.error(
          'Timeout: No response from FCL received within 5s - please ensure the application you are trying to connect to is running FCL & has the correct configuration and try again.',
        )
      }, 5000)
    } catch (e) {
      clearTimeout(timeout.current)
      setError(
        'Error occured, if you are the developer please check the console for more information.',
      )

      console.error(e)
      console.error(
        "An error has occured connecting to the dApp's FCL instance, please see docs: https://developers.flow.com/tools/fcl-js/reference/discovery",
      )
    }

    return () => {
      clearTimeout(timeout.current)
    }
  }, [])

  useEffect(() => {
    if (!rpcEnabled || rpc) return

    const _rpc = new RpcClient<FclRequests, {}>({
      notifications: Object.values(DiscoveryNotification),
    })

    // Bind receiver for messages from FCL
    WalletUtils.onMessageFromFCL(
      CUSTOM_RPC,
      ({ payload: msg }: { payload: any }) => {
        _rpc.receive(msg)
      },
    )

    // Bind sender for messages to FCL
    _rpc.connect({
      send: msg => {
        WalletUtils.sendMsgToFCL(CUSTOM_RPC, { payload: msg })
      },
    })

    setRpc(_rpc)
  }, [rpcEnabled, rpc])

  return {
    error,
    config,
    rpc,
    isLoading: !config && !error,
  }
}
