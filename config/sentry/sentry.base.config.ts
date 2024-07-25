import * as Sentry from '@sentry/nextjs'

export const sentryBaseConfig:
  | Sentry.BrowserOptions
  | Sentry.NodeOptions
  | Sentry.EdgeOptions = {
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
  enabled: process.env.NODE_ENV !== 'development',
}
