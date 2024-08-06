import useSWR from 'swr'
import { useRpc } from '../contexts/FclContext'
import { Service } from '../types'
import { DiscoveryRpcMethod, FclRpcMethod } from '../helpers/constants'

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
    const { uri } = await rpc.request(FclRpcMethod.REQUEST_URI, { service })

    // Subscribe to QR expiry notifications
    const onExpire = ({ uri: _refUri }) => {
      if (_refUri === uri) {
        mutate()
        rpc.unsubscribe(DiscoveryRpcMethod.NOTIFY_QR_EXPIRY, onExpire)
      }
    }
    rpc.subscribe(DiscoveryRpcMethod.NOTIFY_QR_EXPIRY, onExpire)

    return uri
  })
  return { uri, error, isLoading: !uri && !error }
}
