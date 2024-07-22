// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Sentry from '../../../config/sentry.server'
import { removeWalletFromServices } from '../../../helpers/servicePipes'
import { cors, discoveryServicesMiddleware, runMiddleware } from './_common'

async function handler(req, res) {
  await runMiddleware(req, res, cors)
  await runMiddleware(req, res, discoveryServicesMiddleware)

  const { discoveryServices } = req
  return res.status(200).json(removeWalletFromServices(discoveryServices))
}

export default Sentry.wrapApiHandlerWithSentry(handler)
