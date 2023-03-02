/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  env: {
    AZURE_FUNCTION_URL: process.env.AZURE_FUNCTION_URL,
  },
};

module.exports = nextConfig;
