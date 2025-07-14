import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "1000mb"
    }
  },
  images: {
    remotePatterns: [new URL('https://storage.googleapis.com')]
  }
};

export default nextConfig;