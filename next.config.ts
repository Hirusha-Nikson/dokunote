import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["img.clerk.com"], // Add img.clerk.com here
  },
};

export default nextConfig;
