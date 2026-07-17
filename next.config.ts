import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // @ts-ignore - turbopack config is experimental and not yet in types
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
