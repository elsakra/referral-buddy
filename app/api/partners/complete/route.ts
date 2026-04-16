import { NextResponse } from "next/server";
import { z } from "zod";
import { partnerCompleteSchema } from "@/lib/partner-schema";
import { createServiceClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const bodySchema = z.object({
  id: z.string().uuid(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsedId = bodySchema.safeParse(body);
  if (!parsedId.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { id } = parsedId.data;

  try {
    const supabase = createServiceClient();
    const { data: row, error: fetchErr } = await supabase
      .from("partner_signups")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (fetchErr || !row) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (row.is_complete) {
      return NextResponse.json(
        { error: "This application is already submitted" },
        { status: 400 },
      );
    }

    const candidate = {
      full_name: row.full_name,
      email: row.email,
      role: row.role,
      active_clients_band: row.active_clients_band,
      region: row.region,
      products_note: row.products_note ?? undefined,
      extra_note: row.extra_note ?? undefined,
      profile_url: row.profile_url ?? undefined,
      source: row.source ?? "cold_email",
    };

    const parsed = partnerCompleteSchema.safeParse(candidate);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please finish all required fields",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const d = parsed.data;
    const { error: upErr } = await supabase
      .from("partner_signups")
      .update({
        full_name: d.full_name,
        email: d.email.toLowerCase(),
        role: d.role,
        active_clients_band: d.active_clients_band,
        region: d.region,
        products_note: d.products_note ?? null,
        extra_note: d.extra_note ?? null,
        profile_url: d.profile_url ?? null,
        source: d.source?.trim() || "cold_email",
        is_complete: true,
      })
      .eq("id", id);

    if (upErr) {
      if (upErr.code === "23505") {
        return NextResponse.json(
          {
            error:
              "This email already has a completed signup. Contact us if you need help.",
          },
          { status: 409 },
        );
      }
      console.error("complete update:", upErr);
      return NextResponse.json(
        { error: "Could not finalize. Try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("partner complete:", e);
    return NextResponse.json(
      { error: "Server error. Try again later." },
      { status: 500 },
    );
  }
}
