import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ReactDOM from 'react-dom';
import styled, {createGlobalStyle} from "styled-components";
import { App } from './components/app';

const GlobalStyle = createGlobalStyle`
  * { 
    margin:0;
    padding:0;
    font-variant-ligatures: common-ligatures;
  }
  :root {
    --text-primary: #0F0F0F;
    --text-secondary: #0B0B0B;
    --font-family:"Overpass",sans-serif;
  }
  body {
    background-color: white;
    color: var(--text-primary);
    font-family: var(--font-family);
    font-size: 16px;
    line-height: 22px;
    // padding: 22px;
  }
  .switch-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .switch-wrapper > div {
    height: 100%;
    width: 100%;
  }
`
const Wrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Inner = styled.div`
  max-height: 100vh;
  height: 35rem;
  max-width: 100vw;
  width: 40rem;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  overflow-y: scroll;
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Wrapper>
      <Inner>
        <Router>
          <Switch>  
            <Route path="/authn" component={props => <App network="mainnet" {...props} />} exact/>
            <Route path="/testnet/authn" component={props => <App network="testnet" {...props} />} exact/>
          </Switch>
        </Router>
      </Inner>
    </Wrapper>
  </React.StrictMode>,
  document.getElementById('root')
);
