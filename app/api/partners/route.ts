import { NextResponse } from "next/server";
import { partnerCompleteSchema } from "@/lib/partner-schema";
import { createServiceClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = partnerCompleteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const email = data.email.toLowerCase();
  const row = {
    full_name: data.full_name,
    email,
    role: data.role,
    active_clients_band: data.active_clients_band,
    region: data.region,
    products_note: data.products_note ?? null,
    extra_note: data.extra_note ?? null,
    profile_url: data.profile_url ?? null,
    source: data.source?.trim() || "landing",
    is_complete: true,
  };

  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from("partner_signups").insert(row);

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          {
            error:
              "This email is already registered. If you need to update your profile, contact us.",
          },
          { status: 409 },
        );
      }
      console.error("partner_signups insert:", error);
      return NextResponse.json(
        { error: "Could not save your signup. Please try again later." },
        { status: 500 },
      );
    }
  } catch (e) {
    console.error("partner_signups:", e);
    return NextResponse.json(
      {
        error:
          "Server configuration error. Please try again later or contact support.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
