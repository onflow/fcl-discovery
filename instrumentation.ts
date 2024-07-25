export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./config/sentry/sentry.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./config/sentry/sentry.edge.config')
  }
}
