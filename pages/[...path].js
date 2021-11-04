import {useRouter} from "next/router"
import styled, {css} from "styled-components"
import {Discovery} from "../components/Discovery"
import {isValidPath, getNetworkFromPath} from "../helpers/paths"

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
  const isValid = isValidPath(path)
  const network = getNetworkFromPath(path)

  return (
    <AppContainer isSet={Boolean(path)}>
      {!path && <div />}
      {path && !isValid && <div>Page Not Found</div>}
      {path && isValid && (
        <Discovery network={network} handleCancel={handleCancel} />
      )}
    </AppContainer>
  )
}

export default Router
