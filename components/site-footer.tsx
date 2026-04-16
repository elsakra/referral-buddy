import Link from "next/link";
import { CAL_DEMO_URL } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-zinc-900">ReferralBuddy</p>
            <p className="mt-1 max-w-md text-sm text-zinc-600">
              The partner marketplace where brands find referral partners and
              partners earn by recommending products they believe in.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href={CAL_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              Book a demo (Cal.com)
            </a>
            <Link href="#partner-form" className="text-zinc-600 hover:text-zinc-900">
              Partner signup
            </Link>
          </div>
        </div>
        <p className="mt-8 text-xs text-zinc-500">
          © {new Date().getFullYear()} ReferralBuddy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
