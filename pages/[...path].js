import {useRouter} from "next/router"
import styled, {css} from "styled-components"
import {Discovery} from "../components/Discovery"
import {isValidPath, getNetworkFromPath} from "../helpers/paths"
import {constructApiQueryParams} from "../helpers/services"

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
  const {path, include} = router.query // path: ['authn'] ['testnet', 'authn'] ['canarynet', 'authn'] include: ['0x123']
  const isValid = isValidPath(path)
  const network = getNetworkFromPath(path)
  const queryStr = constructApiQueryParams({ include })

  return (
    <AppContainer isSet={Boolean(path)}>
      {!path && <div />}
      {path && !isValid && <div>Page Not Found</div>}
      {path && isValid && (
        <Discovery network={network} queryStr={queryStr} handleCancel={handleCancel} />
      )}
    </AppContainer>
  )
}

export default Router
