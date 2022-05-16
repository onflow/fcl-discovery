import styled from 'styled-components'
import { COLORS } from '../../helpers/constants'
import useFCL from '../../hooks/useFCL'

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`

const AppLogo = styled.img`
  height: 5rem;
  width: 5rem;
  border-radius: 10%;
  overflow: hidden;
`

const DefaultImgWrapper = styled.div`
  height: 5rem;
  width: 5rem;
  background: ${COLORS.GREY_LIGHTER_TWO};
  border-radius: 10%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DefaultImg = styled.img`
  height: 4rem;
  width: 4rem;
`

const ClientDomain = styled.div`
  color: ${COLORS.SECONDARY};
  margin-top: 5px;
`

export default function AppHeader() {
  const { appConfig, clientConfig } = useFCL()

  return (
    <HeaderContainer>
      {appConfig?.icon ? (
        <AppLogo src={appConfig.icon} alt="Logo" />
      ) : (
        <DefaultImgWrapper>
          <DefaultImg src="/images/default-img.svg" />
        </DefaultImgWrapper>
      )}
      <ClientDomain>{clientConfig?.hostname}</ClientDomain>
    </HeaderContainer>
  )
}
