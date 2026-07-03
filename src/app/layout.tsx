import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartContext";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Novera — Research-Grade Peptides & Wellness Science",
  description:
    "Novera supplies research-grade peptides and wellness supplements — clean, reliable, and precisely made in Dubai, with verified purity and fast support.",
  openGraph: {
    title: "Novera — Research-Grade Peptides & Wellness Science",
    description:
      "Research-grade peptides and wellness supplements with verified purity, controlled consistency, and secure global delivery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <CartProvider>
          <SmoothScroll>
            <ScrollProgress />
            <Navigation />
            {children}
            <Footer />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
