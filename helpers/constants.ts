import Enum from 'enum-xyz'
import { Browser } from './browsers'

const { AUTHN, CANARYNET, TESTNET, PREVIEWNET, MAINNET, LOCAL, EMULATOR, MIGRATIONNET } =
  Enum.String({ casing: 'lowercase' })

export const NETWORKS = {
  CANARYNET, // canarynet
  TESTNET,
  PREVIEWNET,
  MIGRATIONNET,
  MAINNET,
  LOCAL,
  EMULATOR,
}

export const SERVICE_TYPES = { AUTHN }

export enum FCL_SERVICE_METHODS {
  IFRAME = 'IFRAME/RPC',
  POP = 'POP/RPC',
  TAB = 'TAB/RPC',
  HTTP = 'HTTP/POST',
  EXT = 'EXT/RPC',
  WC = 'WC/RPC',
}

export const DEFAULT_SERVICE_METHODS = [
  FCL_SERVICE_METHODS.IFRAME,
  FCL_SERVICE_METHODS.POP,
  FCL_SERVICE_METHODS.TAB,
  FCL_SERVICE_METHODS.HTTP,
  FCL_SERVICE_METHODS.EXT,
]

export const PATHS = {
  MAINNET: '/authn',
  MAINNET_EXPLICIT: '/mainnet/authn',
  TESTNET: '/testnet/authn',
  MIGRATIONNET: '/migrationnet/authn',
  PREVIEWNET: '/previewnet/authn',
  CANARYNET: '/canarynet/authn',
  LOCAL: '/local/authn',
  EMULATOR: '/emulator/authn',
}

export const SUPPORTED_VERSIONS = {
  FILTERING: '0.0.78-alpha.10', // Version that supports include in FCL config
  EXTENSIONS: '0.0.79-alpha.0', // Version that supports browser extension redirects
  APP_CONFIG: '0.0.79-alpha.4', // Version that supports displaying your app config
  UNINSTALLED_EXTENSIONS: '1.0.0', // Version that supports uninstalled extensions
  UNINSTALLED_EXTENSIONS_API: '1.2.0', // Version that supports uninstalled extensions on Discovery API
  PLATFORM: '1.0.0', // Version that supports platform
  PLUGIN_SERVICES: '1.2.0', // Version that supports plugin services TODO: up this after development
  SUGGESTED_FEATURES: '1.7.0', // Version that supports suggested features
}

export const COLORS = {
  SECONDARY: '#02419F',
  GREY: '#616161',
  GREY_LIGHTER: '#cecece',
  GREY_LIGHTER_TWO: '#f5f5f5',
  BLACK: '#000000',
  WARNING: '#feefb3',
}

const LOCAL_STORAGE_VERSION = 'v1'

export const LOCAL_STORAGE_KEYS = {
  LAST_USED: `discovery:${LOCAL_STORAGE_VERSION}:ext:lastUsed`,
}

export const AVAILABLE_FEATURES = [
  {
    id: 'mobile',
    name: 'Mobile',
    description: 'This wallet is available on mobile devices.',
    color: '#41CC5D',
  },
  {
    id: 'extension',
    name: 'Extension',
    description: 'This wallet is available as a browser extension.',
    color: '#B79DFF',
  },
  {
    id: 'web',
    name: 'Web',
    description: 'This wallet is available as a web-wallet.',
    color: '#0075FF',
  },
  {
    id: 'hardware',
    name: 'Hardware',
    description: 'This wallet is a hardware wallet.',
    color: '#000000',
  },
  {
    id: 'evm',
    name: 'EVM',
    description: 'This wallet supports the Ethereum Virtual Machine.',
    color: 'orange',
  },
] as const

export const CUSTOM_RPC = 'FCL:VIEW:CUSTOM_RPC'
