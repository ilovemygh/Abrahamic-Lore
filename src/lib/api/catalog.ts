import type { CharacterName } from '@/data/characters'

export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

export function normalizeCatalogText(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLocaleLowerCase()
}

export function parsePageSize(value: string | null) {
  if (value === null) return DEFAULT_PAGE_SIZE
  if (!/^\d+$/.test(value)) return null
  const size = Number(value)
  return size >= 1 && size <= MAX_PAGE_SIZE ? size : null
}

export function paginateNames<T extends Pick<CharacterName, 'slug'>>(
  items: T[],
  cursor: string | null,
  limit: number,
) {
  const ordered = [...items].sort((first, second) => first.slug.localeCompare(second.slug))
  const cursorIndex = cursor === null ? -1 : ordered.findIndex((item) => item.slug === cursor)
  if (cursor !== null && cursorIndex === -1) return null

  const start = cursorIndex + 1
  const page = ordered.slice(start, start + limit)
  const hasMore = start + page.length < ordered.length
  return {
    items: page,
    totalCount: ordered.length,
    limit,
    nextCursor: hasMore ? page.at(-1)?.slug ?? null : null,
    hasMore,
  }
}

export function apiError(code: string, message: string, status: number) {
  return Response.json({ error: { code, message } }, { status })
}
