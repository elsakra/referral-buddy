import { Suspense } from "react";
import Link from "next/link";
import { TypeformFlow } from "@/components/join/typeform-flow";

export const metadata = {
  title: "Apply in 60 seconds",
  description:
    "Join the OfferMatch partner network—one question at a time. No fees.",
  robots: { index: false, follow: false },
};

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; first_name?: string }>;
}) {
  const sp = await searchParams;
  const prefilledEmail = sp.email ? decodeURIComponent(sp.email) : undefined;
  const prefilledFirstName = sp.first_name
    ? decodeURIComponent(sp.first_name)
    : undefined;

  return (
    <div className="min-h-screen bg-rb-cream">
      <header className="border-b border-rb-sand/80 bg-rb-cream/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link
            href="/"
            className="font-display text-lg font-semibold text-rb-chocolate"
          >
            OfferMatch
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-rb-text-muted hover:text-rb-chocolate"
          >
            Home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Suspense
          fallback={
            <div className="mx-auto max-w-xl animate-pulse rounded-2xl bg-rb-sand/40 p-12" />
          }
        >
          <TypeformFlow
            prefilledEmail={prefilledEmail}
            prefilledFirstName={prefilledFirstName}
          />
        </Suspense>
      </div>
    </div>
  );
}
