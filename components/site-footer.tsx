import Link from "next/link";
import { CAL_DEMO_URL } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-rb-chocolate-mid bg-rb-chocolate text-white/90">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-xl font-semibold text-white">
              OfferMatch
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
              The partner marketplace where brands find referral partners and
              partners earn by recommending products they believe in.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <a
              href={CAL_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white hover:underline"
            >
              Book a demo
            </a>
            <Link
              href="/join"
              className="text-white/75 hover:text-white"
            >
              Partner signup (link)
            </Link>
            <Link
              href="#partner-form"
              className="text-white/75 hover:text-white"
            >
              Partner form on this page
            </Link>
          </div>
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-xs text-white/50">
          © {new Date().getFullYear()} OfferMatch. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
