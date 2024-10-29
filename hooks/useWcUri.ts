import useSWR from 'swr'
import { useRpc } from '../contexts/FclContext'
import { DiscoveryNotification, FclRequest } from '../helpers/rpc'
import { useEffect, useRef, useState } from 'react'

const EXPIRY_TIMESTAMP = 'expiryTimestamp'
const EXPIRY_BUFFER = 60

export function useWcUri(onConnected?: () => void) {
  const { rpc } = useRpc()
  const [connecting, setConnecting] = useState(false)
  const timeout = useRef<NodeJS.Timeout | null>(null)

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

  // Refresh the QR code 1 minute before it expires (if possible)
  useEffect(() => {
    if (!uri) return
    try {
      const expiry = new URL(uri).searchParams.get(EXPIRY_TIMESTAMP)
      if (expiry) {
        const expires = parseInt(expiry, 10)
        const now = Date.now() / 1000
        const refreshSeconds = expires - now - EXPIRY_BUFFER
        timeout.current = setTimeout(mutate, refreshSeconds * 1000)
      }
    } catch (e) {}

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
  }, [uri])

  useEffect(() => {
    if (!rpc || !uri) {
      return
    }

    const connectingHandler = ({ uri: _uri }: { uri: string }) => {
      if (uri === _uri) {
        setConnecting(true)
      }
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
    rpc.subscribe(
      DiscoveryNotification.NOTIFY_QRCODE_CONNECTING,
      connectingHandler,
    )
    rpc.subscribe(DiscoveryNotification.NOTIFY_QRCODE_ERROR, errorHandler)

    return () => {
      rpc.unsubscribe(
        DiscoveryNotification.NOTIFY_QRCODE_CONNECTING,
        connectingHandler,
      )
      rpc.unsubscribe(
        DiscoveryNotification.NOTIFY_QRCODE_CONNECTED,
        connectHandler,
      )
      rpc.unsubscribe(DiscoveryNotification.NOTIFY_QRCODE_ERROR, errorHandler)
    }
  }, [uri, rpc])

  return { uri, connecting, error, isLoading: !uri && !error }
}
