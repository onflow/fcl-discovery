import { clone } from 'rambda'
import {
  ServiceWithWallet,
  pipeWalletServices,
  walletsForNetwork,
} from '../wallets'
import { getMockWalletsConfig, getMockWalletsMainnet } from './helpers/fixtures'

describe('wallets helpers', () => {
  test('pipeWalletServices: should pipe all wallet services', () => {
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

    const res = pipeWalletServices(makeServicesPipe)(wallets)

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

  it('walletsForNetwork: should convert services to network-specific services, empty', () => {
    const wallets = getMockWalletsConfig()
    const res = walletsForNetwork('previewnet')(wallets)
    expect(res).toEqual([])
  })
})
