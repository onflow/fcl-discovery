import {WalletUtils} from "@onflow/fcl"
import styled from "styled-components"
import {COLORS, LOCAL_STORAGE_KEYS, SUPPORTED_VERSIONS} from "../helpers/constants"
import {isGreaterThanOrEqualToVersion} from "../helpers/version"
import {useFCL} from "../hooks/useFCL"
import {useLocalStorage} from "../hooks/useLocalStorage"

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const MoreSection = styled.div`
  margin-right: 10px;
  cursor: pointer;
  width: 30px;
  height: 30px;
`

const MoreImg = styled.img`
  width: 30px;
  height: 30px;
`

const ServiceCardContainer = styled.a`
  width: 100%;

  padding: 0.5rem 1rem 0.5rem 1rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  border: 0.5px solid ${COLORS.grey};
  box-sizing: border-box;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
  border-radius: 15px;

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
  font-weight: bold;
  font-size: 2rem;
  color: #231f20;
  font-weight: bold;
`

export default function ServiceCard({isEnabled, address, icon, name, service}) {
  const {extensions, appVersion} = useFCL()
  const isInstalled = extensions.some(ext => ext?.provider?.address === address)
  const [_, setLastInstalled] = useLocalStorage(LOCAL_STORAGE_KEYS.LAST_INSTALLED, null)
  const serviceWebsite = service?.provider?.website
  const hasWebsite = Boolean(service?.provider?.website)

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
  
  const openMoreInfo = () => {
    if (!hasWebsite) return
    window.open(serviceWebsite, "_blank")
  }
  
  return (
    <RowContainer>
      <MoreSection onClick={openMoreInfo}>
        {hasWebsite && <MoreImg src="/images/question-mark.svg" alt="Learn More" />}
      </MoreSection>
      <ServiceCardContainer enabled={isEnabled} onClick={onSelect}>
        <ServiceCardRow>
          <ServiceCardIcon icon={icon} />
          <ServiceCardName>{name}</ServiceCardName>
          {isInstalled && <div>Installed</div>}
        </ServiceCardRow>
      </ServiceCardContainer>
    </RowContainer>
  )
}
