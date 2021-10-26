// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import servicesJson from "../../data/services.json"

export default function handler(req, res) {
  const {network} = req.query
  const validNetworks = ["mainnet", "testnet", "canarynet"]
  const networkStr = (network || "mainnet").toLowerCase()
  const services = servicesJson[networkStr]

  if (!validNetworks.includes(networkStr)) {
    return res.status(400).json({message: "Invalid Network"})
  }

  return res.status(200).json(services)
}
