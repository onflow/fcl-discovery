import styled from "styled-components"

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

export default function ServiceCard({ icon, name, description }) {
  return (
    <ProviderCardRow>
      <ProviderCardIcon icon={icon} />
      <ProviderCardColumn>
        <ProviderCardName>{name}</ProviderCardName>
        <ProviderCardDescription>{description}</ProviderCardDescription>
      </ProviderCardColumn>
    </ProviderCardRow>
  )
}
