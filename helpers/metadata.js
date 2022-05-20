import metadataJson from '../data/metadata.json'

export const getProviderMetadataByAddress = address =>
  address ? metadataJson[address] : null
