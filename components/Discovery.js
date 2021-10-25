import { useEffect, useMemo } from "react"
import styled from "styled-components"
import {WalletUtils} from "@onflow/fcl"
import {
  gte as isGreaterThanOrEqualToVersion,
  valid as isValidVersion,
} from "semver"
import { useFetch } from "../hooks/useFetch"
import { useFCL } from "../hooks/useFCL"
import { combineServices, serviceListOfType } from "../helpers/services"
import { SERVICE_TYPES } from "../helpers/constants"
import Header from "./Header"
import Footer from "./Footer"
import ServiceCard from "./ServiceCard"

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
`

const AppProviders = styled.div``

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

export const Discovery = ({ network, handleCancel }) => {
  const requestUrl = `/api/services?=${network}`
  const supportedVersion = "0.0.79" // Version that supports browser extension redirects
  const { appVersion, extensions } = useFCL()
  const { loading, data, error } = useFetch(requestUrl)
  const services = useMemo(() => {
    let defaultServices = serviceListOfType(data, SERVICE_TYPES.AUTHN)

    // Check version of FCL. If their app version is older than the supported version for browser extensions then continue on without adding browser extensions.
    if (
      appVersion &&
      isGreaterThanOrEqualToVersion(appVersion, supportedVersion)
    ) {
      // Add browser extensions
      const combinedServiceList = combineServices(defaultServices, extensions, true)
      defaultServices = serviceListOfType(combinedServiceList, SERVICE_TYPES.AUTHN)
    }

    return defaultServices

  }, [data, extensions, appVersion])

  const showProvider = provider => provider.enabled !== false

  const onSelect = service => {
    if (!service) return

    if (
      appVersion &&
      isGreaterThanOrEqualToVersion(appVersion, supportedVersion)
    ) {
      WalletUtils.redirect(service)
    } else {
      window.location.href = `${service.endpoint}${window.location.search}`
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error Fetching Services</div>

  return (
    <AppContainer>
      <Header />
      <AppProviders>
        {services.length === 0 && <div>No Wallets Found</div>}
        {services.map(service =>
          showProvider(service.provider) ? (
            <ProviderCardEnabled
              key={service.id}
              {...service.provider}
              onClick={() => onSelect(service)}
            >
              <ServiceCard {...service.provider} />
            </ProviderCardEnabled>
          ) : (
            <ProviderCardDisabled key={service.id} {...service.provider}>
              <ServiceCard {...service.provider} />
            </ProviderCardDisabled>
          )
        )}
      </AppProviders>
      <Footer handleCancel={handleCancel} />
    </AppContainer>
  )
}