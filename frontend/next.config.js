/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_Url: "http://localhost:3001",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
