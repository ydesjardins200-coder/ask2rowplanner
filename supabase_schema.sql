-- Run this in Supabase > SQL Editor (paste the whole file, click Run).
-- Model: EVERYONE with the site can READ the plan. Only someone holding the
-- leadership WRITE KEY can change it. The write key is never shipped to the
-- browser and is never stored in this repo -- it lives only as a hash in the DB.

create extension if not exists pgcrypto;

-- Single shared "plan" document the whole alliance reads.
create table if not exists public.plan (
  id text primary key,
  data jsonb not null default '{}',
  updated_at timestamptz not null default now()
);
insert into public.plan (id, data) values ('btx', '{}')
on conflict (id) do nothing;

-- Secret store. Holds only a bcrypt HASH of the leadership write key.
-- No RLS policy is created for it, so the anon key can never read or write it.
create table if not exists public.app_secret (
  id text primary key,
  secret_hash text not null
);

-- ---- Row Level Security -------------------------------------------------
alter table public.plan       enable row level security;
alter table public.app_secret enable row level security;

-- plan: anyone with the anon key may READ. No direct INSERT/UPDATE policy,
-- so the anon key CANNOT write the table directly -- writes only go through
-- save_plan() below, which checks the key.
drop policy if exists "plan read"        on public.plan;
drop policy if exists "alliance read"    on public.plan;   -- from old schema
drop policy if exists "alliance write"   on public.plan;   -- from old schema
drop policy if exists "alliance update"  on public.plan;   -- from old schema
create policy "plan read" on public.plan for select using (true);
-- (app_secret intentionally has NO policies -> anon has zero access.)

-- ---- Write path: leadership-key-gated function --------------------------
-- SECURITY DEFINER runs as the function owner, bypassing RLS, so it can write
-- plan and read app_secret even though the anon key cannot. It refuses unless
-- the supplied key matches the stored hash.
create or replace function public.save_plan(p_id text, p_data jsonb, p_secret text)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
declare stored text;
begin
  select secret_hash into stored from public.app_secret where id = 'btx';
  if stored is null then
    -- No key set yet: refuse writes until an owner runs set_plan_secret().
    return false;
  end if;
  if crypt(coalesce(p_secret,''), stored) <> stored then
    return false;                          -- wrong key -> no write
  end if;
  insert into public.plan (id, data, updated_at)
    values (p_id, p_data, now())
    on conflict (id) do update set data = excluded.data, updated_at = now();
  return true;
end;
$$;

-- Only the anon role needs to call save_plan (from the app). Lock it down.
revoke all on function public.save_plan(text, jsonb, text) from public;
grant execute on function public.save_plan(text, jsonb, text) to anon, authenticated;

-- ---- One-time: set / change the leadership write key --------------------
-- Run this ONCE in the SQL Editor (which runs as the owner, not anon):
--     select public.set_plan_secret('YOUR-LEADERSHIP-WRITE-KEY');
-- Re-run any time to rotate the key. This function is NOT granted to anon,
-- so members can never reset the key from the browser.
create or replace function public.set_plan_secret(p_secret text)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  insert into public.app_secret (id, secret_hash)
    values ('btx', crypt(p_secret, gen_salt('bf', 12)))
    on conflict (id) do update set secret_hash = excluded.secret_hash;
end;
$$;
revoke all on function public.set_plan_secret(text) from public;
-- (No grant to anon: only the SQL Editor / service role can run it.)

-- ---- Realtime so everyone sees live updates on read ---------------------
-- Idempotent: only add the table if it isn't already in the publication,
-- so re-running this whole file never errors.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'plan'
  ) then
    alter publication supabase_realtime add table public.plan;
  end if;
end $$;
