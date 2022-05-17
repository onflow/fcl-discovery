import { WalletUtils } from '@onflow/fcl'
import styled from 'styled-components'
import {
  COLORS,
  LOCAL_STORAGE_KEYS,
  SUPPORTED_VERSIONS,
} from '../helpers/constants'
import { isGreaterThanOrEqualToVersion } from '../helpers/version'
import { useFCL, useLocalStorage } from '../hooks'

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const MoreSection = styled.div`
  margin-right: 10px;
  cursor: pointer;
  width: 1.6rem;
  height: 1.6rem;
  transition: 0.1s ease-in transform;

  &:hover {
    transform: scale(1.1);
  }
`

const MoreImg = styled.img`
  width: 1.6rem;
  height: 1.6rem;
`

const ServiceCardContainer = styled.a`
  position: relative;
  width: 100%;

  padding: 0.5rem 1rem 0.5rem 1rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  border: 0.5px solid ${COLORS.GREY_LIGHTER};
  box-sizing: border-box;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
  border-radius: 15px;

  opacity: ${props => (props.enabled ? '1' : '0.7')};
  cursor: ${props => (props.enabled ? 'pointer' : 'unset')};

  text-decoration: none;
  user-select: none;

  -webkit-appearance: none;
  -moz-appearance: none;

  transition: 0.1s ease-in transform;

  &:hover {
    transform: scale(1.01);
  }
`

const ServiceContainerTag = styled.div`
  position: absolute;
  margin: -25px 0 0 10px;
  background: white;
  font-size: 0.8rem;
  color: ${COLORS.GREY};
  padding: 5px;
`

const ServiceCardRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const ServiceCardLeftColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const ServiceCardRightColumn = styled.div`
  padding: 0 10px 0 5px;

  @media (max-width: 480px) {
    display: none;
  }
`

const ServiceCardIcon = styled.div`
  height: 3.8rem;
  min-width: 3.8rem;

  border-radius: 0.5rem;

  background-color: ${({ color, icon }) => (!icon ? color : 'unset')};
  background-image: url(${({ icon }) => icon});
  background-size: cover;
`

const ServiceCardName = styled.div`
  font-size: 1.4rem;
  color: ${COLORS.BLACK};
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`

const ServiceCardTags = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: ${COLORS.GREY};
`

const DotSeperator = styled.div`
  padding: 0 5px;
  font-size: 1.4rem;
`

const ServiceCardTag = styled.div``

const ArrowContainer = styled.div``

const ArrowSvg = styled.img``

export default function ServiceCard({
  isEnabled,
  address,
  icon,
  name,
  service,
  lastUsed = false,
}) {
  const { extensions, appVersion } = useFCL()
  const isInstalled = extensions.some(ext => ext?.provider?.address === address)
  const [_, setLastUsed] = useLocalStorage(
    LOCAL_STORAGE_KEYS.LAST_INSTALLED,
    null
  )
  const serviceWebsite = service?.provider?.website
  const hasWebsite = Boolean(service?.provider?.website)

  const truncateString = (str, n) => {
    if (str.length > n) {
      return str.substring(0, n) + '...'
    } else {
      return str
    }
  }

  const onSelect = () => {
    if (!service) return

    setLastUsed(service?.provider?.address)

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
    window.open(serviceWebsite, '_blank')
  }

  return (
    <RowContainer>
      <MoreSection onClick={openMoreInfo}>
        {hasWebsite && (
          <MoreImg src="/images/question-mark.svg" alt="Learn More" />
        )}
      </MoreSection>
      <ServiceCardContainer enabled={isEnabled} onClick={onSelect}>
        {lastUsed && <ServiceContainerTag>Last Used</ServiceContainerTag>}
        <ServiceCardRow>
          <ServiceCardLeftColumn>
            <ServiceCardIcon icon={icon} />
            <ServiceCardName>{truncateString(name, 15)}</ServiceCardName>
            {isInstalled && (
              <ServiceCardTags>
                <DotSeperator> · </DotSeperator>
                <ServiceCardTag>Installed</ServiceCardTag>
              </ServiceCardTags>
            )}
          </ServiceCardLeftColumn>
          <ServiceCardRightColumn>
            <ArrowContainer>
              <ArrowSvg src="/images/arrow-right.svg" alt="Select" />
            </ArrowContainer>
          </ServiceCardRightColumn>
        </ServiceCardRow>
      </ServiceCardContainer>
    </RowContainer>
  )
}
