import type { Metadata } from "next";

// page.tsx is a client component and cannot export metadata, so it lives here.
export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review the research compounds in your Novera cart before checkout. For research purposes only; not for human or veterinary use.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cart" },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
