export type Provider = {
  address?: string
  name?: string
  icon?: string
  description?: string
  color?: string
  supportEmail?: string
  website?: string
  is_installed?: boolean
}

export type Service = {
  f_type: 'Service'
  f_vsn: '1.0.0'
  type: 'authn'
  method: string
  uid?: string
  endpoint: string
  provider: Provider & Metadata
}

export type Metadata = {
  install_link: string
}

export type ServicesPipe = (services: Service[]) => Service[]

export interface VersionServicePipe {
  supportedVersion: string
  pipe: ServicesPipe
}
