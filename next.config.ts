import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blackjack',
        permanent: true,
      }
    ]
  },
}
 
export default nextConfig