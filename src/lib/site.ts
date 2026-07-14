// Single source of truth for canonical URLs, sitemap entries, and JSON-LD.
// Overridable per environment so preview deploys don't advertise production URLs.

import { CONTACT } from "./data";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://noverafitness.com"
).replace(/\/$/, "");

export const SITE_NAME = "Novera";

export const SITE_DESCRIPTION =
  "Novera supplies research-grade peptides and wellness supplements — verified purity, controlled consistency, and secure global delivery from Dubai.";

/** Absolute URL for a site-relative path — required by Open Graph and JSON-LD. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: CONTACT.email,
  telephone: CONTACT.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address[0],
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
} as const;

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: { "@id": absoluteUrl("/#organization") },
} as const;
