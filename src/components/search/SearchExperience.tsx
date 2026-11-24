'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { usePreferences } from '@/hooks/usePreferences'
import { CHARACTER_NAMES } from '@/data/characters'
import { COMPARISON_ENTITIES, TOPIC_DETAILS } from '@/data/abrahamic_entities'

type SearchResult = {
  id: string
  title: string
  description: string
  type: 'character' | 'topic' | 'compare'
  slug: string
  category: string
  keywords: string[]
}

const ALL_RESULTS: SearchResult[] = [
  ...CHARACTER_NAMES.map((character) => ({
    id: character.id,
    title: character.name,
    description: character.context,
    type: 'character' as const,
    slug: character.slug,
    category: character.tradition,
    keywords: [character.context, character.summary, ...(character.searchTerms ?? []), ...character.references.flatMap((reference) => [reference.location, reference.collection])],
  })),
  ...Object.values(TOPIC_DETAILS).map((topic) => ({
    id: topic.slug,
    title: topic.title,
    description: topic.summary,
    type: 'topic' as const,
    slug: topic.slug,
    category: topic.category,
    keywords: [topic.summary, topic.category, ...topic.perspectives.flatMap((perspective) => [perspective.tradition, ...perspective.keyTexts, ...perspective.focalFigures])],
  })),
  ...Object.values(COMPARISON_ENTITIES).map((comparison) => ({
    id: comparison.slug,
    title: comparison.title,
    description: comparison.summary,
    type: 'compare' as const,
    slug: comparison.slug,
    category: comparison.category,
    keywords: [comparison.summary, ...comparison.tags, ...comparison.convergencePoints, ...comparison.divergencePoints, ...Object.values(comparison.traditions).flatMap((tradition) => [tradition.name, tradition.role, ...tradition.scriptureReferences])],
  })),
]

export default function SearchExperience({ initialQuery }: { initialQuery: string }) {
  const { prefs } = usePreferences()
  const [query, setQuery] = useState(initialQuery)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    const search = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${search ? `?${search}` : ''}`)
  }, [query])

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    if (!normalizedQuery) return []
    return ALL_RESULTS.map((result) => {
      const title = result.title.toLocaleLowerCase()
      const keywords = [result.description, ...result.keywords].join(' ').toLocaleLowerCase()
      const score = title === normalizedQuery ? 3 : title.startsWith(normalizedQuery) ? 2 : keywords.includes(normalizedQuery) || title.includes(normalizedQuery) ? 1 : 0
      return { result, score }
    })
      .filter(({ score }) => score > 0)
      .sort((first, second) => second.score - first.score || first.result.title.localeCompare(second.result.title))
      .map(({ result }) => result)
  }, [query])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar tradition={prefs.tradition} />
      <main className="flex-1 bg-[#fbfaf7]">
        <section className="border-b border-stone-200 bg-[#f4f0e9]">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#805535]">Search the collection</p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight text-stone-950 sm:text-5xl">Find a name, text, or question.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">Search profiles, source references, topics, and comparative studies.</p>
            <div className="relative mt-7 max-w-3xl">
              <label htmlFor="site-search" className="sr-only">Search by name, passage, topic, or phrase</label>
              <input
                ref={inputRef}
                id="site-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try “Musa”, “John 1:17”, or “covenant”"
                className="min-h-14 w-full border border-stone-400 bg-white px-4 pr-20 text-base text-stone-950 shadow-sm outline-none placeholder:text-stone-400 focus:border-stone-950 focus:ring-2 focus:ring-stone-200 sm:px-5"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 border border-stone-200 px-2 py-1 text-[10px] font-medium text-stone-500" aria-hidden="true">
                Ctrl / ⌘ K
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8" aria-label="Search results">
          {query && (
            <p className="mb-4 text-sm text-stone-600" aria-live="polite">
              {results.length} {results.length === 1 ? 'result' : 'results'} for <span className="font-medium text-stone-900">“{query}”</span>
            </p>
          )}

          {query && results.length === 0 && (
            <div className="border-y border-stone-300 py-8">
              <h2 className="font-serif text-2xl font-medium text-stone-900">No matching entries yet</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-stone-600">Try a shorter name, a passage reference, or a broader subject.</p>
            </div>
          )}

          {results.length > 0 && (
            <ul className="divide-y divide-stone-200 border-y border-stone-300">
              {results.map((result, index) => (
                <li key={`${result.type}-${result.id}`}>
                  <Link
                    href={result.type === 'topic'
                      ? `/topics/${result.slug}`
                      : result.type === 'character'
                        ? `/characters/${result.slug}`
                        : `/compare/${result.slug}`}
                    className="group grid min-h-24 grid-cols-[2rem_minmax(0,1fr)_auto] items-start gap-3 py-5 transition-colors hover:bg-white/70 sm:gap-5"
                  >
                    <span className="pt-1 font-serif text-sm text-stone-400">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">{result.type === 'character' ? `${result.category[0].toUpperCase()}${result.category.slice(1)} · Name profile` : result.category}</p>
                      <h2 className="mt-1 font-serif text-xl font-medium text-stone-950 group-hover:text-[#805535]">{result.title}</h2>
                      <p className="mt-1 max-w-2xl text-sm leading-6 text-stone-600">{result.description}</p>
                    </div>
                    <span className="pt-1 text-xs font-medium text-stone-600 group-hover:text-stone-950">Open</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!query && (
            <div className="grid gap-10 sm:grid-cols-[minmax(0,1fr)_minmax(16rem,0.75fr)]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">Suggested searches</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                  {['Musa', 'John 1:17', 'Covenant', 'Sacred texts'].map((suggestion) => (
                    <button key={suggestion} onClick={() => setQuery(suggestion)} className="min-h-11 text-sm text-stone-800 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-[#805535] hover:decoration-[#805535]">
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
              <Link href="/characters" className="flex min-h-20 items-center justify-between border-y border-stone-300 py-4 text-sm font-medium text-stone-900 transition-colors hover:border-stone-500">
                <span><span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">Browse directly</span><span className="mt-1 block font-serif text-lg">Names &amp; figures index</span></span>
                <span className="min-h-11 content-center text-xs font-medium text-stone-600">Open index</span>
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
