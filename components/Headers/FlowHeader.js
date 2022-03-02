import styled from "styled-components"

const AppHeader = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const AppLogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 8px;
`

const AppLogo = styled.img`
  height: 4rem;
`

const AppTitle = styled.h2`
  text-align: left;
  color: #2a2825;
  font-size: 1.3rem;
`

export default function FlowHeader() {
  return (
    <AppHeader>
      <AppLogoWrapper>
        <AppLogo src="/logo.svg" alt="Flow Logo" />
      </AppLogoWrapper>
      <AppTitle>Choose a Provider</AppTitle>
    </AppHeader>
  )
}
