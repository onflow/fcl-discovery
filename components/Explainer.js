import styled from "styled-components"
import {COLORS} from "../helpers/constants"
import {useFCL} from "../hooks/useFCL"

const ExplainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0 30px 0;
`

const ExplainerDescription = styled.div`
  font-size: 1.3rem;
  margin-bottom: 5px;
  text-align: center;
`

const ExplainerLink = styled.div`
  text-decoration: none;
  color: ${COLORS.SECONDARY};
  cursor: pointer;
`

export default function Explainer() {
  const {appConfig} = useFCL()

  return (
    <ExplainerContainer>
      <ExplainerDescription>
        <div><strong>{appConfig?.title || "Unknown App"}</strong></div>
        <div>wants to connect to your wallet.</div>
      </ExplainerDescription>
      {/* <ExplainerLink>
        <div onClick={() => window.open("https://docs.onflow.org/flow-token/available-wallets/", "_blank")}>What is a wallet?</div>
      </ExplainerLink> */}
    </ExplainerContainer>
  )
}
