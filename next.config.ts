import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  experimental: {
    nodeMiddleware: true, // Enable Node.js middleware
  },
};

export default nextConfig;
