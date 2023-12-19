/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_Url: "http://172.17.0.1/api",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
