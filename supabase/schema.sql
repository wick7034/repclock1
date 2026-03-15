-- Run this in Supabase SQL Editor (Dashboard → SQL Editor) to create tables and policies.

-- Table: completed sessions (global feed + leaderboard source)
create table if not exists public.completed_sessions (
  id uuid primary key default gen_random_uuid(),
  display_name text,
  type text not null check (type in ('pushup', 'pullup')),
  total_reps int not null,
  completed_minutes int not null,
  week_number int not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_completed_sessions_created_at
  on public.completed_sessions (created_at desc);

-- RLS: allow anyone to insert and read (for anonymous app use)
alter table public.completed_sessions enable row level security;

drop policy if exists "Allow insert completed_sessions" on public.completed_sessions;
create policy "Allow insert completed_sessions"
  on public.completed_sessions for insert with check (true);

drop policy if exists "Allow read completed_sessions" on public.completed_sessions;
create policy "Allow read completed_sessions"
  on public.completed_sessions for select using (true);

-- View: leaderboard (aggregate by display_name)
create or replace view public.leaderboard as
select
  coalesce(display_name, 'Anonymous') as display_name,
  sum(total_reps) as total_reps,
  count(*) as total_sessions
from public.completed_sessions
group by display_name;

-- Allow public read on view (view uses underlying table RLS; for views we grant usage)
grant select on public.leaderboard to anon;
