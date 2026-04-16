import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ReferralBuddy — Partner marketplace for brands and professionals",
    template: "%s · ReferralBuddy",
  },
  description:
    "Brands find referral partners. Partners earn by recommending products they believe in. Join free; pay only for results.",
  openGraph: {
    title: "ReferralBuddy — Partner marketplace",
    description:
      "Brands find referral partners. Partners earn by recommending products to their clients.",
    url: siteUrl,
    siteName: "ReferralBuddy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReferralBuddy",
    description:
      "The partner marketplace where brands find referral partners and partners earn by recommending products.",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-zinc-900">
        {children}
      </body>
    </html>
  );
}
