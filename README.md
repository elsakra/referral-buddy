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

1. Push this repo to GitHub and import the project in Vercel.  
2. Set the same env vars as in `.env.example` (use **Production** and **Preview** as needed).  
3. Use Node 20+ (see `package.json` `engines`).  
4. After deploy, set `NEXT_PUBLIC_SITE_URL` to your production URL so Open Graph and `sitemap.xml` are correct.

## Security

- Never commit `.env.local` or service role keys.  
- If API keys were ever pasted into chat, email, or tickets, **rotate them** in Supabase, Vercel, and GitHub immediately.

## License

Private / unpublished — adjust as needed.
