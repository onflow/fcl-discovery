import useSWR from 'swr'
import { useRpc } from '../contexts/FclContext'
import { Service } from '../types'
import { DiscoveryNotification, FclRequest } from '../helpers/rpc'
import { useEffect } from 'react'

export const genGetUriKey = (service: Service) => [
  'get-uri',
  JSON.stringify(service),
]

export function useUri(service: Service) {
  const rpc = useRpc()
  const {
    data: uri,
    error,
    mutate,
  } = useSWR(genGetUriKey(service), async () => {
    if (!rpc) {
      return
    }

    const { uri } = await rpc.request(FclRequest.REQUEST_WALLETCONNECT_QRCODE, {
      service,
    })

    // Subscribe to QR expiry notifications
    const onExpire = ({ uri: _refUri }) => {
      if (_refUri === uri) {
        mutate()
        rpc.unsubscribe(DiscoveryNotification.NOTIFY_QRCODE_EXPIRY, onExpire)
      }
    }
    rpc.subscribe(DiscoveryNotification.NOTIFY_QRCODE_EXPIRY, onExpire)

    // Subscribe to QR error notifications
    const onError = ({ error: _error }) => {
      if (_error === uri) {
        mutate()
        rpc.unsubscribe(DiscoveryNotification.NOTIFY_QRCODE_ERROR, onError)
      }
    }
    rpc.subscribe(DiscoveryNotification.NOTIFY_QRCODE_ERROR, onError)

    return uri
  })

  useEffect(() => {
    mutate()
  }, [rpc])

  return { uri, error, isLoading: !uri && !error }
}
