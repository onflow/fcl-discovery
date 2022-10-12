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

Then add Discovery to your FCL app:

```
import * as fcl from "@onflow/fcl"

fcl.config({
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "discovery.authn.endpoint": "https://fcl-discovery.onflow.org/api/testnet/authn"
})
```

## Networks

### Discovery UI URLs

| Environment | Example                               |
| ----------- | ------------------------------------- |
| Mainnet     | `http://localhost:3000/authn`         |
| Testnet     | `http://localhost:3000/testnet/authn` |

### Discovery API Endpoints

| Environment | Example                                   |
| ----------- | ----------------------------------------- |
| Mainnet     | `http://localhost:3000/api/authn`         |
| Testnet     | `http://localhost:3000/api/testnet/authn` |

## More Configuration

For more configuration options, please see the [**documentation**](https://developers.flow.com/tools/fcl-js/reference/discovery).

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
