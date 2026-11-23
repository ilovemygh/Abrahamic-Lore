export interface GitHubOrganization {
  name: string
  url: string
  repositoryUrl: string
  signature: string
  description: string
}

export interface GitHubContributor {
  username: string
  role: string
  profileUrl: string
  avatarUrl: string
}

export interface StackLayer {
  layer: string
  tech: string
}

export interface RoadmapPhase {
  phase: string
  status: 'done' | 'planned'
  scope: string
}

export const GITHUB_ORGANIZATION: GitHubOrganization = {
  name: 'ilovemygh',
  url: 'https://github.com/ilovemygh',
  repositoryUrl: 'https://github.com/ilovemygh/Abrahamic-Lore',
  signature: 'Built by yours truly... ilovemygh',
  description:
    'The GitHub organization developing and maintaining Abrahamic Lore as an open, scholarly comparative study environment.',
}

export const GITHUB_CONTRIBUTORS: GitHubContributor[] = [
  {
    username: 'jasonhukom',
    role: 'Owner & Contributor',
    profileUrl: 'https://github.com/jasonhukom',
    avatarUrl: 'https://avatars.githubusercontent.com/u/191199902?v=4',
  },
  {
    username: 'AIZATFIR',
    role: 'Owner & Contributor',
    profileUrl: 'https://github.com/AIZATFIR',
    avatarUrl: 'https://avatars.githubusercontent.com/u/113686252?v=4',
  },
]

export const ABOUT_OVERVIEW = {
  title: 'Abrahamic Lore',
  tagline: 'One environment to explore Judaism, Christianity, Islam, and the traditions they carry.',
  summary:
    'Abrahamic Lore brings together Judaism, Christianity, and Islam in a single comparative study environment—mapping shared prophetic lineages, historical timelines, canonical scriptures, and points of convergence and divergence.',
  editorialNote:
    'Designed with an objective, scholarly perspective, the platform presents each tradition on its own terms while illuminating how their narratives, covenants, and theological frameworks connect across history.',
  iconPhilosophy:
    'No emojis are used in the UI. All pictograms are custom line-art SVGs stored in public/assets/icons/ and rendered as monochromatic CSS masks via the shared <Icon /> component.',
}

export const TECH_STACK: StackLayer[] = [
  { layer: 'Frontend', tech: 'Next.js 16 + TypeScript' },
  { layer: 'Styling', tech: 'Tailwind CSS v4' },
  { layer: 'Auth (Phase 2)', tech: 'Supabase Auth' },
  { layer: 'Database (Phase 2)', tech: 'PostgreSQL via Supabase + Drizzle ORM' },
  { layer: 'Search (Phase 2)', tech: 'Meilisearch' },
]

export const PHASE_PLAN: RoadmapPhase[] = [
  {
    phase: 'Phase 1',
    status: 'done',
    scope: 'Homepage, onboarding, personalization, guest preferences',
  },
  {
    phase: 'Phase 2',
    status: 'planned',
    scope: 'Supabase Auth, user profiles, preference persistence',
  },
  {
    phase: 'Phase 3',
    status: 'planned',
    scope: 'Entity pages, compare, timeline, full reader',
  },
  {
    phase: 'Phase 4',
    status: 'planned',
    scope: 'Meilisearch integration, knowledge graph, learning journeys',
  },
]
