import type { Metadata } from "next";

// page.tsx is a client component and cannot export metadata, so it lives here.
export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your Novera order — secure checkout for research-grade laboratory reference materials. For research purposes only; not for human or veterinary use.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/checkout" },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
