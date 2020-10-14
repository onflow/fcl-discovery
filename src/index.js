import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ReactDOM from 'react-dom';
import {createGlobalStyle} from "styled-components";
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

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <Switch>  
        <Route path="/authn" component={props => <App network="mainnet" {...props} />} exact/>
        <Route path="/testnet/authn" component={props => <App network="testnet" {...props} />} exact/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
