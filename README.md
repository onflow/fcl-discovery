## Discovery

When building an dapp on Flow using [@onflow/fcl](https://github.com/onflow/fcl-js), Discovery eliminates the need for dapp developers to write code to integrate their user's preferred wallet into their application. Instead, @onflow/fcl and this repo uses a secure discovery protocol that wallets can implement to connect to @onflow/fcl. The end result is dapps using @onflow/fcl automatically integrate all compatible wallets without their developers needing to write any custom code!

To read more about consuming/using this repo via FCL, visit the [Discovery docs](https://developers.flow.com/tools/fcl-js/reference/discovery).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

### Discovery Routes

| Environment | Example                                                                |
| ----------- | ---------------------------------------------------------------------- |
| Mainnet     | `http://localhost:3002/authn` or `http://localhost:3002/mainnet/authn` |
| Testnet     | `http://localhost:3002/testnet/authn`                                  |
| Local       | `http://localhost:3002/local/authn`                                    |

### Discovery API Endpoints

| Environment | Example                                                                        |
| ----------- | ------------------------------------------------------------------------------ |
| Mainnet     | `http://localhost:3002/api/authn` or `http://localhost:3002/api/mainnet/authn` |
| Testnet     | `http://localhost:3002/api/testnet/authn`                                      |
| Local       | `http://localhost:3002/api/local/authn`                                        |

> Note: Local will return Dev Wallet as a service for developing locally with the default port of 8701. If you'd like to override the default port add ?port=0000 with the port being whatever you'd like to override it to.

## Configuration (For FCL)

These are examples on how to set configuration from [FCL](https://docs.onflow.org/fcl/) in your application.

### Include Opt In Wallets

**Starting in FCL v0.0.78-alpha.10**

To include opt-in wallets from FCL:

```
import * as fcl from "@onflow/fcl"

fcl.config({
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "discovery.authn.endpoint": "https://fcl-discovery.onflow.org/api/testnet/authn",
  "discovery.authn.include": ["0x123"] // Service account address
})
```

**Opt-In Wallet Addresses on Testnet and Mainnet**

| Service         | Testnet            | Mainnet            |
| --------------- | ------------------ | ------------------ |
| `Dapper Wallet` | 0x82ec283f88a62e65 | 0xead892083b3e2c6c |
| `Ledger`        | 0x9d2e44203cb13051 | 0xe5cd26afebe62781 |

For more information on including opt-in wallets, see [the FCL docs](https://developers.flow.com/tools/fcl-js/reference/api#more-configuration).

### App Title & Icon

**Starting in FCL v0.0.79-alpha.4**

To set an app title and icon from FCL:

```
import * as fcl from "@onflow/fcl"

fcl.config({
  "app.detail.title": "Test App",
  "app.detail.icon": "https://placekitten.com/g/200/200"
})
```

## Adding a Wallet to Discovery

Flow compatible wallets wanting to add their wallets to Discovery can do so by creating a PR with the following:

- Add your wallet's service information to the [services data file](https://github.com/onflow/fcl-discovery/blob/master/data/services.json)
- Please provide any metadata related to your service if required ([see metadata docs](https://github.com/onflow/fcl-discovery/blob/master/docs/service-fields.md))
- Provide a demo of your wallet that can be tested and is connected to Testnet
- Specify if your wallet is opt-in or not. Opt-in wallets are those that don't have support for authentication, authorization, and user signature services.

For more information/examples on how to build a Flow compatible wallet, check out the following links:

- [Wallet Provider Spec](https://github.com/onflow/fcl-js/blob/9bce741d3b32fde18b07084b62ea15f9bbdb85bc/packages/fcl/src/wallet-provider-spec/draft-v3.md)
- [FCL Dev Wallet](https://github.com/onflow/fcl-dev-wallet)
- [Example Chrome Extension Wallet](https://github.com/onflow/wallet-extension-example)

## Documentation

To learn more about the repo, take a look at the following resources:

- [Discovery](https://developers.flow.com/tools/fcl-js/reference/api#discovery) - Documentation for using Discovery with FCL.
- [FCL](https://developers.flow.com/tools/fcl-js) - Learn more about Flow's FCL
- [Next.js Documentation](https://nextjs.org/docs) - This app is built with Next. Learn about Next.js features and API.
