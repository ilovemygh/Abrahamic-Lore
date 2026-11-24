'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  CHARACTER_NAMES,
  NAME_RELATIONSHIPS,
  type CharacterTradition,
} from '@/data/characters'

const TRADITIONS: { value: CharacterTradition | 'all'; label: string }[] = [
  { value: 'all', label: 'All traditions' },
  { value: 'judaism', label: 'Judaism' },
  { value: 'christianity', label: 'Christianity' },
  { value: 'islam', label: 'Islam' },
]

export default function CharactersDirectory({
  initialQuery = '',
  initialTradition = 'all',
}: {
  initialQuery?: string
  initialTradition?: CharacterTradition | 'all'
}) {
  const [query, setQuery] = useState(initialQuery)
  const [tradition, setTradition] = useState<CharacterTradition | 'all'>(initialTradition)

  useEffect(() => {
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (tradition !== 'all') params.set('tradition', tradition)
    const search = params.toString()
    const nextUrl = `${window.location.pathname}${search ? `?${search}` : ''}`
    window.history.replaceState(null, '', nextUrl)
  }, [query, tradition])

  const matchingHomonym = NAME_RELATIONSHIPS.find(
    (relationship) =>
      relationship.kind === 'homonym' &&
      relationship.searchTerm?.toLocaleLowerCase() === query.trim().toLocaleLowerCase(),
  )
  const characters = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    return CHARACTER_NAMES.filter((character) => {
      const matchesQuery =
        !normalizedQuery ||
        character.name.toLocaleLowerCase().includes(normalizedQuery) ||
        character.searchTerms?.some((term) => term.toLocaleLowerCase().includes(normalizedQuery)) ||
        character.context.toLocaleLowerCase().includes(normalizedQuery)
      return matchesQuery && (tradition === 'all' || character.tradition === tradition)
    }).sort((first, second) => first.name.localeCompare(second.name))
  }, [query, tradition])

  return (
    <section aria-label="Browse names" className="border-t border-stone-300">
      <div className="grid gap-4 py-5 sm:grid-cols-[minmax(0,1fr)_14rem] sm:items-end">
        <div>
          <label htmlFor="character-search" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-600">
            Find a name
          </label>
          <input
            id="character-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type a name or spelling"
            aria-describedby="character-count"
            className="min-h-12 w-full border border-stone-400 bg-white px-3.5 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-950 focus:ring-2 focus:ring-stone-200"
          />
        </div>
        <div>
          <label htmlFor="character-tradition" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-600">
            Tradition
          </label>
          <select
            id="character-tradition"
            value={tradition}
            onChange={(event) => setTradition(event.target.value as CharacterTradition | 'all')}
            className="min-h-12 w-full border border-stone-400 bg-white px-3.5 text-sm text-stone-900 outline-none focus:border-stone-950 focus:ring-2 focus:ring-stone-200"
          >
            {TRADITIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>
      </div>

      <div className="flex min-h-14 items-center justify-between gap-4 border-y border-stone-200">
        <p id="character-count" className="text-sm text-stone-600" aria-live="polite">
          {characters.length} {characters.length === 1 ? 'profile' : 'profiles'} in this pilot set
        </p>
        {query && <button type="button" onClick={() => setQuery('')} className="min-h-11 text-sm font-medium text-stone-700 underline decoration-stone-300 underline-offset-4 hover:text-stone-950">Clear search</button>}
      </div>

      {matchingHomonym && (
        <p className="border-b border-stone-200 bg-[#f4f0e9] px-4 py-3 text-sm leading-6 text-stone-700">
          <span className="font-semibold text-stone-900">{matchingHomonym.label}.</span> Open each profile to inspect its context and references. Similar names do not automatically establish identity.
        </p>
      )}

      {characters.length > 0 ? (
        <ul className="divide-y divide-stone-200 border-b border-stone-300">
          {characters.map((character) => (
            <li key={character.id}>
              <Link href={`/characters/${character.slug}`} className="group grid min-h-24 gap-2 py-5 sm:grid-cols-[minmax(10rem,0.7fr)_minmax(0,1.3fr)_auto] sm:items-center sm:gap-6">
                <span className="font-serif text-xl font-medium text-stone-950 group-hover:text-[#805535]">{character.name}</span>
                <span className="text-sm leading-relaxed text-stone-600">{character.context}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-600">View profile</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-b border-stone-300 py-8 text-sm text-stone-600">No profiles match those filters. Clear the search or choose another tradition.</p>
      )}
    </section>
  )
}
