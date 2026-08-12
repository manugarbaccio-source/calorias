-- Ejecutar en Supabase: Dashboard → SQL Editor → New query → pegar esto → Run.
-- Crea las dos tablas que usa la app.

create table if not exists comidas (
  id uuid primary key default gen_random_uuid(),
  fecha date not null,
  nombre text not null,
  gramos numeric not null default 0,
  kcal numeric not null default 0,
  creado timestamptz not null default now()
);

create table if not exists alimentos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  kcal100 numeric not null,
  porcion numeric not null default 150,
  unidad text default '1 porción',
  creado timestamptz not null default now()
);

-- La app usa la clave "anon" directamente (app personal, sin login).
-- Estas políticas permiten leer/escribir con esa clave:
alter table comidas enable row level security;
alter table alimentos enable row level security;

create policy "acceso anon comidas" on comidas
  for all to anon using (true) with check (true);

create policy "acceso anon alimentos" on alimentos
  for all to anon using (true) with check (true);
