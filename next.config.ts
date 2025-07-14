import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "1000mb"
    }
  },
  images: {
    domains: ['storage.googleapis.com']
  }
};

export default nextConfig;