import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable:process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  turbopack:{},
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "customer-assets.emergentagent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "virtual-trek.emergent.host",
      },
    ],
  },
};

export default withPWA(nextConfig);