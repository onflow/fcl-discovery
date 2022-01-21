import {useMemo} from "react"
import useSWR from "swr"
import styled from "styled-components"
import {WalletUtils} from "@onflow/fcl"
import {combineServices, serviceListOfType} from "../helpers/services"
import {PATHS, SERVICE_TYPES, SUPPORTED_VERSIONS} from "../helpers/constants"
import Header from "./Header"
import Footer from "./Footer"
import ServiceCard from "./ServiceCard"
import {isGreaterThanOrEqualToVersion} from "../helpers/version"

const ServicesContainer = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
`

const ProvidersList = styled.div``

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

const fetcher = (url, opts) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(opts)
  }).then(d => d.json())
}

export const Discovery = ({network, appVersion, extensions, walletInclude, handleCancel}) => {
  const requestUrl = `/api${PATHS[network]}`
  const {data, error} = useSWR(requestUrl, url => fetcher(url, {
    fclVersion: appVersion,
    include: walletInclude 
  }))
  const services = useMemo(() => {
    let defaultServices = serviceListOfType(data, SERVICE_TYPES.AUTHN)

    // Check version of FCL. If their app version is older than the supported version for browser extensions then continue on without adding browser extensions.
    if (
      appVersion &&
      isGreaterThanOrEqualToVersion(appVersion, SUPPORTED_VERSIONS.EXTENSIONS)
    ) {
      // Add browser extensions
      const combinedServiceList = combineServices(
        defaultServices,
        extensions,
        true
      )
      defaultServices = serviceListOfType(
        combinedServiceList,
        SERVICE_TYPES.AUTHN
      )
    }

    return defaultServices
  }, [data, extensions, appVersion])

  const onSelect = service => {
    if (!service) return

    if (
      appVersion &&
      isGreaterThanOrEqualToVersion(appVersion, SUPPORTED_VERSIONS.EXTENSIONS)
    ) {
      WalletUtils.redirect(service)
    } else {
      window.location.href = `${service.endpoint}${window.location.search}`
    }
  }

  if (!data) return <div />
  if (error) return <div>Error Loading Data</div>

  return (
    <ServicesContainer>
      <Header />
      <ProvidersList>
        {services.length === 0 && <div>No Wallets Found</div>}
        {services.map((service, index) =>
          service.provider ? (
            <ProviderCardEnabled
              key={service?.provider?.address ?? index}
              {...service.provider}
              onClick={() => onSelect(service)}
            >
              <ServiceCard {...service.provider} />
            </ProviderCardEnabled>
          ) : (
            <ProviderCardDisabled key={service?.provider?.address ?? index} {...service.provider}>
              <ServiceCard {...service.provider} />
            </ProviderCardDisabled>
          )
        )}
      </ProvidersList>
      <Footer handleCancel={handleCancel} />
    </ServicesContainer>
  )
}
