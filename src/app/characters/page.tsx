import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CharactersDirectory from '@/components/characters/CharactersDirectory'
import type { CharacterTradition } from '@/data/characters'

export const metadata: Metadata = {
  title: 'Names & Figures | Abrahamic Lore',
  description: 'Browse distinct name profiles and their scripture references across Abrahamic traditions.',
  robots: { index: false, follow: false },
}

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; tradition?: string | string[] }>
}) {
  const params = await searchParams
  const initialQuery = Array.isArray(params.q) ? params.q[0] ?? '' : params.q ?? ''
  const requestedTradition = Array.isArray(params.tradition) ? params.tradition[0] : params.tradition
  const validTraditions: Array<CharacterTradition | 'all'> = ['all', 'judaism', 'christianity', 'islam']
  const initialTradition = validTraditions.includes(requestedTradition as CharacterTradition | 'all')
    ? requestedTradition as CharacterTradition | 'all'
    : 'all'

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfaf7]">
      <Navbar tradition={null} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-stone-500">
          <Link className="underline underline-offset-4 hover:text-stone-900" href="/">Home</Link>
          <span className="px-2" aria-hidden="true">/</span>
          <span aria-current="page" className="text-stone-800">Names &amp; Figures</span>
        </nav>
        <header className="max-w-3xl border-b border-stone-300 pb-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#805535]">Names &amp; figures · pilot</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight tracking-tight text-stone-950 sm:text-5xl">
            Names &amp; Figures
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
            Explore each name in the context where the project uses it, then inspect the source references behind the entry.
          </p>
          <p className="mt-4 max-w-2xl border-l-2 border-[#805535] bg-[#f4f0e9] px-4 py-3 text-sm leading-6 text-stone-700">
            This is an editorial pilot, not the audited catalogue. The listed references are review candidates; edition details and identity claims may still need checking.
          </p>
        </header>
        <div className="mt-6"><CharactersDirectory initialQuery={initialQuery} initialTradition={initialTradition} /></div>
        <p className="mt-6 text-xs leading-5 text-stone-500">
          The count reflects names in this pilot dataset. It is not a count of people, aliases, or audited scripture coverage.
        </p>
      </main>
      <Footer />
    </div>
  )
}
