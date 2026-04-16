"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-rb-sand/80 bg-rb-cream/95 backdrop-blur-md"
          : "border-transparent bg-rb-terracotta/0"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className={`font-display text-lg font-semibold tracking-tight transition-colors ${
            scrolled ? "text-rb-chocolate" : "text-white"
          }`}
        >
          ReferralBuddy
        </Link>
        <nav
          className={`flex items-center gap-4 text-sm font-medium sm:gap-8 ${
            scrolled ? "text-rb-text-muted" : "text-white/90"
          }`}
          aria-label="Primary"
        >
          <a
            href="#partners"
            className={`transition hover:text-rb-chocolate ${
              scrolled ? "" : "hover:text-white"
            }`}
          >
            For partners
          </a>
          <a
            href="#brands"
            className={`transition hover:text-rb-chocolate ${
              scrolled ? "" : "hover:text-white"
            }`}
          >
            For brands
          </a>
          <a
            href="#partner-form"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              scrolled
                ? "bg-rb-terracotta text-white hover:bg-rb-terracotta-dark"
                : "bg-white text-rb-terracotta hover:bg-rb-cream"
            }`}
          >
            Join
          </a>
        </nav>
      </div>
    </header>
  );
}
