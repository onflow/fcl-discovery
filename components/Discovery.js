import {useMemo} from "react"
import useSWR from "swr"
import styled from "styled-components"
import {combineServices, serviceListOfType, sortByAddress} from "../helpers/services"
import {LOCAL_STORAGE_KEYS, PATHS, SERVICE_TYPES, SUPPORTED_VERSIONS} from "../helpers/constants"
import Footer from "./Footer"
import ServiceCard from "./ServiceCard"
import {isGreaterThanOrEqualToVersion} from "../helpers/version"
import Header from "./Headers/Header"
import {useLocalStorage} from "../hooks/useLocalStorage"
import { pipe } from "@onflow/fcl"

const ServicesContainer = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
`

const ProvidersList = styled.div``

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
  const [lastInstalled, _] = useLocalStorage(LOCAL_STORAGE_KEYS.LAST_INSTALLED, null)

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

    return sortByAddress(defaultServices, lastInstalled)
  }, [data, extensions, appVersion])

  if (!data) return <div />
  if (error) return <div>Error Loading Data</div>

  return (
    <ServicesContainer>
      <Header />
      <ProvidersList>
        {services.length === 0 && <div>No Wallets Found</div>}
        {services.map((service, index) => {
          return <ServiceCard
            key={service?.provider?.address ?? index}
            isEnabled={Boolean(service.provider)}
            {...service.provider}
            service={service}
          />
        })}
      </ProvidersList>
      <Footer handleCancel={handleCancel} />
    </ServicesContainer>
  )
}
