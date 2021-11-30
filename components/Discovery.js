import {useMemo} from "react"
import useSWR from "swr"
import styled from "styled-components"
import {WalletUtils} from "@onflow/fcl"
import {gte as isGreaterThanOrEqualToVersion} from "semver"
import {useFCL} from "../hooks/useFCL"
import {combineServices, serviceListOfProp, filterListedExtensions} from "../helpers/services"
import {PATHS, SERVICES_PLATFORMS, SERVICE_TYPES} from "../helpers/constants"
import Header from "./Header"
import Footer from "./Footer"
import ServiceCard from "./ServiceCard"

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

const fetcher = url => fetch(url).then(res => res.json())

export const Discovery = ({network, handleCancel}) => {
  const requestUrl = `/api${PATHS[network]}`
  const supportedVersion = "0.0.79" // Version that supports browser extension redirects
  const {appVersion, extensions} = useFCL()
  const {data, error} = useSWR(requestUrl, fetcher)
  const services = useMemo(() => {
    const authnServices = serviceListOfProp(data, "type", SERVICE_TYPES.AUTHN)
    let defaultServices = authnServices.filter(s => s.platform !== SERVICES_PLATFORMS.EXTENSION) // We don't want extensions unless they are injected and listed

    // Check version of FCL. If their app version is older than the supported version for browser extensions then continue on without adding browser extensions.
    if (
      appVersion &&
      isGreaterThanOrEqualToVersion(appVersion, supportedVersion)
    ) {
      // Add browser extensions
      const listedExtensions = serviceListOfProp(authnServices, "platform", SERVICES_PLATFORMS.EXTENSION)
      const filteredExtensions = filterListedExtensions(listedExtensions, extensions)
      defaultServices = combineServices(
        defaultServices,
        filteredExtensions,
        true
      )
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

  if (!data) return <div />
  if (error) return <div>Error Loading Data</div>

  return (
    <ServicesContainer>
      <Header />
      <ProvidersList>
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
      </ProvidersList>
      <Footer handleCancel={handleCancel} />
    </ServicesContainer>
  )
}
