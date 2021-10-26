import styled from "styled-components"

const AppHeader = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: row;
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
`

const AppLogo = styled.img`
  height: 4rem;
`

const AppTitle = styled.h2`
  text-align: left;
  color: #2a2825;
`

export default function Header() {
  return (
    <AppHeader>
      <AppLogoWrapper>
        <AppLogo src="/logo.svg" alt="Flow Logo" />
      </AppLogoWrapper>
      <AppTitle>Choose a Provider</AppTitle>
    </AppHeader>
  )
}
