import {WalletUtils} from "@onflow/fcl"
import styled from "styled-components"
import {LOCAL_STORAGE_KEYS, SUPPORTED_VERSIONS} from "../helpers/constants"
import {isGreaterThanOrEqualToVersion} from "../helpers/version"
import {useFCL} from "../hooks/useFCL"
import {useLocalStorage} from "../hooks/useLocalStorage"

const ServiceCardContainer = styled.a`
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

  opacity: ${props => props.enabled ? "1" : "0.7"};
  cursor:  ${props => props.enabled ? "pointer" : "unset"};

  text-decoration: none;
  user-select: none;

  -webkit-appearance: none;
  -moz-appearance: none;
`

const ServiceCardRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const ServiceCardColumn = styled.div`
  margin: 0.5rem 0rem 0.5rem 0rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const ServiceCardIcon = styled.div`
  margin-right: 0.5rem;

  height: 4rem;
  min-width: 4rem;

  border-radius: 0.5rem;

  background-color: ${({color, icon}) => (!icon ? color : "unset")};
  background-image: url(${({icon}) => icon});
  background-size: cover;
`

const ServiceCardName = styled.div`
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 2rem;
  color: #231f20;
  font-weight: bold;
`

const ServiceCardDescription = styled.div`
  color: #a8a8a8;
  text-align: left;
`

export default function ServiceCard({isEnabled, address, icon, name, description, service}) {
  const {extensions, appVersion} = useFCL()
  const isInstalled = extensions.some(ext => ext?.provider?.address === address)
  const [_, setLastInstalled] = useLocalStorage(LOCAL_STORAGE_KEYS.LAST_INSTALLED, null)

  const onSelect = () => {
    if (!service) return

    setLastInstalled(service?.provider?.address)

    if (
      appVersion &&
      isGreaterThanOrEqualToVersion(appVersion, SUPPORTED_VERSIONS.EXTENSIONS)
    ) {
      WalletUtils.redirect(service)
    } else {
      window.location.href = `${service.endpoint}${window.location.search}`
    }
  }
  
  return (
    <ServiceCardContainer enabled={isEnabled} onClick={onSelect}>
      <ServiceCardRow>
        <ServiceCardIcon icon={icon} />
        <ServiceCardColumn>
          <ServiceCardName>{name}</ServiceCardName>
          <ServiceCardDescription>{description}</ServiceCardDescription>
          {isInstalled && <div>Installed</div>}
        </ServiceCardColumn>
      </ServiceCardRow>
    </ServiceCardContainer>
  )
}
