import { CHARACTER_NAMES } from '@/data/characters'
import { normalizeCatalogText } from '@/lib/api/catalog'

export function GET(request: Request) {
  const rawName = new URL(request.url).searchParams.get('name') ?? ''
  const query = normalizeCatalogText(rawName)
  if (!query) {
    return Response.json({ error: { code: 'missing_name', message: 'Provide a name to resolve.' } }, { status: 400 })
  }

  const candidates = CHARACTER_NAMES.filter((character) =>
    [character.name, ...(character.searchTerms ?? [])]
      .map(normalizeCatalogText)
      .includes(query),
  ).map((character) => ({
    id: character.id,
    slug: character.slug,
    name: character.name,
    tradition: character.tradition,
    context: character.context,
    editorialStatus: character.editorialStatus,
  }))

  const status = candidates.length > 1 ? 'ambiguous' : candidates.length === 1 ? 'resolved' : 'not_found'
  return Response.json({ data: candidates, meta: { query: rawName, status } })
}
