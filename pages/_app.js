import {useRouter} from "next/router"
import styled, {createGlobalStyle} from "styled-components"
import {Message} from "../components/Message"
import {NETWORKS, SUPPORTED_VERSIONS} from "../helpers/constants"
import {getNetworkFromPath} from "../helpers/paths"
import {isGreaterThanOrEqualToVersion} from "../helpers/version"
import {useFCL} from "../hooks/useFCL"

const GlobalStyle = createGlobalStyle`
  * { 
    margin:0;
    padding:0;
    font-variant-ligatures: common-ligatures;
  }
  :root {
    --text-primary: #0F0F0F;
    --text-secondary: #0B0B0B;
    --font-family:"Overpass",sans-serif;
  }
  body {
    background-color: transparent;
    color: var(--text-primary);
    font-family: var(--font-family);
    font-size: 16px;
    line-height: 22px;
  }
`
const Wrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MessageAnchor = styled.div`
  position: absolute;
  bottom: 0;
  right: 20px;
  left: 20px;
`

const Inner = styled.div`
  position: relative;
  max-height: 100vh;
  max-width: 100vw;
  width: 40rem;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  overflow-y: auto;
`

function MyApp({Component, pageProps}) {
  const router = useRouter()
  const {path} = router.query
  const network = getNetworkFromPath(path)
  const isTestnet = network === NETWORKS.TESTNET
  const {appConfig, appVersion} = useFCL()
  const isMissingConfig = !(appConfig?.icon && appConfig?.title)
  const showDeveloperMessage = isTestnet && isMissingConfig && isGreaterThanOrEqualToVersion(appVersion, SUPPORTED_VERSIONS.APP_CONFIG)

  const handleCancel = () => {
    window.parent.postMessage(
      {
        type: "FCL:FRAME:CLOSE",
      },
      "*"
    )
  }

  const developerMessage = "👋 Hey Flow dev (you're only seeing this on Testnet), looks like you're missing some app configuration. You can add an icon and title to brand this for your app by setting it in your FCL config."
  const developerLink = "https://docs.onflow.org/fcl/reference/configure-fcl/"

  return (
    <>
      <GlobalStyle />
      <Wrapper onClick={handleCancel}>
        <Inner onClick={e => e.stopPropagation()}>
          <Component {...pageProps} handleCancel={handleCancel} />
        </Inner>
        {showDeveloperMessage &&  
          <MessageAnchor>
            <Message text={developerMessage} link={developerLink} />
          </MessageAnchor>
        }
      </Wrapper>
    </>
  )
}

export default MyApp
