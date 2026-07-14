import type { Metadata } from "next";

// page.tsx is a client component and cannot export metadata, so it lives here.
export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your Novera account to track orders, reorder research compounds, and manage your details.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/signin" },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
