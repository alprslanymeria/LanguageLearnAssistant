import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "1000mb"
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**'
      }
    ]
  },
  reactStrictMode: false,
  output: 'standalone'   // ENABLE STANDALONE OUTPUT FOR DOCKER DEPLOYMENT
};

export default nextConfig;