import React, {useEffect, useState} from "react"
import styled from "styled-components"
import logo from "../assets/logo.svg"
import servicesJson from "../providers.json"
import {WalletUtils} from "@onflow/fcl"
import {combineServices, serviceListOfType} from "../helpers/services"
import {
  gte as isGreaterThanOrEqualToVersion,
  valid as isValidVersion,
} from "semver"

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
`

const AppProviders = styled.div``

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

const ProviderCardEnabled = styled.a`
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

  opacity: 1;
  cursor: pointer;

  text-decoration: none;
  user-select: none;

  -webkit-appearance: none;
  -moz-appearance: none;
`

const ProviderCardDisabled = styled.div`
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

  opacity: 0.7;
  cursor: unset;

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

  background-color: ${({color, icon}) => (!icon ? color : "unset")};
  background-image: url(${({icon}) => icon});
  background-size: cover;
`

const ProviderCardName = styled.div`
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

const AppFooter = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
`

const AppCancel = styled.button`
  text-align: center;
  font-size: 1rem;
  border: none;
  background-color: white;
  cursor: pointer;

  -webkit-appearance: none;
  -moz-appearance: none;
`

const SERVICE_TYPES = {
  AUTHN: "authn"
}

export const App = ({network, location, handleCancel}) => {
  const defaultServices = servicesJson[network]
  const supportedVersion = "0.0.79" // Version that supports browser extension redirects
  const [appVersion, setAppVersion] = useState(null)
  const [services, setServices] = useState(serviceListOfType(defaultServices, SERVICE_TYPES.AUTHN))
  const [extensions, setExtensions] = useState([])

  useEffect(() => {
    const unmount = WalletUtils.onMessageFromFCL(
      "FCL:VIEW:READY:RESPONSE",
      ({fclVersion, body}) => {
        if (isValidVersion(fclVersion)) {
          setExtensions(body.extensions)
          setAppVersion(fclVersion)
        }
      }
    )

    WalletUtils.sendMsgToFCL("FCL:VIEW:READY")

    return unmount
  }, [])

  useEffect(() => {
    // Check version of FCL. If their app version is older than the supported version for browser extensions then continue on without adding browser extensions.
    if (
      appVersion &&
      isGreaterThanOrEqualToVersion(appVersion, supportedVersion)
    ) {
      // Add browser extensions
      const combinedServiceList = combineServices(services, extensions, true)
      const serviceList = serviceListOfType(combinedServiceList, SERVICE_TYPES.AUTHN)
      setServices(serviceList)
    }
  }, [appVersion])

  const onSelect = service => {
    if (service.type === "default") {
      window.location.href = `${service.provider.authn_endpoint}${location.search}`
    } else {
      WalletUtils.redirect(service)
    }
  }

  const showProvider = provider => {
    // Only hide if specifically set to false
    if (provider.hasOwnProperty("enabled") && provider.enabled === false) {
      return false
    }

    return true
  }

  return (
    <AppContainer>
      <AppHeader>
        <AppLogoWrapper>
          <AppLogo src={logo} alt='Flow Logo' />
        </AppLogoWrapper>
        <AppTitle>Choose a Provider</AppTitle>
      </AppHeader>
      <AppProviders>
        {services.map(service =>
          showProvider(service.provider) ? (
            <ProviderCardEnabled
              key={service.id}
              {...service.provider}
              onClick={() => onSelect(service)}
            >
              <ProviderCardColumn>
                <ProviderCardRow>
                  <ProviderCardIcon {...service.provider} />
                  <ProviderCardColumn>
                    <ProviderCardName {...service.provider}>
                      {service.provider.name}
                    </ProviderCardName>
                    <ProviderCardDescription>
                      {service.provider.description}
                    </ProviderCardDescription>
                  </ProviderCardColumn>
                </ProviderCardRow>
              </ProviderCardColumn>
            </ProviderCardEnabled>
          ) : (
            <ProviderCardDisabled key={service.id} {...service.provider}>
              <ProviderCardColumn>
                <ProviderCardRow>
                  <ProviderCardIcon {...service.provider} />
                  <ProviderCardColumn>
                    <ProviderCardName {...service.provider}>
                      {service.provider.name}
                    </ProviderCardName>
                    <ProviderCardDescription>
                      {service.provider.description}
                    </ProviderCardDescription>
                  </ProviderCardColumn>
                </ProviderCardRow>
              </ProviderCardColumn>
            </ProviderCardDisabled>
          )
        )}
      </AppProviders>
      <AppFooter>
        <AppCancel onClick={handleCancel}>Cancel</AppCancel>
      </AppFooter>
    </AppContainer>
  )
}
