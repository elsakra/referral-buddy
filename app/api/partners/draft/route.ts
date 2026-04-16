import { NextResponse } from "next/server";
import { draftRequestSchema } from "@/lib/partner-schema";
import { patchToColumns } from "@/lib/partner-db";
import { createServiceClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = draftRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { id, patch } = parsed.data;
  const supabase = createServiceClient();

  const columns = patchToColumns(patch);
  const hasEmail = typeof patch.email === "string" && patch.email.trim() !== "";

  try {
    if (id) {
      const { data: existing, error: fetchErr } = await supabase
        .from("partner_signups")
        .select("id, is_complete")
        .eq("id", id)
        .maybeSingle();

      if (fetchErr || !existing) {
        return NextResponse.json({ error: "Draft not found" }, { status: 404 });
      }
      if (existing.is_complete) {
        return NextResponse.json(
          { error: "This application is already complete" },
          { status: 400 },
        );
      }

      const { error: upErr } = await supabase
        .from("partner_signups")
        .update(columns)
        .eq("id", id);

      if (upErr) {
        console.error("draft update:", upErr);
        return NextResponse.json(
          { error: "Could not save. Try again." },
          { status: 500 },
        );
      }
      return NextResponse.json({ id });
    }

    if (!hasEmail) {
      return NextResponse.json(
        { error: "Email is required to start your application" },
        { status: 400 },
      );
    }

    const email = patch.email!.toLowerCase();

    const { data: alreadyDone } = await supabase
      .from("partner_signups")
      .select("id")
      .eq("email", email)
      .eq("is_complete", true)
      .maybeSingle();

    if (alreadyDone) {
      return NextResponse.json(
        {
          error:
            "This email already completed signup. Check your inbox or contact us.",
        },
        { status: 409 },
      );
    }

    const { data: draftRow } = await supabase
      .from("partner_signups")
      .select("id")
      .eq("email", email)
      .eq("is_complete", false)
      .maybeSingle();

    if (draftRow) {
      const { error: upErr } = await supabase
        .from("partner_signups")
        .update(columns)
        .eq("id", draftRow.id);

      if (upErr) {
        console.error("draft upsert update:", upErr);
        return NextResponse.json(
          { error: "Could not save. Try again." },
          { status: 500 },
        );
      }
      return NextResponse.json({ id: draftRow.id });
    }

    const insertRow = {
      email,
      is_complete: false,
      source: patch.source?.trim() || "cold_email",
      full_name: columns.full_name ?? null,
      role: columns.role ?? null,
      active_clients_band: columns.active_clients_band ?? null,
      region: columns.region ?? null,
      products_note: columns.products_note ?? null,
      extra_note: columns.extra_note ?? null,
      profile_url: columns.profile_url ?? null,
    };

    const { data: inserted, error: insErr } = await supabase
      .from("partner_signups")
      .insert(insertRow)
      .select("id")
      .single();

    if (insErr) {
      if (insErr.code === "23505") {
        return NextResponse.json(
          {
            error:
              "This email already has an account or open application. Try signing in with your link or use another email.",
          },
          { status: 409 },
        );
      }
      console.error("draft insert:", insErr);
      return NextResponse.json(
        { error: "Could not save. Try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ id: inserted!.id });
  } catch (e) {
    console.error("partner draft:", e);
    return NextResponse.json(
      { error: "Server error. Try again later." },
      { status: 500 },
    );
  }
}
