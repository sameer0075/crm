// next.config.js
import * as dotenv from 'dotenv';
// Load environment variables from .env files
dotenv.config();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
