/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.gravatar.com"],
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
