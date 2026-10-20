-- ============================================================
--  X-HEC Impact : table des inscriptions aux événements
--  À exécuter une fois dans Supabase : SQL Editor → New query → Run.
-- ============================================================

create table if not exists public.inscriptions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  event_slug    text not null,          -- identifiant de l'événement (slug dans src/content/site.ts)
  prenom        text not null,
  nom           text not null,
  email         text not null,          -- enregistré en minuscules par le site
  ecole         text not null,          -- école ou organisation
  motivation    text,                   -- facultatif
  consentement  boolean not null,       -- case RGPD cochée

  -- Une seule inscription par adresse e-mail et par événement.
  constraint inscriptions_event_email_unique unique (event_slug, email),
  -- Impossible d'enregistrer une inscription sans consentement.
  constraint inscriptions_consentement_obligatoire check (consentement)
);

create index if not exists inscriptions_event_slug_idx on public.inscriptions (event_slug);

-- Sécurité : RLS activé et AUCUNE policy publique.
-- Personne ne peut lire ni écrire avec la clé publique (anon) ;
-- seul le serveur du site écrit, avec la clé secrète (service_role).
alter table public.inscriptions enable row level security;

-- Pour exporter les inscriptions d'un événement (Table Editor ou SQL Editor) :
--   select prenom, nom, email, ecole, motivation, created_at
--   from public.inscriptions
--   where event_slug = 'lex-europe'
--   order by created_at;
