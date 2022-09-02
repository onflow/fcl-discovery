export interface Provider {
  address?: string
  name?: string
  icon?: string
  description?: string
  color?: string
  supportEmail?: string
  website?: string
}

export interface Service {
  f_type: 'Service'
  f_vsn: '1.0.0'
  type: 'authn'
  method: string
  uid?: string
  endpoint: string
  provider: Provider
}

export type ServicesPipe = (services: Service[]) => Service[]

export interface VersionServicePipe {
  supportedVersion: string
  pipe: ServicesPipe
}