-- Supabase SQL Editor에서 아래 스크립트를 실행하세요.

-- 1. 방명록 테이블
create table if not exists guestbook (
  id bigint generated always as identity primary key,
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table guestbook enable row level security;

-- 누구나 읽기 가능
create policy "Allow public read access on guestbook"
  on guestbook for select
  using (true);

-- 누구나 쓰기(등록) 가능 (스팸 방지가 필요하면 추후 제한 가능)
create policy "Allow public insert access on guestbook"
  on guestbook for insert
  with check (true);

-- 2. 참석의사(RSVP) 테이블
create table if not exists rsvp (
  id bigint generated always as identity primary key,
  side text not null check (side in ('groom', 'bride')),
  name text not null,
  attendance text not null check (attendance in ('yes', 'no')),
  count int not null default 0,
  message text,
  created_at timestamptz not null default now()
);

alter table rsvp enable row level security;

-- RSVP는 개인정보 성격이 있으므로 공개 조회는 막고, 등록만 허용합니다.
create policy "Allow public insert access on rsvp"
  on rsvp for insert
  with check (true);

-- 신랑/신부만 조회하도록 하려면 Supabase 대시보드에서 별도 인증을 붙이거나
-- Table Editor에서 직접 확인하는 것을 권장합니다.
