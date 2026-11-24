import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Sources & Editorial Approach | Abrahamic Lore',
  description: 'How Abrahamic Lore attributes scripture references, editions, interpretations, and editorial review status.',
}

const principles = [
  {
    number: '01',
    title: 'A reference is not an attribution',
    body: 'Each profile shows a passage location and the source that opens it. The wording and edition used by the project must be recorded separately before a quotation is treated as verified.',
  },
  {
    number: '02',
    title: 'Keep traditions distinct',
    body: 'Names grouped by the existing comparison are shown as related reading paths. That grouping does not imply that every tradition makes the same theological claim or tells the same account.',
  },
  {
    number: '03',
    title: 'Show what still needs review',
    body: 'Pilot entries can remain incomplete while sources, editions, and identity claims are checked. Their review status is visible on the profile rather than presented as a claim of scholarly approval.',
  },
]

export default function SourcesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fbfaf7]">
      <Navbar tradition={null} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-stone-500">
          <Link href="/" className="underline underline-offset-4 hover:text-stone-900">Home</Link>
          <span className="px-2" aria-hidden="true">/</span>
          <span aria-current="page" className="text-stone-800">Sources &amp; editorial approach</span>
        </nav>
        <header className="max-w-3xl border-b border-stone-300 pb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#805535]">How to read this project</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight tracking-tight text-stone-950 sm:text-5xl">Sources &amp; editorial approach</h1>
          <p className="mt-4 text-base leading-7 text-stone-600">Abrahamic Lore compares texts and interpretations across living traditions. Source locations, editions, and editorial claims are kept visible so readers can inspect the basis for each profile.</p>
        </header>

        <ol className="mt-2 divide-y divide-stone-200">
          {principles.map((principle) => (
            <li key={principle.number} className="grid gap-3 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
              <span className="font-serif text-sm text-[#805535]">{principle.number}</span>
              <div>
                <h2 className="font-serif text-2xl font-medium text-stone-900">{principle.title}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">{principle.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <aside className="mt-8 border-l-2 border-[#805535] bg-[#f4f0e9] px-5 py-4">
          <p className="text-sm font-semibold text-stone-900">Current pilot status</p>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-stone-700">The name directory is an editorial pilot. Its profile pages identify references carried over from project material or selected for disambiguation; the exact source edition and identity claims may still need review.</p>
          <Link href="/characters" className="mt-3 inline-flex min-h-10 items-center text-sm font-medium text-stone-900 underline decoration-stone-400 underline-offset-4 hover:text-[#805535]">Open the name directory</Link>
        </aside>
      </main>
      <Footer />
    </div>
  )
}
