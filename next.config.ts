import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ['http://192.168.2.165:3000'], // autorise ton tel
  },
  images: {
    domains: ['cdn.jsdelivr.net', 'upload.wikimedia.org', 'avatars.githubusercontent.com'],
  },
};

export default nextConfig;
