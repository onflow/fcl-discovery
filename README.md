## Discovery

When building an dapp on Flow using [@onflow/fcl](https://github.com/onflow/fcl-js), Discovery eliminates the need for dapp developers to write code to integrate their user's preferred wallet into their application. Instead, @onflow/fcl and this repo uses a secure discovery protocol that wallets can implement to connect to @onflow/fcl. The end result is dapps using @onflow/fcl automatically integrate all compatible wallets without their developers needing to write any custom code!

To read more about consuming/using this repo via FCL, visit the [Discovery docs](https://docs.onflow.org/fcl/reference/api/#discovery).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

### Discovery Routes

| Environment    | Example                                   |
| -------------- | ----------------------------------------- |
| Mainnet        | `http://localhost:3000/authn`             |
| Testnet        | `http://localhost:3000/testnet/authn`     |

### Discovery API Endpoints

| Environment    | Example                                   |
| -------------- | ----------------------------------------- |
| Mainnet        | `http://localhost:3000/api/authn`         |
| Testnet        | `http://localhost:3000/api/testnet/authn` |

## Documentation

To learn more about the repo, take a look at the following resources:

- [Discovery](https://docs.onflow.org/fcl/reference/api/#discovery) - Documentation for using Discovery with FCL.
- [FCL](https://docs.onflow.org/fcl/) - Learn more about Flow's FCL
- [Next.js Documentation](https://nextjs.org/docs) - This app is built with Next. Learn about Next.js features and API.
