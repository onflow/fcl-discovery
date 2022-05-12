import styled from 'styled-components'
import { COLORS } from '../helpers/constants'

const MessageContainer = styled.div`
  background: ${COLORS.WARNING};
  padding: 15px;
  margin: 15px 0 25px 0;
  border-radius: 5px;
  font-size: 0.9rem;
  text-align: center;
  display: flex;
  align-items: center;
`

const MessageText = styled.div`
  padding-right: 10px;
`

const CloseSection = styled.div`
  cursor: pointer;
  width: 15px;
  height: 15px;
  right: 25px;
`

const CloseIcon = styled.img`
  width: 15px;
  height: 15px;
`

const MessageLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
`

export function Message({ text, link, onClose }) {
  return (
    <MessageContainer>
      <MessageText>
        <div>{text}</div>
        <div>
          For more info, see{' '}
          <MessageLink onClick={() => window.open(link, '_blank')}>
            {link}
          </MessageLink>
        </div>
      </MessageText>
      <CloseSection onClick={onClose}>
        <CloseIcon src="/images/close.svg" alt="Close" />
      </CloseSection>
    </MessageContainer>
  )
}
