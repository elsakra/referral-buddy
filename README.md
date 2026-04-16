# ReferralBuddy

Marketing site and partner intake API: **Next.js** (App Router) on **Vercel**, **Supabase** for storing partner signups, optional **admin** UI at `/admin`.

## Requirements

- **Node.js ≥ 20.9** (matches Next.js and Vercel’s default)

## Local development

1. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

2. Fill in:

   - `SUPABASE_URL` — Supabase project URL  
   - `SUPABASE_SERVICE_ROLE_KEY` — **service role** key (server-only; never expose to the browser)  
   - `ADMIN_SECRET` — long random string to protect `/admin`  
   - `NEXT_PUBLIC_SITE_URL` — e.g. `http://localhost:3000` (optional; used for metadata and sitemap)

3. In the [Supabase SQL Editor](https://supabase.com/dashboard), run migrations **in order**:

   - `supabase/migrations/001_partner_signups.sql` — base table and RLS (no public policies; server-side service role only).  
   - `supabase/migrations/002_partner_signups_drafts.sql` — `is_complete`, nullable columns for in-progress signups, optional `profile_url`, partial unique indexes for completed vs draft emails.

4. Install and run:

   ```bash
   npm install
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000). Submit the partner form or visit [`/join`](http://localhost:3000/join) for the step-by-step flow. Confirm rows in **Table Editor → `partner_signups`**, or visit `/admin` after setting `ADMIN_SECRET`.

## Pages

- **`/`** — Marketing site + embedded partner form (single submit).  
- **`/join`** — High-conversion, one-question-at-a-time flow with **autosave** after each step (`noindex`). Use query params `?email=` and `?first_name=` to prefill from outbound email. Resume via `?d=<draft_uuid>` or session storage.

## API

- `POST /api/partners` — Full signup in one request; sets `is_complete: true`. Duplicate **completed** emails return `409`.  
- `POST /api/partners/draft` — Body `{ id?: uuid, patch: { ... } }` merges fields for an in-progress row (`is_complete: false`). Requires `email` on first create.  
- `POST /api/partners/complete` — Body `{ id: uuid }` validates all required fields and sets `is_complete: true`.

## Admin

- `/admin/login` — password is `ADMIN_SECRET`  
- `/admin` — table of signups (defaults to **completed** only). Append `?drafts=1` to include in-progress applications.

Do not index admin routes in production search engines; `app/robots.ts` disallows `/admin`.

## Deploy (Vercel)

- **GitHub:** [github.com/elsakra/referral-buddy](https://github.com/elsakra/referral-buddy) (default branch `main`).  
- **Production URL:** [referral-buddy.vercel.app](https://referral-buddy.vercel.app)  
- **Dashboard:** [vercel.com/elsakras-projects/referral-buddy](https://vercel.com/elsakras-projects/referral-buddy) — Git is connected so pushes to `main` trigger production deploys.

### Environment variables on Vercel

These are set in the project (replace Supabase placeholders with real values from the Supabase dashboard):

| Variable | Production | Development (Vercel) | Notes |
|----------|------------|----------------------|--------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Yes | e.g. `https://referral-buddy.vercel.app` |
| `SUPABASE_URL` | Yes | Yes | Replace `YOUR_PROJECT_REF` with your project ref |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | — | Sensitive keys cannot target **Development** on Vercel; use `.env.local` locally |
| `ADMIN_SECRET` | Yes | — | Same as above; read the value in the Vercel UI under Environment Variables |

**Preview deployments:** The CLI often requires a specific Git branch for Preview envs. Easiest fix: in the Vercel project → **Settings → Environment Variables**, add the same variables for **Preview** (e.g. “All preview branches”) after you replace placeholders.

Use Node 20+ (see `package.json` `engines`).

## Security

- Never commit `.env.local` or service role keys.  
- If API keys were ever pasted into chat, email, or tickets, **rotate them** in Supabase, Vercel, and GitHub immediately.

## License

Private / unpublished — adjust as needed.
