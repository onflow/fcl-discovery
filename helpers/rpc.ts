import { RpcClient, RpcRequest } from '@onflow/util-rpc'
import { Service } from '../types'

export enum DiscoveryNotification {
  NOTIFY_QRCODE_ERROR = 'notifyQrCodeError',
  NOTIFY_QRCODE_CONNECTING = 'notifyQrCodeConnecting',
  NOTIFY_QRCODE_CONNECTED = 'notifyQrCodeConnected',
}

export enum FclRequest {
  REQUEST_WALLETCONNECT_QRCODE = 'requestWalletConnectQrCode',
  EXEC_SERVICE = 'execService',
}

export type FclRequests = {
  [FclRequest.REQUEST_WALLETCONNECT_QRCODE]: RpcRequest<{}, { uri: string }>
  [FclRequest.EXEC_SERVICE]: RpcRequest<{ service: Service }, {}>
}

export type FclRpcClient = RpcClient<FclRequests, {}>
