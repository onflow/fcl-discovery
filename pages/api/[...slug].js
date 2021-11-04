// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from "cors"
import servicesJson from "../../data/services.json"
import {isValidPath, getNetworkFromPath} from "../../helpers/paths"

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET"]
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)

  const slug = req.query.slug
  const isValid = isValidPath(slug)
  const network = getNetworkFromPath(slug)
  const services = servicesJson[network]

  if (!isValid) {
    return res.status(400).json({message: "Invalid Network"})
  }

  return res.status(200).json(services)
}
