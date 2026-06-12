-- ============================================================
--  KEMISSE INVESTMENT PORTAL — Supabase SQL Schema
--  Run this in Supabase SQL Editor
-- ============================================================

-- ── Extensions ──────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── EMPLOYEES ───────────────────────────────────────────────
create table if not exists public.employees (
  id              uuid primary key default uuid_generate_v4(),
  name            text,
  name_en         text,
  position_am     text,
  position_en     text,
  dept_am         text,
  dept_en         text,
  dept_slug       text,
  department_slug text,
  phone           text,
  email           text,
  office          text,
  office_number   text,
  photo           text,
  bio_am          text,
  bio_en          text,
  responsibilities_am text[],
  responsibilities_en text[],
  display_order   integer default 0,
  status          text default 'active' check (status in ('active','inactive')),
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ── DEPARTMENTS ─────────────────────────────────────────────
create table if not exists public.departments (
  id              uuid primary key default uuid_generate_v4(),
  name_am         text,
  name_en         text,
  name_om         text,
  description_am  text,
  description_en  text,
  description_om  text,
  slug            text unique,
  phone           text,
  email           text,
  display_order   integer default 0,
  status          text default 'active' check (status in ('active','inactive')),
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ── NEWS ────────────────────────────────────────────────────
create table if not exists public.news (
  id              uuid primary key default uuid_generate_v4(),
  title_am        text,
  title_en        text,
  title_om        text,
  excerpt_am      text,
  excerpt_en      text,
  excerpt_om      text,
  content_am      text,
  content_en      text,
  content_om      text,
  featured_image  text,
  category        text default 'news' check (category in ('news','announcement','tender','event')),
  is_published    boolean default false,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ── DOCUMENTS ───────────────────────────────────────────────
create table if not exists public.documents (
  id              uuid primary key default uuid_generate_v4(),
  title_am        text,
  title_en        text,
  title_om        text,
  desc_am         text,
  desc_en         text,
  category        text default 'forms' check (category in ('forms','guidelines','policies','directives','reports')),
  file_url        text,
  downloads       integer default 0,
  display_order   integer default 0,
  status          text default 'active' check (status in ('active','inactive')),
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ── GALLERY ─────────────────────────────────────────────────
create table if not exists public.gallery (
  id              uuid primary key default uuid_generate_v4(),
  image_url       text not null,
  title           text,
  description     text,
  category        text default 'office' check (category in ('office','events','projects','investment')),
  status          text default 'active' check (status in ('active','inactive')),
  created_at      timestamptz default now()
);

-- ── ANNOUNCEMENTS ───────────────────────────────────────────
create table if not exists public.announcements (
  id              uuid primary key default uuid_generate_v4(),
  text_am         text,
  text_en         text,
  text_om         text,
  is_active       boolean default false,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ── CONTACT MESSAGES ────────────────────────────────────────
create table if not exists public.contact_messages (
  id              uuid primary key default uuid_generate_v4(),
  name            text,
  email           text,
  phone           text,
  subject         text,
  message         text,
  lang            text default 'am',
  is_read         boolean default false,
  created_at      timestamptz default now()
);

-- ── VISITOR COUNTER ─────────────────────────────────────────
create table if not exists public.visitor_counter (
  id              integer primary key default 1,
  count           bigint default 0,
  updated_at      timestamptz default now()
);
insert into public.visitor_counter (id, count) values (1, 0) on conflict do nothing;

-- ── SETTINGS ────────────────────────────────────────────────
create table if not exists public.settings (
  key             text primary key,
  value           text,
  updated_at      timestamptz default now()
);
insert into public.settings (key, value) values
  ('site_name_am', 'ከሚሴ ከተማ አስተዳደር ኢንዱስትሪና ኢንቨስትመንት ጽ/ቤት'),
  ('site_name_en', 'Kemisse Town Administration Industry and Investment Office'),
  ('phone', '+251 033 XXX XXXX'),
  ('email', 'info@kemisseinvestment.gov.et'),
  ('address_am', 'ከሚሴ ከተማ፣ ኦሮሚያ ዞን፣ አማራ ክልል፣ ኢትዮጵያ'),
  ('address_en', 'Kemisse Town, Oromia Zone, Amhara Region, Ethiopia')
on conflict do nothing;

-- ============================================================
--  ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
alter table public.employees        enable row level security;
alter table public.departments      enable row level security;
alter table public.news             enable row level security;
alter table public.documents        enable row level security;
alter table public.gallery          enable row level security;
alter table public.announcements    enable row level security;
alter table public.contact_messages enable row level security;
alter table public.visitor_counter  enable row level security;
alter table public.settings         enable row level security;

-- ── Public READ policies (anon can read active/published records) ──

create policy "Public can read active employees"
  on public.employees for select
  using (status = 'active');

create policy "Public can read active departments"
  on public.departments for select
  using (status = 'active');

create policy "Public can read published news"
  on public.news for select
  using (is_published = true);

create policy "Public can read active documents"
  on public.documents for select
  using (status = 'active');

create policy "Public can read active gallery"
  on public.gallery for select
  using (status = 'active');

create policy "Public can read active announcements"
  on public.announcements for select
  using (is_active = true);

create policy "Public can read visitor counter"
  on public.visitor_counter for select
  using (true);

create policy "Public can read settings"
  on public.settings for select
  using (true);

-- ── Public can update document download count ──
create policy "Public can update download count"
  on public.documents for update
  using (true)
  with check (true);

-- ── Public can insert contact messages ──
create policy "Public can submit contact messages"
  on public.contact_messages for insert
  with check (true);

-- ── Authenticated (admin) full access ──
create policy "Admins have full access to employees"
  on public.employees for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admins have full access to departments"
  on public.departments for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admins have full access to news"
  on public.news for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admins have full access to documents"
  on public.documents for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admins have full access to gallery"
  on public.gallery for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admins have full access to announcements"
  on public.announcements for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admins can read contact messages"
  on public.contact_messages for select
  using (auth.role() = 'authenticated');

create policy "Admins can update contact messages"
  on public.contact_messages for update
  using (auth.role() = 'authenticated');

create policy "Admins can update settings"
  on public.settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
--  SAMPLE DATA (optional — delete if not needed)
-- ============================================================

insert into public.departments (name_am, name_en, name_om, slug, display_order) values
  ('የኢንቨስትመንት ፕሮሞሽን', 'Investment Promotion',  'Babal''ina Invastimantii', 'investment-promotion', 1),
  ('የኢንዱስትሪ ልማት',     'Industry Development',   'Guddina Industirii',       'industry-development',  2),
  ('ፋይናንስ',            'Finance',                'Faayinaansii',             'finance',               3),
  ('ሰው ኃይል',           'Human Resource',         'Humna Namaa',              'human-resource',        4),
  ('ዕቅድ እና ክትትል',      'Planning & Monitoring',  'Karoora fi Hordoffii',     'planning-monitoring',   5),
  ('ንግድ',              'Trade',                  'Daldalaa',                 'trade',                 6)
on conflict do nothing;

insert into public.announcements (text_am, text_en, text_om, is_active) values
  ('አዲስ የኢንቨስትመንት ምዝገባ መምሪያ ታትሟል — ለበለጠ መረጃ ጽ/ቤቱን ያግኙ',
   'New Investment Registration Guideline Published — Contact the office for more information',
   'Qajeelcha Galmee Invastimantii Haaraan Ba''e — Odeeffannoo dabalataa argachuuf biiroo nu qunnamaa',
   true)
on conflict do nothing;
