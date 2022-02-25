import styled from "styled-components"
import {COLORS} from "../../helpers/constants"
import {useFCL} from "../../hooks/useFCL"

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`

const AppLogo = styled.img`
  height: 5rem;
  border-radius: 50%;
  overflow: hidden;
`

const ClientDomain = styled.div`
  color: ${COLORS.secondary};
`

export default function AppHeader() {
  const {appConfig, clientConfig} = useFCL()

  return (
    <HeaderContainer>
      {appConfig?.icon && <AppLogo src={appConfig.icon} alt="Flow Logo" />}
      <ClientDomain>{clientConfig?.hostname}</ClientDomain>
    </HeaderContainer>
  )
}
