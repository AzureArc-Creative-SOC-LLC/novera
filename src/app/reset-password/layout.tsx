import type { Metadata } from "next";

// page.tsx is a client component and cannot export metadata, so it lives here.
// Reset links carry a single-use token in the query string — never index these.
export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new password for your Novera account.",
  robots: { index: false, follow: false },
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
