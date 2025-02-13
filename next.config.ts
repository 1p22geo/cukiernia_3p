import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "**"
      }
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['*.github.dev', '*', 'localhost:3000'],
    },
  },
  
};

export default nextConfig;
