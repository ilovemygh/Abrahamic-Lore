import SearchExperience from '@/components/search/SearchExperience'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>
}) {
  const { q } = await searchParams
  const initialQuery = Array.isArray(q) ? q[0] ?? '' : q ?? ''
  return <SearchExperience initialQuery={initialQuery} />
}
