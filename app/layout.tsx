import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { ScrollToTop } from "@/components/scroll-to-top";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OfferMatch — Partner marketplace for brands and professionals",
    template: "%s · OfferMatch",
  },
  description:
    "Brands find referral partners. Partners earn by recommending products they believe in. Join free; pay only for results.",
  openGraph: {
    title: "OfferMatch — Partner marketplace",
    description:
      "Brands find referral partners. Partners earn by recommending products to their clients.",
    url: siteUrl,
    siteName: "OfferMatch",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OfferMatch",
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
      className={`${dmSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-rb-cream font-sans text-rb-text">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
