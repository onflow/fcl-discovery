import useSWR from 'swr'
import { useRpc } from '../contexts/FclContext'
import { DiscoveryNotification, FclRequest } from '../helpers/rpc'
import { useEffect } from 'react'

export function useWcUri(onConnected?: () => void) {
  const rpc = useRpc()
  const {
    data: uri,
    error,
    mutate,
  } = useSWR(rpc ? FclRequest.REQUEST_WALLETCONNECT_QRCODE : null, async () => {
    const { uri } = await rpc.request(
      FclRequest.REQUEST_WALLETCONNECT_QRCODE,
      {},
    )

    return uri
  })

  useEffect(() => {
    if (!rpc || !uri) {
      return
    }

    const connectHandler = ({ uri: _uri }: { uri: string }) => {
      if (uri === _uri) {
        onConnected?.()
      }
    }

    const errorHandler = ({
      uri: errorUri,
      error,
    }: {
      uri: string
      error: string
    }) => {
      if (uri === errorUri) {
        console.error('URI connection error:', error)
        mutate()
      }
    }

    rpc.subscribe(DiscoveryNotification.NOTIFY_QRCODE_CONNECTED, connectHandler)
    rpc.subscribe(DiscoveryNotification.NOTIFY_QRCODE_ERROR, errorHandler)

    return () => {
      rpc.unsubscribe(
        DiscoveryNotification.NOTIFY_QRCODE_CONNECTED,
        connectHandler,
      )
      rpc.unsubscribe(DiscoveryNotification.NOTIFY_QRCODE_ERROR, errorHandler)
    }
  }, [uri, rpc])

  return { uri, error, isLoading: !uri && !error }
}