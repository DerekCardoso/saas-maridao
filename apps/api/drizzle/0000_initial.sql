create extension if not exists postgis;
create extension if not exists pgcrypto;

create type app_role as enum ('client', 'provider', 'admin', 'super_admin');
create type provider_status as enum ('draft', 'pending', 'approved', 'rejected', 'suspended');
create type appointment_status as enum ('pending', 'confirmed', 'completed', 'cancelled');
create type review_status as enum ('visible', 'flagged', 'hidden');
create type subscription_status as enum ('inactive', 'trialing', 'active', 'past_due', 'cancelled');
create type notification_type as enum (
  'appointment_created',
  'appointment_updated',
  'provider_approved',
  'provider_rejected',
  'review_received',
  'subscription_updated'
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role app_role not null,
  name text not null,
  email text not null unique,
  phone text,
  avatar_url text,
  is_blocked boolean not null default false,
  last_active_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table client_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table provider_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references profiles(id) on delete cascade,
  display_name text not null,
  whatsapp text not null,
  bio text,
  base_price_cents integer check (base_price_cents is null or base_price_cents >= 0),
  cep text not null,
  street text,
  number text,
  neighborhood text,
  city text not null,
  state char(2) not null,
  location geography(Point, 4326) not null,
  work_radius_km integer not null default 20 check (work_radius_km between 1 and 100),
  rating numeric(3,2) not null default 0 check (rating between 0 and 5),
  review_count integer not null default 0 check (review_count >= 0),
  status provider_status not null default 'draft',
  moderation_reason text,
  is_premium boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index provider_profiles_status_premium_idx
  on provider_profiles(status, is_premium desc, rating desc);
create index provider_profiles_city_state_idx on provider_profiles(city, state);
create index provider_profiles_location_gist_idx on provider_profiles using gist(location);

create table service_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table provider_category_links (
  provider_id uuid not null references provider_profiles(id) on delete cascade,
  category_id uuid not null references service_categories(id) on delete restrict,
  primary key(provider_id, category_id)
);

create table provider_services (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references provider_profiles(id) on delete cascade,
  category_id uuid not null references service_categories(id) on delete restrict,
  title text not null,
  base_price_cents integer check (base_price_cents is null or base_price_cents >= 0),
  created_at timestamptz not null default now(),
  unique(provider_id, category_id, title)
);

create table weekly_availability (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references provider_profiles(id) on delete cascade,
  weekday integer not null check (weekday between 0 and 6),
  start_time text not null,
  end_time text not null,
  created_at timestamptz not null default now(),
  check (start_time < end_time),
  unique(provider_id, weekday, start_time)
);

create table availability_blocks (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references provider_profiles(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  reason text,
  created_at timestamptz not null default now(),
  check (starts_at < ends_at)
);
create index availability_blocks_provider_starts_idx
  on availability_blocks(provider_id, starts_at);

create table appointments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references client_profiles(id) on delete cascade,
  provider_id uuid not null references provider_profiles(id) on delete cascade,
  service_category_id uuid not null references service_categories(id) on delete restrict,
  scheduled_for timestamptz not null,
  status appointment_status not null default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(provider_id, scheduled_for)
);
create index appointments_client_date_idx on appointments(client_id, scheduled_for desc);
create index appointments_provider_date_idx on appointments(provider_id, scheduled_for desc);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null unique references appointments(id) on delete cascade,
  client_id uuid not null references client_profiles(id) on delete cascade,
  provider_id uuid not null references provider_profiles(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  status review_status not null default 'visible',
  moderation_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index reviews_provider_date_idx on reviews(provider_id, created_at desc);

create table review_reports (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references reviews(id) on delete cascade,
  reporter_user_id uuid not null references profiles(id) on delete cascade,
  reason text not null,
  created_at timestamptz not null default now(),
  unique(review_id, reporter_user_id)
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null unique references provider_profiles(id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  status subscription_status not null default 'inactive',
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  override_enabled boolean not null default false,
  override_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table stripe_events (
  id text primary key,
  type text not null,
  processed_at timestamptz not null default now()
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  type notification_type not null,
  title text not null,
  body text not null,
  data jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index notifications_user_read_idx on notifications(user_id, read_at, created_at desc);

create table analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  name text not null,
  provider_id uuid references provider_profiles(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index analytics_events_name_date_idx on analytics_events(name, created_at desc);

create table admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references profiles(id) on delete set null,
  action text not null,
  target_table text not null,
  target_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table client_profiles enable row level security;
alter table provider_profiles enable row level security;
alter table provider_services enable row level security;
alter table provider_category_links enable row level security;
alter table appointments enable row level security;
alter table reviews enable row level security;
alter table subscriptions enable row level security;
alter table admin_audit_logs enable row level security;

revoke all on all tables in schema public from anon, authenticated;
grant select on service_categories to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'provider-avatars',
  'provider-avatars',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy "provider avatar public read"
on storage.objects for select
using (bucket_id = 'provider-avatars');

create policy "provider owns avatar path"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'provider-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "provider updates own avatar"
on storage.objects for update to authenticated
using (
  bucket_id = 'provider-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "provider deletes own avatar"
on storage.objects for delete to authenticated
using (
  bucket_id = 'provider-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  requested_role app_role;
begin
  requested_role := case
    when new.raw_user_meta_data->>'role' = 'provider' then 'provider'::app_role
    else 'client'::app_role
  end;

  insert into profiles (id, role, name, email, phone)
  values (
    new.id,
    requested_role,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    new.raw_user_meta_data->>'phone'
  )
  on conflict (id) do nothing;

  if requested_role = 'client' then
    insert into client_profiles (user_id) values (new.id)
    on conflict (user_id) do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_auth_user();
