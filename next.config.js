/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ZERION_API_KEY: process.env.ZERION_API_KEY,
  },
  reactStrictMode: true,
  server: {
    https: true,
  },
};

module.exports = nextConfig;
