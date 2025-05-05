import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["img.clerk.com", "i.pravatar.cc"],
  },
};

export default nextConfig;
