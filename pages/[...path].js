import {useRouter} from "next/router"
import styled, {css} from "styled-components"
import {Discovery} from "../components/Discovery"
import {PATHS} from "../helpers/constants"
import {createPathFromArray} from "../helpers/paths"

const AppContainer = styled.div`
  max-height: 0;
  transition: max-height 100ms ease-in;

  ${props =>
    props.isSet &&
    css`
      max-height: 500px;
    `};
`

const Router = ({handleCancel}) => {
  const router = useRouter()
  const {path} = router.query // ['authn'] ['testnet', 'authn'] ['canarynet', 'authn']
  const pathStr = createPathFromArray(path)
  const isValidRoute = Object.values(PATHS).some(p => p === pathStr)
  const network = path && path.length === 2 ? path[0] : "mainnet"

  return (
    <AppContainer isSet={Boolean(path)}>
      {!path && <div />}
      {path && !isValidRoute && <div>Page Not Found</div>}
      {path && isValidRoute && (
        <Discovery network={network} handleCancel={handleCancel} />
      )}
    </AppContainer>
  )
}

export default Router
