-- Migration: create s0_messages table for Hello TaskFlow demo
-- Prefix s0_ aisla la tabla de otras demos del bootcamp
-- RLS estricta desde la creacion (anti-patron: tabla sin RLS)

create table if not exists s0_messages (
  id uuid primary key default gen_random_uuid(),
  content text not null check (char_length(content) between 1 and 280),
  created_at timestamptz not null default now()
);

create index if not exists s0_messages_created_at_idx
  on s0_messages (created_at desc);

alter table s0_messages enable row level security;

-- Politicas: demo publico read+insert, no update/delete (mensajes son inmutables)
drop policy if exists "s0_messages_select_all" on s0_messages;
create policy "s0_messages_select_all"
  on s0_messages
  for select
  using (true);

drop policy if exists "s0_messages_insert_all" on s0_messages;
create policy "s0_messages_insert_all"
  on s0_messages
  for insert
  with check (char_length(content) between 1 and 280);
