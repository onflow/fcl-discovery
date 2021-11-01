// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from "cors"
import servicesJson from "../../data/services.json"

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

  const {network} = req.query
  const validNetworks = ["mainnet", "testnet", "canarynet"]
  const networkStr = (network || "mainnet").toLowerCase()
  const services = servicesJson[networkStr]

  if (!validNetworks.includes(networkStr)) {
    return res.status(400).json({message: "Invalid Network"})
  }

  return res.status(200).json(services)
}
