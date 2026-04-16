import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-900"
        >
          ReferralBuddy
        </Link>
        <nav
          className="flex items-center gap-4 text-sm font-medium text-zinc-600 sm:gap-6"
          aria-label="Primary"
        >
          <a href="#partners" className="hover:text-zinc-900">
            For partners
          </a>
          <a href="#brands" className="hover:text-zinc-900">
            For brands
          </a>
          <a
            href="#partner-form"
            className="rounded-full bg-emerald-600 px-3 py-1.5 text-white hover:bg-emerald-700 sm:px-4"
          >
            Join
          </a>
        </nav>
      </div>
    </header>
  );
}
