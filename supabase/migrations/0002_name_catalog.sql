-- Editorial catalogue schema for the Names & Figures expansion.
-- Pilot content remains statically seeded until the source and edition inventory is approved.

create table if not exists public.catalog_sources (
  id uuid primary key default gen_random_uuid(),
  source_key text unique,
  title text not null,
  author text,
  publisher text,
  publication_year integer,
  edition_label text,
  source_url text,
  source_kind text not null check (source_kind in ('scripture', 'translation', 'commentary', 'secondary', 'project_material')),
  rights_status text not null default 'not_assessed' check (rights_status in ('public_domain', 'licensed', 'link_only', 'not_assessed', 'restricted')),
  rights_note text,
  upstream_version text,
  upstream_record_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source_key, upstream_record_id)
);

create table if not exists public.name_entities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  display_name text not null,
  context text not null,
  tradition text not null check (tradition in ('judaism', 'christianity', 'islam')),
  summary text not null default '',
  editorial_status text not null default 'draft' check (editorial_status in ('draft', 'review_required', 'reviewed', 'published', 'withdrawn')),
  revision integer not null default 1 check (revision > 0),
  upstream_source_id uuid references public.catalog_sources(id) on delete set null,
  upstream_record_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (upstream_source_id, upstream_record_id)
);

create table if not exists public.name_forms (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references public.name_entities(id) on delete cascade,
  form text not null,
  language_code text,
  script_code text,
  transliteration text,
  transliteration_system text,
  form_kind text not null check (form_kind in ('preferred', 'historical', 'transliteration', 'search_only', 'variant')),
  editorial_status text not null default 'review_required' check (editorial_status in ('draft', 'review_required', 'reviewed', 'published', 'withdrawn')),
  source_id uuid references public.catalog_sources(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.scripture_editions (
  id uuid primary key default gen_random_uuid(),
  tradition text not null check (tradition in ('judaism', 'christianity', 'islam')),
  corpus text not null,
  collection_name text not null,
  edition_name text not null,
  language_code text,
  version_label text,
  source_url text,
  rights_status text not null default 'not_assessed' check (rights_status in ('public_domain', 'licensed', 'link_only', 'not_assessed', 'restricted')),
  rights_note text,
  source_id uuid references public.catalog_sources(id) on delete set null,
  editorial_status text not null default 'review_required' check (editorial_status in ('draft', 'review_required', 'reviewed', 'published', 'withdrawn')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tradition, corpus, collection_name, edition_name, language_code, version_label)
);

create table if not exists public.scripture_references (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references public.name_entities(id) on delete cascade,
  edition_id uuid references public.scripture_editions(id) on delete set null,
  source_id uuid references public.catalog_sources(id) on delete set null,
  location text not null,
  book_key text,
  chapter integer,
  verse_start integer,
  verse_end integer,
  evidence_kind text not null check (evidence_kind in ('named', 'identified', 'interpretive', 'context')),
  edition_note text not null default '',
  editorial_status text not null default 'review_required' check (editorial_status in ('draft', 'review_required', 'reviewed', 'published', 'withdrawn')),
  upstream_source_id uuid references public.catalog_sources(id) on delete set null,
  upstream_record_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (upstream_source_id, upstream_record_id)
);

create table if not exists public.editorial_claims (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references public.name_entities(id) on delete cascade,
  claim_type text not null check (claim_type in ('identification', 'biography', 'event', 'interpretation', 'frequency', 'genealogy')),
  claim_text text not null,
  tradition text check (tradition in ('judaism', 'christianity', 'islam')),
  attribution text not null,
  source_id uuid references public.catalog_sources(id) on delete set null,
  reference_id uuid references public.scripture_references(id) on delete set null,
  editorial_status text not null default 'review_required' check (editorial_status in ('draft', 'review_required', 'reviewed', 'published', 'withdrawn')),
  revision integer not null default 1 check (revision > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.name_relationships (
  id uuid primary key default gen_random_uuid(),
  source_entity_id uuid not null references public.name_entities(id) on delete cascade,
  target_entity_id uuid not null references public.name_entities(id) on delete cascade,
  relationship_kind text not null check (relationship_kind in ('same_person_claim', 'related_name', 'homonym', 'genealogy', 'comparison_group')),
  claim_text text not null,
  attribution text not null,
  source_id uuid references public.catalog_sources(id) on delete set null,
  reference_id uuid references public.scripture_references(id) on delete set null,
  editorial_status text not null default 'review_required' check (editorial_status in ('draft', 'review_required', 'reviewed', 'published', 'withdrawn')),
  revision integer not null default 1 check (revision > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (source_entity_id <> target_entity_id)
);

create table if not exists public.article_mentions (
  id uuid primary key default gen_random_uuid(),
  content_path text not null,
  content_revision integer not null default 1 check (content_revision > 0),
  block_key text,
  surface_text text not null,
  normalized_text text not null,
  start_offset integer,
  end_offset integer,
  candidate_entity_id uuid references public.name_entities(id) on delete set null,
  resolution_status text not null default 'unresolved' check (resolution_status in ('unresolved', 'resolved', 'ambiguous', 'editor_review', 'ignored')),
  source_id uuid references public.catalog_sources(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (start_offset is null or start_offset >= 0),
  check (end_offset is null or end_offset >= start_offset)
);

create table if not exists public.catalog_import_batches (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.catalog_sources(id) on delete restrict,
  upstream_version text not null,
  source_fingerprint text not null,
  import_status text not null default 'staged' check (import_status in ('staged', 'validating', 'review_required', 'published', 'failed', 'withdrawn')),
  records_seen integer not null default 0 check (records_seen >= 0),
  records_created integer not null default 0 check (records_created >= 0),
  records_updated integer not null default 0 check (records_updated >= 0),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  error_summary text,
  unique (source_id, source_fingerprint)
);

create index if not exists name_entities_public_lookup_idx
  on public.name_entities (editorial_status, tradition, slug);
create index if not exists name_forms_entity_lookup_idx
  on public.name_forms (entity_id, editorial_status, form);
create index if not exists scripture_references_entity_lookup_idx
  on public.scripture_references (entity_id, editorial_status, location);
create index if not exists editorial_claims_entity_lookup_idx
  on public.editorial_claims (entity_id, editorial_status, claim_type);
create index if not exists name_relationships_source_lookup_idx
  on public.name_relationships (source_entity_id, editorial_status, relationship_kind);
create index if not exists name_relationships_target_lookup_idx
  on public.name_relationships (target_entity_id, editorial_status, relationship_kind);
create index if not exists article_mentions_lookup_idx
  on public.article_mentions (content_path, content_revision, resolution_status);
create index if not exists catalog_import_source_version_idx
  on public.catalog_import_batches (source_id, upstream_version);

alter table public.catalog_sources enable row level security;
alter table public.name_entities enable row level security;
alter table public.name_forms enable row level security;
alter table public.scripture_editions enable row level security;
alter table public.scripture_references enable row level security;
alter table public.editorial_claims enable row level security;
alter table public.name_relationships enable row level security;
alter table public.article_mentions enable row level security;
alter table public.catalog_import_batches enable row level security;
