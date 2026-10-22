-- ============================================================
--  X-HEC Impact : tables du site
--    · inscriptions : inscriptions aux événements
--    · messages     : messages du formulaire de contact
--  À exécuter dans Supabase : SQL Editor → New query → Run.
--  Le script peut être relancé sans risque : il ne recrée pas ce qui existe déjà.
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


-- ============================================================
--  Messages du formulaire de contact (page Contact)
-- ============================================================

create table if not exists public.messages (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  sujet         text not null,          -- table-ronde, sponsoring-lex, hackathon ou autre
  nom           text not null,
  email         text not null,          -- enregistré en minuscules par le site
  organisation  text,                   -- facultatif
  message       text not null,
  consentement  boolean not null,       -- case RGPD cochée
  traite        boolean not null default false,  -- à cocher à la main quand le message a reçu une réponse

  -- Les sujets du formulaire (voir `sujetsContact` dans src/content/site.ts).
  constraint messages_sujet_valide check (sujet in ('table-ronde', 'sponsoring-lex', 'hackathon', 'autre')),
  -- Impossible d'enregistrer un message sans consentement.
  constraint messages_consentement_obligatoire check (consentement)
);

create index if not exists messages_created_at_idx on public.messages (created_at desc);

-- Même sécurité que les inscriptions : RLS activé et AUCUNE policy publique.
-- Seul le serveur du site écrit, avec la clé secrète (service_role).
alter table public.messages enable row level security;

-- Pour lire les messages non traités (Table Editor ou SQL Editor) :
--   select created_at, sujet, nom, email, organisation, message
--   from public.messages
--   where not traite
--   order by created_at desc;
