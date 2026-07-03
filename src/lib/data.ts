// Centralized content for Novera — research-grade peptides & wellness science.
// All copy is original. Imagery uses Unsplash editorial/clinical photography.

export const BRAND = {
  name: "Novera",
  tagline: "Research-Grade Peptides & Wellness Science",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#products" },
  { label: "About", href: "/#about" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

// "Products" — original descriptions for the research compounds in our range.
export type Product = {
  no: string;
  slug: string;
  name: string;
  tag: string;
  price: number;
  summary: string;
  description: string;
  strengths: string[];
  image: string;
  gallery: string[];
};

export const PRODUCTS: Product[] = [
  {
    no: "01",
    slug: "tirzepatide",
    name: "Tirzepatide",
    tag: "Research Use Only",
    price: 189,
    summary: "Dual-agonist research peptide for metabolic studies.",
    description:
      "A dual-agonist research peptide widely studied in metabolic and weight-management research. Lyophilised, nitrogen-sealed, and verified for purity in every batch, with a certificate of analysis included.",
    strengths: ["5 mg", "10 mg", "15 mg", "30 mg"],
    image: "/images/alluvi-tirzepatide.jpg",
    gallery: [
      "/images/alluvi-tirzepatide.jpg",
      "/images/alluvi-tirzepatide-2.jpg",
      "/images/alluvi-tirzepatide-open.jpg",
      "/images/alluvi-tirzepatide-uv.jpg",
    ],
  },
  {
    no: "02",
    slug: "retatrutide",
    name: "Retatrutide",
    tag: "Research Use Only",
    price: 229,
    summary: "Triple-agonist research peptide for advanced studies.",
    description:
      "A next-generation triple-agonist research peptide for advanced metabolic studies. Consistent concentration, reconstitution-ready, and fully documented with a COA in every shipment.",
    strengths: ["10 mg", "20 mg", "40 mg"],
    image: "/images/alluvi-retatrutide.jpg",
    gallery: [
      "/images/alluvi-retatrutide.jpg",
      "/images/alluvi-retatrutide-pen.jpg",
      "/images/alluvi-retatrutide-open.jpg",
      "/images/alluvi-retatrutide-uv.jpg",
    ],
  },
  {
    no: "03",
    slug: "nad",
    name: "NAD+",
    tag: "Research Use Only",
    price: 149,
    summary: "Cellular-energy compound for longevity research.",
    description:
      "A cellular-energy research compound studied in metabolism, mitochondrial function, and healthy-ageing pathways. Produced under controlled, repeatable processes for batch-to-batch consistency.",
    strengths: ["500 mg", "1000 mg"],
    image: "/images/alluvi-nad.jpg",
    gallery: [
      "/images/alluvi-nad.jpg",
      "/images/alluvi-nad-pen.jpg",
      "/images/alluvi-nad-open.jpg",
      "/images/alluvi-nad-uv.jpg",
    ],
  },
  {
    no: "04",
    slug: "glow",
    name: "Glow",
    tag: "Wellness Supplement",
    price: 59,
    summary: "Clean daily supplement for skin radiance & vitality.",
    description:
      "A clean daily supplement supporting skin radiance, hydration, and everyday vitality — bioavailable actives, no unnecessary fillers, third-party tested for quality and label accuracy.",
    strengths: ["Daily Sachets", "30-Day Supply"],
    image: "/images/alluvi-glow.jpg",
    gallery: [
      "/images/alluvi-glow.jpg",
      "/images/alluvi-glow-pen.jpg",
      "/images/alluvi-glow-open.jpg",
      "/images/alluvi-glow-uv.jpg",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.slug !== slug);
}

export function formatPrice(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

// "Why Us" — differentiators, original phrasing.
export const WHY_US = [
  {
    no: "01",
    title: "Purity, verified.",
    text: "Every batch is independently analysed by HPLC and mass spectrometry against a ≥99% purity target. A certificate of analysis ships with each order — no guesswork, ever.",
    image: "/images/purity-new.jpeg",
  },
  {
    no: "02",
    title: "Controlled consistency.",
    text: "Formulations are produced under ISO-aligned, tightly controlled processes, so concentration and quality stay uniform from the first vial to the thousandth.",
    image: "/images/consistency-new.jpeg",
  },
  {
    no: "03",
    title: "Secure, global delivery.",
    text: "Temperature-stable, tamper-evident, discreet packaging with tracked worldwide shipping — your order arrives intact, on time, and exactly as specified.",
    image: "/images/delivery-new.jpeg",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "I've ordered four times now and every batch matches its COA to the decimal. That kind of consistency is exactly what our experiments depend on — I won't source from anyone else.",
    name: "Dr. Hana Al-Rashid",
    role: "Verified Client",
    image: "/images/review-hana.jpeg",
  },
  {
    quote:
      "Messaged them on WhatsApp late at night and got a real, helpful answer in minutes. The parcel arrived sealed, cold, and a day ahead of schedule. Easily the smoothest supplier I've dealt with.",
    name: "Marcus Feldmann",
    role: "Verified Buyer",
    image: "/images/review-marcus.jpeg",
  },
  {
    quote:
      "The purity reporting is transparent and the documentation is spotless. I now recommend Novera to every colleague who asks me where I source from.",
    name: "Priya Nair",
    role: "Returning Client",
    image: "/images/review-priya.jpeg",
  },
  {
    quote:
      "The Glow line has become a staple for my clients — clean, well-formulated, and they genuinely feel the difference. Reordering is effortless and it always arrives on time.",
    name: "Sofia Marchetti",
    role: "Wellness Client",
    image: "/images/review-sofia.jpeg",
  },
];

export const CONTACT = {
  whatsapp: "+971 54 000 0000",
  whatsappHref: "https://wa.me/971540000000",
  email: "hello@novera.studio",
  phone: "+971 54 000 0000",
  address: ["Level 12, Innovation One", "Business Bay, Dubai, UAE"],
  hours: "Sun – Fri · 9:00 – 18:00 GST",
};

// Standard responsible-use framing for this category.
export const DISCLAIMER =
  "Research compounds are intended strictly for laboratory and research use only — not for human consumption. Supplement products are not intended to diagnose, treat, cure, or prevent any disease.";
