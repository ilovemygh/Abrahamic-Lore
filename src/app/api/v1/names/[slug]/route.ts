import { CHARACTER_CONTENT_REVISION, getCharacterBySlug, getRelationshipsForCharacter } from '@/data/characters'
import { apiError, parsePageSize } from '@/lib/api/catalog'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const character = getCharacterBySlug(slug)
  if (!character) return apiError('slug_not_found', 'No name profile exists for this slug.', 404)

  const url = new URL(request.url)
  const limit = parsePageSize(url.searchParams.get('referenceLimit'))
  if (limit === null) return apiError('invalid_limit', 'Reference limit must be an integer from 1 to 100.', 400)

  const orderedReferences = [...character.references].sort((first, second) => first.location.localeCompare(second.location))
  const cursor = url.searchParams.get('referenceCursor')
  const cursorIndex = cursor === null ? -1 : orderedReferences.findIndex((reference) => reference.location === cursor)
  if (cursor !== null && cursorIndex === -1) return apiError('invalid_cursor', 'Reference cursor is not present in this profile.', 400)

  const start = cursorIndex + 1
  const references = orderedReferences.slice(start, start + limit)
  const hasMore = start + references.length < orderedReferences.length
  const relationships = getRelationshipsForCharacter(character.id)

  return Response.json({
    data: {
      id: character.id,
      slug: character.slug,
      name: character.name,
      searchTerms: character.searchTerms ?? [],
      tradition: character.tradition,
      context: character.context,
      summary: character.summary,
      referenceNote: character.referenceNote,
      editorialStatus: character.editorialStatus,
      editorialNote: character.editorialNote,
      references: {
        items: references,
        totalCount: orderedReferences.length,
        limit,
        nextCursor: hasMore ? references.at(-1)?.location ?? null : null,
        hasMore,
      },
      relationships,
      revision: CHARACTER_CONTENT_REVISION,
    },
  })
}
