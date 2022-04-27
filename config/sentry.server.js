import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.SENTRY_DSN, // env var would be NEXT_PUBLIC_... on FE
  tracesSampleRate: 1.0
})

export default Sentry