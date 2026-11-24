import { CHARACTER_NAMES, type CharacterTradition } from '@/data/characters'
import { apiError, normalizeCatalogText, paginateNames, parsePageSize } from '@/lib/api/catalog'

const TRADITIONS: CharacterTradition[] = ['judaism', 'christianity', 'islam']

export function GET(request: Request) {
  const url = new URL(request.url)
  const limit = parsePageSize(url.searchParams.get('limit'))
  if (limit === null) return apiError('invalid_limit', 'Limit must be an integer from 1 to 100.', 400)

  const traditionParam = url.searchParams.get('tradition')
  if (traditionParam && !TRADITIONS.includes(traditionParam as CharacterTradition)) {
    return apiError('invalid_tradition', 'Tradition must be judaism, christianity, or islam.', 400)
  }

  const query = normalizeCatalogText(url.searchParams.get('q') ?? '')
  const tradition = traditionParam as CharacterTradition | null
  const filtered = CHARACTER_NAMES.filter((character) => {
    const matchesTradition = !tradition || character.tradition === tradition
    const haystack = [
      character.name,
      character.context,
      character.summary,
      ...(character.searchTerms ?? []),
      ...character.references.flatMap((reference) => [reference.location, reference.collection]),
    ].map(normalizeCatalogText)
    return matchesTradition && (!query || haystack.some((value) => value.includes(query)))
  })
  const page = paginateNames(filtered, url.searchParams.get('cursor'), limit)
  if (!page) return apiError('invalid_cursor', 'Cursor is not present in this result set.', 400)

  return Response.json({
    data: page.items.map((character) => ({
      id: character.id,
      slug: character.slug,
      name: character.name,
      tradition: character.tradition,
      context: character.context,
      summary: character.summary,
      editorialStatus: character.editorialStatus,
    })),
    meta: {
      query: url.searchParams.get('q') ?? '',
      tradition,
      totalCount: page.totalCount,
      limit: page.limit,
      nextCursor: page.nextCursor,
      hasMore: page.hasMore,
      contentRevision: 1,
    },
  })
}
