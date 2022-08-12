## Service Fields

### Service / Provider

Please refer to the [Wallet Provider Spec](https://github.com/onflow/fcl-js/blob/9bce741d3b32fde18b07084b62ea15f9bbdb85bc/packages/fcl/src/wallet-provider-spec/draft-v3.md)

### Metadata

If your service requires data beyond what is in the service spec (For example, you may have an extension that requires an install link if uninstalled), please provide it in the [metadata file](https://github.com/onflow/fcl-discovery/blob/master/data/metadata.json).

Current fields supported are:

- `platform` (`chrome`, more coming soon)
  -- `install_link`
