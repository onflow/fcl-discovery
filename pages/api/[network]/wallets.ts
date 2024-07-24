import { map } from 'rambda'
import Sentry from '../../../config/sentry.server'
import { cors, getWalletsFromRequest, runMiddleware } from './_common'

async function handler(req, res) {
  await runMiddleware(req, res, cors)

  const discoveryWallets = await getWalletsFromRequest(req, {
    additionalServicesPipeFactory: () =>
      map(({ provider: _, ...srv }) => ({
        ...srv,
        provider: undefined as any,
      })),
  })
  return res.status(200).json(discoveryWallets)
}

export default Sentry.wrapApiHandlerWithSentry(handler)
