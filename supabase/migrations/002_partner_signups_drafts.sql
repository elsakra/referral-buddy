-- Draft / Typeform-style signups: nullable fields until complete, partial unique indexes

alter table public.partner_signups
  add column if not exists is_complete boolean not null default false;

alter table public.partner_signups
  add column if not exists profile_url text;

-- Existing production rows: treat as completed signups
update public.partner_signups
set is_complete = true
where full_name is not null
  and role is not null
  and active_clients_band is not null
  and region is not null;

alter table public.partner_signups
  alter column full_name drop not null;

alter table public.partner_signups
  alter column role drop not null;

alter table public.partner_signups
  alter column active_clients_band drop not null;

alter table public.partner_signups
  alter column region drop not null;

drop index if exists partner_signups_email_lower_key;

create unique index if not exists partner_signups_email_complete_unique
  on public.partner_signups (lower(email))
  where is_complete = true;

create unique index if not exists partner_signups_email_draft_unique
  on public.partner_signups (lower(email))
  where is_complete = false;

comment on column public.partner_signups.is_complete is 'false while Typeform-style draft; true when all required fields submitted.';
comment on column public.partner_signups.profile_url is 'Optional LinkedIn or website URL from /join flow.';
