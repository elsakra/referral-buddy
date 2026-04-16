"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Reset scroll position on client-side navigations (App Router can preserve scroll in some cases). */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
