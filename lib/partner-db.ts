import type { PartnerDraftPatch } from "@/lib/partner-schema";

export type PartnerSignupRow = {
  full_name: string | null;
  email: string;
  role: string | null;
  active_clients_band: string | null;
  region: string | null;
  products_note: string | null;
  extra_note: string | null;
  profile_url: string | null;
  source: string;
  is_complete: boolean;
};

export function patchToColumns(
  patch: PartnerDraftPatch,
): Record<string, string | null | undefined> {
  const out: Record<string, string | null | undefined> = {};
  if (patch.email !== undefined) out.email = patch.email.toLowerCase();
  if (patch.full_name !== undefined) out.full_name = patch.full_name || null;
  if (patch.role !== undefined) out.role = patch.role || null;
  if (patch.active_clients_band !== undefined)
    out.active_clients_band = patch.active_clients_band || null;
  if (patch.region !== undefined) out.region = patch.region || null;
  if (patch.products_note !== undefined) out.products_note = patch.products_note;
  if (patch.extra_note !== undefined) out.extra_note = patch.extra_note;
  if (patch.profile_url !== undefined) out.profile_url = patch.profile_url;
  if (patch.source !== undefined) out.source = patch.source;
  return out;
}
