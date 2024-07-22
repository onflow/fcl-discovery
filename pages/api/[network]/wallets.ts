import { collectWalletsFromServices } from '../../../helpers/servicePipes'
import { cors, discoveryServicesMiddleware, runMiddleware } from './_common'

async function handler(req, res) {
  await runMiddleware(req, res, cors)
  await runMiddleware(req, res, discoveryServicesMiddleware)

  const discoveryServices = req.discoveryServices
  const discoveryWallets = collectWalletsFromServices(discoveryServices)

  return res.status(200).json(discoveryWallets)
}

export default Sentry.wrapApiHandlerWithSentry(handler)
