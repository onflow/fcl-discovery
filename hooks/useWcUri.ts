import useSWR from 'swr'
import { useRpc } from '../contexts/FclContext'
import { DiscoveryNotification, FclRequest } from '../helpers/rpc'

export function useWcUri() {
  const rpc = useRpc()
  const {
    data: uri,
    error,
    mutate,
  } = useSWR(FclRequest.REQUEST_WALLETCONNECT_QRCODE, async () => {
    const { uri } = await rpc.request(
      FclRequest.REQUEST_WALLETCONNECT_QRCODE,
      {},
    )

    // Subscribe to QR error notifications (e.g. user declined, QR expired)
    const onError = ({ error: _error, uri: _uri }) => {
      if (_uri === uri) {
        // QR code is no longer valid, reset the URI and unsubscribe
        mutate()
        rpc.unsubscribe(DiscoveryNotification.NOTIFY_QRCODE_ERROR, onError)
      }
    }
    rpc.subscribe(DiscoveryNotification.NOTIFY_QRCODE_ERROR, onError)

    return uri
  })
  return { uri, error, isLoading: !uri && !error }
}
