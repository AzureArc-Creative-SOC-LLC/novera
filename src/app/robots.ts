import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Transactional and per-user routes: nothing here is useful in an index,
      // and /checkout in particular can carry order state.
      disallow: ["/api/", "/cart", "/checkout", "/signin", "/reset-password"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
