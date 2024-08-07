import { RpcClient, RpcRequest } from "@onflow/util-rpc"
import { Service } from "../types"

export enum DiscoveryNotification {
    NOTIFY_QRCODE_EXPIRY = 'notifyQRCodeExpiry',
    NOTIFY_QRCODE_ERROR = 'notifyQRCodeError',
}

export enum FclRequest {
REQUEST_WALLETCONNECT_QRCODE = 'requestWalletConnectQRCode',
EXEC_SERVICE = 'execService',
}

export type FclRequests = {
[FclRequest.REQUEST_WALLETCONNECT_QRCODE]: RpcRequest<{}, { uri: string }>
[FclRequest.EXEC_SERVICE]: RpcRequest<{ service: Service }, {}>
}

export type FclRpcClient = RpcClient<FclRequests, {}>