import styled from "styled-components"
import {COLORS} from "../helpers/constants"

const MessageContainer = styled.div`
  background: ${COLORS.WARNING};
  padding: 15px;
  margin: 15px 0 25px 0;
  border-radius: 5px;
  font-size: 0.9rem;
  text-align: center;
`

const MessageLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
`

export function Message({text, link}) {
  return (
    <MessageContainer>
      <div>{text}</div>
      <div>For more info, see <MessageLink onClick={() => window.open(link, "_blank")}>{link}</MessageLink></div>
    </MessageContainer>
  )
}