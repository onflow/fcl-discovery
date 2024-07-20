module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/authn',
        destination: '/api/mainnet/authn',
      },
    ]
  },
}
