import { CHARACTER_NAMES, NAME_RELATIONSHIPS } from '@/data/characters'
import { COMPARISON_ENTITIES, TOPIC_DETAILS } from '@/data/abrahamic_entities'
import { normalizeCatalogText } from '@/lib/api/catalog'

type SearchItem = {
  type: 'name' | 'topic' | 'comparison'
  slug: string
  title: string
  summary: string
  keywords: string[]
}

const ITEMS: SearchItem[] = [
  ...CHARACTER_NAMES.map((character) => ({
    type: 'name' as const,
    slug: character.slug,
    title: character.name,
    summary: character.summary,
    keywords: [character.context, ...(character.searchTerms ?? []), ...character.references.map((reference) => reference.location)],
  })),
  ...Object.values(TOPIC_DETAILS).map((topic) => ({
    type: 'topic' as const,
    slug: topic.slug,
    title: topic.title,
    summary: topic.summary,
    keywords: [topic.category, ...topic.perspectives.flatMap((perspective) => [...perspective.keyTexts, ...perspective.focalFigures])],
  })),
  ...Object.values(COMPARISON_ENTITIES).map((comparison) => ({
    type: 'comparison' as const,
    slug: comparison.slug,
    title: comparison.title,
    summary: comparison.summary,
    keywords: [...comparison.tags, ...Object.values(comparison.traditions).flatMap((tradition) => [tradition.name, ...tradition.scriptureReferences])],
  })),
]

export function GET(request: Request) {
  const rawQuery = new URL(request.url).searchParams.get('q') ?? ''
  const query = normalizeCatalogText(rawQuery)
  if (!query) return Response.json({ data: [], meta: { query: rawQuery, totalCount: 0 } })

  const exactNameTerms = new Set(
    CHARACTER_NAMES.flatMap((character) => [character.name, ...(character.searchTerms ?? [])]).map(normalizeCatalogText),
  )
  const ambiguousSearch = NAME_RELATIONSHIPS.some(
    (relationship) => relationship.searchTerm && normalizeCatalogText(relationship.searchTerm) === query,
  )

  const results = ITEMS.map((item) => {
    const title = normalizeCatalogText(item.title)
    const keywords = [item.summary, ...item.keywords].map(normalizeCatalogText)
    const score = title === query || item.type === 'name' && exactNameTerms.has(query) && item.keywords.some((term) => normalizeCatalogText(term) === query)
      ? 3
      : title.startsWith(query) ? 2
        : keywords.some((keyword) => keyword.includes(query)) || title.includes(query) ? 1 : 0
    return { item, score }
  }).filter(({ score }) => score > 0)
    .sort((first, second) => second.score - first.score || first.item.title.localeCompare(second.item.title))

  const candidates = results.map(({ item }) => ({
    type: item.type,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
  }))
  const status = ambiguousSearch || candidates.filter((candidate) => candidate.type === 'name').length > 1
    ? 'ambiguous'
    : candidates.length > 0 ? 'results' : 'not_found'

  return Response.json({ data: candidates, meta: { query: rawQuery, totalCount: candidates.length, status } })
}
