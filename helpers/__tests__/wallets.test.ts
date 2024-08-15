import { clone } from 'rambda'
import {
  ServiceWithWallet,
  pipeWalletServices,
  walletsForNetwork,
} from '../wallets'
import { getMockWalletsConfig, getMockWalletsMainnet } from './_utils/fixtures'

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
      },
    ] as ServiceWithWallet[]

    const servicesPipe = jest.fn(() => [
      { ...mockResult[0], walletUid: walletId },
    ])
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
          [] as ServiceWithWallet[],
        ),
      ],
    ])

    expect(res).toEqual([
      {
        ...wallets[0],
        services: mockResult,
      },
      {
        ...wallets[1],
        services: [],
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
