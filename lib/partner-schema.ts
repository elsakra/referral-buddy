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

export const partnerSignupSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Valid email required").max(320),
  role: z.enum(PARTNER_ROLES),
  active_clients_band: z.enum(CLIENT_BANDS),
  region: z.string().trim().min(1, "City/region is required").max(200),
  products_note: z.string().trim().max(5000).optional(),
  extra_note: z.string().trim().max(5000).optional(),
  source: z.string().trim().max(64).optional(),
});

export type PartnerSignupInput = z.infer<typeof partnerSignupSchema>;
