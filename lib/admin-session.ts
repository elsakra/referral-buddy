import { createHmac, timingSafeEqual } from "node:crypto";

const SALT = "offermatch-admin-session-v1";

export function getAdminSessionToken(secret: string): string {
  return createHmac("sha256", secret).update(SALT).digest("hex");
}

export function verifyAdminSession(
  cookieValue: string | undefined,
  secret: string | undefined,
): boolean {
  if (!cookieValue || !secret) return false;
  const expected = getAdminSessionToken(secret);
  try {
    const a = Buffer.from(cookieValue, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE = "offermatch_admin";
