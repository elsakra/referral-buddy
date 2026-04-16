import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getAdminSessionToken } from "@/lib/admin-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Admin is not configured" },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.password !== secret) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = getAdminSessionToken(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
