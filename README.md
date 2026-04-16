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

3. In the [Supabase SQL Editor](https://supabase.com/dashboard), run the migration in:

   `supabase/migrations/001_partner_signups.sql`

   This creates `partner_signups`, a unique index on `lower(email)`, and enables RLS with **no** public policies (inserts go through this app’s API using the service role only).

4. Install and run:

   ```bash
   npm install
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000). Submit the partner form and confirm a row appears in **Table Editor → `partner_signups`**, or visit `/admin` after setting `ADMIN_SECRET`.

## API

- `POST /api/partners` — JSON body validated with Zod; inserts into `partner_signups`. Duplicate emails return `409`.

## Admin

- `/admin/login` — password is `ADMIN_SECRET`  
- `/admin` — table of recent signups (requires login)

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
