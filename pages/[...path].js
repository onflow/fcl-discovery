import {useRouter} from "next/router"
import styled, {css} from "styled-components"
import {Discovery} from "../components/Discovery"
import {isValidPath, getNetworkFromPath} from "../helpers/paths"
import {useFCL} from "../hooks/useFCL"

const AppContainer = styled.div`
  max-height: 0;
  transition: max-height 100ms ease-in;

  ${props =>
    props.isSet &&
    css`
      max-height: 500px;
    `};
`

const Router = () => {
  const router = useRouter()
  const {path} = router.query // path: ['authn'] ['testnet', 'authn'] ['canarynet', 'authn']
  const {hasInitialized, loading, appVersion, extensions, walletInclude} = useFCL()
  const isValid = isValidPath(path)
  const network = getNetworkFromPath(path)

  return (
    <AppContainer isSet={Boolean(path)}>
      {!path && <div />}
      {path && !isValid && <div>Page Not Found</div>}
      {path && isValid && hasInitialized && !loading && (
        <Discovery 
          network={network}
          appVersion={appVersion}
          extensions={extensions}
          walletInclude={walletInclude}
        />
      )}
    </AppContainer>
  )
}

export default Router
