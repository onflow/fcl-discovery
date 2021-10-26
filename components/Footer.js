import styled from "styled-components"

const AppFooter = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
`

const AppCancel = styled.button`
  text-align: center;
  font-size: 1rem;
  border: none;
  background-color: white;
  cursor: pointer;

  -webkit-appearance: none;
  -moz-appearance: none;
`

export default function Footer({handleCancel}) {
  return (
    <AppFooter>
      <AppCancel onClick={handleCancel}>Cancel</AppCancel>
    </AppFooter>
  )
}
