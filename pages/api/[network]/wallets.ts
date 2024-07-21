import { cors, discoveryServicesMiddleware, runMiddleware } from './_common'

async function handler(req, res) {
  await runMiddleware(req, res, cors)
  await runMiddleware(req, res, discoveryServicesMiddleware)

  return res.status(200).json(discovery)
}

export default Sentry.wrapApiHandlerWithSentry(handler)
