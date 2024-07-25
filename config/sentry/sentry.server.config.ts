// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import { sentryBaseConfig } from './sentry.base.config'

Sentry.init({
  // Inherit base config
  ...sentryBaseConfig,

  // TODO: generate a new DSN for backend
  dsn: process.env.SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,
} as Sentry.NodeOptions)
