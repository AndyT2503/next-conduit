/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiUrl: "https://api.realworld.io/api",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.realworld.io",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
