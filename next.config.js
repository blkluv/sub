/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gravatar.com",
      },
      {
        protocol: "https",
        hostname: `*.${process.env.NEXT_PUBLIC_GATEWAY_ROOT}.cloud`,
      },
    ],
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
