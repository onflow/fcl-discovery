import { clone, equals, ifElse, prop } from 'rambda'
import {
  ServiceWithWallet,
  transformWalletServices,
  walletsForNetwork,
} from '../wallets'
import {
  getMockWalletsConfig,
  getMockWalletsMainnet,
  walletFixtures,
} from './fixtures'
import { injectClientServices } from '../inject-wallets'
import { Service } from '../../types'

describe('wallets helpers', () => {
  test('transformWalletServices: should pipe all wallet services', () => {
    const wallets = getMockWalletsMainnet()
    const walletId = wallets[0].uid
    const mockResult = [
      {
        f_type: 'Service',
        f_vsn: '1.0.0',
        type: 'authn',
        method: 'HTTP/POST',
        uid: `${walletId}#authnpost`,
        endpoint: `http://localhost:8701/api/authn`,
        provider: {},
        walletUid: walletId,
      },
    ] as ServiceWithWallet[]

    const servicesPipe = jest.fn(() => clone(mockResult))
    const makeServicesPipe = jest.fn(() => servicesPipe)

    const res = transformWalletServices(makeServicesPipe)(wallets)

    // Expect wallets to be correct
    expect(makeServicesPipe).toHaveBeenCalledTimes(1)
    expect(makeServicesPipe.mock.calls).toEqual([
      [
        {
          wallets,
        },
      ],
    ])

    // Expect all services to be piped with walletUid
    expect(servicesPipe.mock.calls).toEqual([
      [
        wallets.flatMap(
          x =>
            x.services.map(y => ({
              ...y,
              walletUid: x.uid,
            })),
          [] as ServiceWithWallet[]
        ),
      ],
    ])

    expect(res).toEqual([
      {
        ...wallets[0],
        services: mockResult,
      },
    ])
  })

  it('walletsForNetwork: should convert services to network-specific services', () => {
    const wallets = getMockWalletsConfig()
    const res = walletsForNetwork('mainnet')(wallets)
    expect(res).toEqual(getMockWalletsMainnet())
  })

  it('injectClientServices: should inject replacement service', () => {
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
