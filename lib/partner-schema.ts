import { z } from "zod";

export const PARTNER_ROLES = [
  "Insurance agent",
  "Marketing freelancer/agency",
  "Fitness trainer/coach",
  "Accountant",
  "Real estate agent",
  "Web designer",
  "Beauty/salon",
  "Other",
] as const;

export const CLIENT_BANDS = [
  "1-10",
  "11-25",
  "26-50",
  "51-100",
  "100+",
] as const;

function optionalText(max: number) {
  return z
    .string()
    .max(max)
    .optional()
    .transform((s) => {
      if (s === undefined) return undefined;
      const t = s.trim();
      return t === "" ? undefined : t;
    });
}

/** Draft patches: empty string becomes null so we can clear optional columns */
function draftNullableText(max: number) {
  return z
    .string()
    .max(max)
    .optional()
    .transform((s) => {
      if (s === undefined) return undefined;
      const t = s.trim();
      return t === "" ? null : t;
    });
}

/** Full signup (landing one-shot or final complete step) */
export const partnerCompleteSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Valid email required").max(320),
  role: z.enum(PARTNER_ROLES),
  active_clients_band: z.enum(CLIENT_BANDS),
  region: z.string().trim().min(1, "City/region is required").max(200),
  products_note: optionalText(5000),
  extra_note: optionalText(5000),
  profile_url: optionalText(2048),
  source: z.string().trim().max(64).optional(),
});

export type PartnerCompleteInput = z.infer<typeof partnerCompleteSchema>;

/** Partial patch for draft autosave */
export const partnerDraftPatchSchema = z.object({
  email: z.string().trim().email().max(320).optional(),
  full_name: z.string().trim().max(200).optional(),
  role: z.enum(PARTNER_ROLES).optional(),
  active_clients_band: z.enum(CLIENT_BANDS).optional(),
  region: z.string().trim().max(200).optional(),
  products_note: draftNullableText(5000),
  extra_note: draftNullableText(5000),
  profile_url: draftNullableText(2048),
  source: z.string().trim().max(64).optional(),
});

export type PartnerDraftPatch = z.infer<typeof partnerDraftPatchSchema>;

export const draftRequestSchema = z.object({
  id: z.string().uuid().optional(),
  patch: partnerDraftPatchSchema,
});
