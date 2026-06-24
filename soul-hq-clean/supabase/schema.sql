-- SOUL HQ Supabase schema
-- Run this first in Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  is_admin boolean default false,
  created_at timestamptz default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, is_admin)
  values (new.id, new.email, false)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  real_name text not null,
  game_name text not null,
  instagram_id text,
  role text default 'Member',
  team text default 'Alpha',
  join_date date default current_date,
  activity_status text default 'Trial' check (activity_status in ('Active','Trial','Hold','Inactive')),
  driving_skill int default 70 check (driving_skill between 0 and 100),
  game_skill int default 70 check (game_skill between 0 and 100),
  teamwork int default 70 check (teamwork between 0 and 100),
  behavior int default 80 check (behavior between 0 and 100),
  warnings_count int default 0,
  promotion_status text default 'Trial Running' check (promotion_status in ('Trial Running','Eligible','Hold','Promoted','Demoted','Remove Review')),
  alliance_tag text default 'SYN',
  notes text,
  created_at timestamptz default now()
);

create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references public.members(id) on delete cascade,
  date date not null default current_date,
  status text not null check (status in ('IN','LATE','OUT','NO_REPLY')),
  reason text,
  points int not null default 0,
  created_at timestamptz default now()
);

create table if not exists public.warnings (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references public.members(id) on delete cascade,
  reason text not null,
  warning_level int not null default 1,
  action text not null,
  date date not null default current_date,
  created_at timestamptz default now()
);

create table if not exists public.tryouts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  game_name text not null,
  instagram_id text not null,
  active_time text,
  driving_skill int,
  game_skill int,
  message text,
  status text default 'Pending' check (status in ('Pending','Accepted','Rejected')),
  created_at timestamptz default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null,
  date date not null,
  time time,
  description text,
  status text default 'Draft' check (status in ('Draft','Planned','Live','Completed','Cancelled')),
  created_at timestamptz default now()
);

create table if not exists public.alliances (
  id uuid primary key default gen_random_uuid(),
  clan_name text not null,
  alliance_tag text default 'SYN',
  leader_instagram text,
  status text default 'Pending' check (status in ('Pending','Active','Hold','Ended')),
  notes text,
  created_at timestamptz default now()
);

create table if not exists public.content_plan (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null,
  date date,
  status text default 'Idea' check (status in ('Idea','Draft','Ready','Posted')),
  notes text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.members enable row level security;
alter table public.attendance enable row level security;
alter table public.warnings enable row level security;
alter table public.tryouts enable row level security;
alter table public.events enable row level security;
alter table public.alliances enable row level security;
alter table public.content_plan enable row level security;

-- Public read policies for public pages
drop policy if exists "Public members read" on public.members;
create policy "Public members read" on public.members for select using (true);

drop policy if exists "Public events read" on public.events;
create policy "Public events read" on public.events for select using (true);

drop policy if exists "Public alliances read" on public.alliances;
create policy "Public alliances read" on public.alliances for select using (true);

drop policy if exists "Public tryout submit" on public.tryouts;
create policy "Public tryout submit" on public.tryouts for insert with check (true);

-- Profiles
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile" on public.profiles
for select using (auth.uid() = id);

-- Admin helper
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and is_admin = true
  );
$$;

-- Admin policies
drop policy if exists "Admins manage members" on public.members;
create policy "Admins manage members" on public.members for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage attendance" on public.attendance;
create policy "Admins manage attendance" on public.attendance for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage warnings" on public.warnings;
create policy "Admins manage warnings" on public.warnings for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage tryouts" on public.tryouts;
create policy "Admins manage tryouts" on public.tryouts for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage events" on public.events;
create policy "Admins manage events" on public.events for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage alliances" on public.alliances;
create policy "Admins manage alliances" on public.alliances for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage content" on public.content_plan;
create policy "Admins manage content" on public.content_plan for all using (public.is_admin()) with check (public.is_admin());
