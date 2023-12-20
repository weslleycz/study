/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_Url: "https://localhost/api",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
