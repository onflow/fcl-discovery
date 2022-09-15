import metadataJson from '../data/metadata.json'

export const getProviderMetadataByAddress = address =>
  address ? metadataJson[address] : null

export const getInstallLinkFromMetadata = (providerMetadata, platform) => {
  if (!providerMetadata || !platform) return
  return providerMetadata?.platforms[platform.toLowerCase()]?.install_link
}
