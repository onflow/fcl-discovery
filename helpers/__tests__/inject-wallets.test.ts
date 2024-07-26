import { Service } from '../../types'
import { injectClientServices } from '../inject-wallets'
import { getMockWalletsMainnet, walletFixtures } from './_utils/fixtures'

describe('wallet injection tests', () => {
  test('injectClientServices: should inject replacement service', () => {
    const wallets = getMockWalletsMainnet()
    const clientServices = [
      {
        ...walletFixtures.flowWallet
          .mainnet()
          .services.find(x => x.method === 'EXT/RPC'),
        provider: {
          name: 'Some New Name',
          icon: 'NewIcon.png',
        },
      } as Service,
    ]

    const { services: _, ...originalFlowWalletNoSrv } =
      walletFixtures.flowWallet.mainnet()

    const res = injectClientServices(clientServices)(wallets)
    const flowWalletRes = res.find(x => x.uid === 'flow-wallet')
    const { services: servicesRes, ...flowWalletResNoSrv } = flowWalletRes

    // Same number of wallets
    expect(res).toHaveLength(2)

    // Rest of wallet shouldnt change, just services
    expect(flowWalletResNoSrv).toEqual(originalFlowWalletNoSrv)

    // Same number of services, but new one should be injected as replacement
    expect(servicesRes).toHaveLength(2)
    expect(servicesRes.find(x => x.method === 'EXT/RPC')).toEqual(
      clientServices[0]
    )
  })
})
