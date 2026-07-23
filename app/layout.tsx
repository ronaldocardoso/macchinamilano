import type { Metadata } from "next";

import { env } from "@/lib/env";

import "./globals.css";

const title = "Macchina Milano";
const description =
  "Auto esclusive da tutta Italia. Il nuovo portale italiano dedicato ai veicoli premium.";

export const metadata: Metadata = {
  metadataBase: new URL(env.APP_URL),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "/",
    siteName: title,
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
