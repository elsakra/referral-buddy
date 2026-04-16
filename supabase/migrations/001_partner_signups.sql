-- Partner intake (server-side inserts only via service role)
-- Apply in Supabase SQL Editor or via CLI: supabase db push

create extension if not exists "pgcrypto";

create table if not exists public.partner_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  role text not null,
  active_clients_band text not null,
  region text not null,
  products_note text,
  extra_note text,
  source text not null default 'landing'
);

create unique index if not exists partner_signups_email_lower_key
  on public.partner_signups (lower(email));

alter table public.partner_signups enable row level security;

-- No policies for anon/authenticated: only service_role bypasses RLS for inserts/selects.

comment on table public.partner_signups is 'Partner applications; writes via Next.js API using SUPABASE_SERVICE_ROLE_KEY only.';
