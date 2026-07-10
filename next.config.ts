import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Turbopack only resolves modules inside its detected root (this
    // project's package-lock.json). The send-order-confirmation API route
    // imports ../../../../../../shared-email/order-email.js, which lives
    // outside that root, so widen it to the common Dev/ ancestor.
    root: path.join(import.meta.dirname, "../.."),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
