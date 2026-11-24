import type { Metadata } from 'next'
import Link from 'next/link'
import { COMPARISON_ENTITIES } from '@/data/abrahamic_entities'
import CompareInteractiveView from '@/components/compare/CompareInteractiveView'
import Icon from '@/components/ui/Icon'
import { CHARACTER_NAMES, getRelationshipsForComparison } from '@/data/characters'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entity = COMPARISON_ENTITIES[slug]

  if (!entity) {
    return {
      title: 'Comparison Not Found | Abrahamic Lore',
    }
  }

  return {
    title: `${entity.title} — Cross-Tradition Comparison | Abrahamic Lore`,
    description: entity.summary,
  }
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entity = COMPARISON_ENTITIES[slug]

  if (!entity) {
    // If slug is not found, provide fallback list or 404
    const available = Object.values(COMPARISON_ENTITIES)
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="text-center space-y-4">
          <Icon name="scales" className="mx-auto h-10 w-10 text-stone-500" />
          <h1 className="text-2xl font-bold text-stone-900">Comparison Not Found</h1>
          <p className="text-stone-600 max-w-md mx-auto text-sm">
            We couldn’t find an analytical comparison for &ldquo;{slug}&rdquo;. Explore our available cross-tradition studies below:
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {available.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="rounded-xl border border-stone-200 bg-white p-5 hover:border-stone-400 hover:shadow-xs transition-all"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                {c.category}
              </span>
              <h2 className="mt-1 text-sm font-semibold text-stone-900">{c.title}</h2>
              <p className="mt-2 text-xs text-stone-600 line-clamp-2">{c.summary}</p>
            </Link>
          ))}
        </div>
      </main>
    )
  }

  const allSummaries = Object.values(COMPARISON_ENTITIES).map((c) => ({
    slug: c.slug,
    title: c.title,
    category: c.category,
  }))
  const nameRelationships = getRelationshipsForComparison(slug)
  const profileLinksByTradition = Object.fromEntries(
    nameRelationships
      .flatMap((relationship) => CHARACTER_NAMES.filter((name) => relationship.nameIds.includes(name.id)))
      .map((name) => [name.tradition, { href: `/characters/${name.slug}`, name: name.name }]),
  )

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-stone-400">Comparisons</span>
        <span>/</span>
        <span className="text-stone-900 font-medium truncate max-w-xs">{entity.title}</span>
      </nav>

      {/* Header Banner */}
      <header className="border-y border-stone-300 bg-[#f4f0e9] px-5 py-7 sm:px-9 sm:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#805535]">{entity.category}</span>
          <div className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.1em] text-stone-600">
            <span className="text-blue-800">Judaism</span>
            <span className="text-rose-800">Christianity</span>
            <span className="text-emerald-800">Islam</span>
          </div>
        </div>

        <h1 className="mt-5 max-w-4xl font-serif text-4xl font-medium leading-tight tracking-tight text-stone-950 sm:text-5xl">
          {entity.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-stone-700">
          {entity.summary}
        </p>
      </header>

      {nameRelationships.map((relationship) => {
        const names = CHARACTER_NAMES.filter((name) =>
          relationship.nameIds.includes(name.id),
        )

        return (
          <section
            key={relationship.id}
            aria-labelledby={`${relationship.id}-heading`}
            className="border-y border-stone-200 py-6"
          >
            <div className="max-w-3xl">
              <h2
                id={`${relationship.id}-heading`}
                className="font-serif text-xl font-semibold text-stone-900"
              >
                {relationship.label}
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                {relationship.note}
              </p>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-3">
              {names.map((name) => (
                <li key={name.id}>
                  <Link
                    href={`/characters/${name.slug}`}
                    className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm hover:border-stone-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-700"
                  >
                    <span className="font-semibold text-stone-900">{name.name}</span>
                    <span className="text-stone-500">Profile</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-stone-500">{relationship.reviewStatus}</p>
          </section>
        )
      })}

      {/* Main Interactive Comparison View */}
      <CompareInteractiveView entity={entity} allComparisons={allSummaries} profileLinks={profileLinksByTradition} />
    </main>
  )
}
