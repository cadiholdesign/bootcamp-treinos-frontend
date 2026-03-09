import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "gw8hy3fdcv.ufs.sh",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
