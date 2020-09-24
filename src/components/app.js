import React from 'react';
import styled from "styled-components";
import providersJson from "../providers.json";

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;

  padding: 2rem;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
`

const ProviderCard = styled.div`
  margin: 2rem;

  padding: 0.5rem 1rem 0.5rem 1rem;

  box-shadow: 0 6px 14px ${({color}) => color}, 0 4px 4px ${({color}) => color};
  border: 0.1rem solid ${({color}) => color};
  border-radius: 0.5rem;

  box-sizing: border-box;
`

const ProviderCardRow = styled.div`
  margin: 1rem 0 1rem 0rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const ProviderCardColumn = styled.div`
  margin: 1rem 0 1rem 0rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const ProviderCardIcon = styled.div`
  margin-right: 0.5rem;

  height: 6rem;
  width: 6rem;

  border-radius: 0.5rem;

  background-color: ${({color, icon}) => !icon ? color : "unset"};
  background-image: url(${({icon}) => icon});
  background-size: cover;

`

const ProviderCardTitle = styled.div`
  margin-left: 0.5rem;
  font-weight: bold;
  font-size: 2rem;
`

const ProviderCardDescription = styled.div`
  color: #a8a8a8; 
`

const ProviderCardContact = styled.div`
  margin-bottom: 1rem;

  color: #a8a8a8;
`

const ProviderCardButton = styled.button`
    width: 100%;
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
      {
        providers.map(p => 
          <ProviderCard {...p}>
            <ProviderCardRow>
              <ProviderCardIcon {...p}/>
              <ProviderCardTitle {...p}>{p.title}</ProviderCardTitle>
            </ProviderCardRow>
            <ProviderCardRow>
              <ProviderCardDescription>{p.description}</ProviderCardDescription>
            </ProviderCardRow>
            <a href={`${p.authn_endpoint}${location.search}`}><ProviderCardButton>Select</ProviderCardButton></a>
            <ProviderCardColumn>
              <ProviderCardContact>{p.contact_email}</ProviderCardContact>
              <ProviderCardContact>{p.origin}</ProviderCardContact>
            </ProviderCardColumn>
          </ProviderCard>
        )
      }
    </AppContainer>
  );
}
