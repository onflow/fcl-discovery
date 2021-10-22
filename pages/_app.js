import styled, {createGlobalStyle} from 'styled-components';

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

const Inner = styled.div`
  max-height: 100vh;
  max-width: 100vw;
  width: 40rem;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  overflow-y: auto;
`

function MyApp({ Component, pageProps }) {
  const handleCancel = () => {
    window.parent.postMessage({
      type: "FCL:FRAME:CLOSE"
    }, "*")
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper onClick={handleCancel}>
        <Inner onClick={e => e.stopPropagation()}>
          <Component {...pageProps} />
        </Inner>
      </Wrapper>
    </>
  )
}

export default MyApp
