import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: typically 20–30% smaller than WebP at the same quality. Next
    // content-negotiates and falls back to WebP for browsers that lack it.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 0,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
