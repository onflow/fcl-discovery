export const PATHS = {
  mainnet: "/authn",
  testnet: "/testnet/authn",
  canarynet: "/canarynet/authn",
}

export const SERVICE_TYPES = {
  AUTHN: "authn",
}

export const SUPPORTED_VERSIONS = {
  FILTERING: "0.0.78-alpha.10",
  EXTENSIONS: "0.0.78-alpha.10", // Version that supports browser extension redirects
  APP_CONFIG: "0.0.79-alpha.4"
}

export const COLORS = {
  secondary: '#02419F'
}

const LOCAL_STORAGE_VERSION = 'v1'

export const LOCAL_STORAGE_KEYS = {
  LAST_INSTALLED: `${LOCAL_STORAGE_VERSION}:ext:lastInstalled`
}