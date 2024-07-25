module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  async rewrites() {
    return {
      afterFiles: [
        {
          source: '/api/authn',
          destination: '/api/mainnet/authn',
        },
        {
          source: '/api/wallets',
          destination: '/api/mainnet/wallets',
        },
        {
          source: '/authn',
          destination: '/mainnet/authn',
        },
      ],
    }
  },
}
