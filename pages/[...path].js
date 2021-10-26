import {useRouter} from "next/router"
import {Discovery} from "../components/Discovery"
import {PATHS} from "../helpers/constants"
import {createPathFromArray} from "../helpers/paths"

const Router = ({handleCancel}) => {
  const router = useRouter()
  const {path} = router.query // ['authn'] ['testnet', 'authn'] ['canarynet', 'authn']
  const pathStr = createPathFromArray(path)
  const isValidRoute = Object.values(PATHS).some(p => p === pathStr)
  const network = path && path.length === 2 ? path[0] : "mainnet"

  if (!isValidRoute) return <div>Page Not Found</div>

  return <Discovery network={network} handleCancel={handleCancel} />
}

export default Router
