import React from 'react';
import styled from "styled-components";
import logo from "../assets/logo.svg";
import providersJson from "../providers.json";

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;

  background-color: #FFFFFF00;

  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  box-sizing: border-box;

  overflow-y: scroll;
`

const AppHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const AppLogoWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const AppLogo = styled.img`
  margin-right: 3rem;
  height: 4rem;
`

const AppTitle = styled.h2`
  margin-bottom: 2rem;
  text-align: left;
  color: #2a2825;
`

const ProviderCard = styled.div`
  margin-bottom: 1rem;
  width: 100%;

  padding: 0.5rem 1rem 0.5rem 1rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  border: 0.1rem solid ${({color}) => color};
  border-radius: 0.5rem;

  box-sizing: border-box;

  opacity: ${({enabled}) => enabled ? "1" : "0.7"};
  cursor: ${({enabled}) => enabled ? "pointer" : "unset"};

  text-decoration: none;
  user-select: none;

  -webkit-appearance: none;
  -moz-appearance: none;
`

const ProviderCardRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const ProviderCardColumn = styled.div`
  margin: 0.5rem 0rem 0.5rem 0rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const ProviderCardIcon = styled.div`
  margin-right: 0.5rem;

  height: 4rem;
  min-width: 4rem;

  border-radius: 0.5rem;

  background-color: ${({color, icon}) => !icon ? color : "unset"};
  background-image: url(${({icon}) => icon});
  background-size: cover;

`

const ProviderCardTitle = styled.div`
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 2rem;
  color: #231f20;
  font-weight: bold;
`

const ProviderCardDescription = styled.div`
  color: #a8a8a8; 
  text-align: left;
`

const ProviderCardContact = styled.div`
  margin-bottom: 1rem;

  color: #a8a8a8;
`

const ProviderCardButton = styled.button`
  padding: 1rem 2rem 1rem 2rem;
  font-size: 1rem;
  line-height: 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: "#26ff76";
  color: "#2a2825";
  cursor: pointer;
  font-weight: bold;

  transition: background-color 0.2s, color 0.2s;

  -webkit-appearance: none;
  -moz-appearance: none;
`

export const App = ({ network, location }) => {
  const providers = providersJson[network];
  if (!providers) return null;
  
  return (
    <AppContainer>
      <AppHeader>
        <AppLogoWrapper><AppLogo src={logo} alt="Flow Logo"/></AppLogoWrapper>
        <AppTitle>Choose a Provider</AppTitle>
      </AppHeader>
      {
        providers.map(p => 
          <ProviderCard {...p} onClick={() => p.enabled ? window.location.href = `${p.authn_endpoint}${location.search}` : null}>

            <ProviderCardColumn style={{marginRight: "2rem"}}>
              <ProviderCardRow>
                <ProviderCardIcon {...p}/>
                <ProviderCardColumn>
                  <ProviderCardTitle {...p}>{p.title}</ProviderCardTitle>
                  <ProviderCardDescription>{p.description}</ProviderCardDescription>
                </ProviderCardColumn>
              </ProviderCardRow>
            </ProviderCardColumn>
          </ProviderCard>
        )
      }
    </AppContainer>
  );
}
