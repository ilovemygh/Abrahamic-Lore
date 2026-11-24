import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Icon from '@/components/ui/Icon'
import {
  CHARACTER_CONTENT_REVISION,
  CHARACTER_NAMES,
  getCharacterBySlug,
  getRelationshipsForCharacter,
} from '@/data/characters'

export function generateStaticParams() {
  return CHARACTER_NAMES.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const character = getCharacterBySlug(slug)
  if (!character) return { title: 'Name not found | Abrahamic Lore' }
  return {
    title: `${character.name} | Names & Figures | Abrahamic Lore`,
    description: character.summary,
    robots: { index: false, follow: false },
  }
}

export default async function CharacterProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const character = getCharacterBySlug(slug)
  if (!character) notFound()

  const relationships = getRelationshipsForCharacter(character.id)

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfaf7]">
      <Navbar tradition={null} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-stone-500">
          <Link href="/characters" className="underline underline-offset-4 hover:text-stone-900">Names &amp; figures</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-stone-800">{character.name}</span>
        </nav>

        <article>
          <header className="grid gap-8 border-b border-stone-300 pb-8 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#805535]">{character.context}</p>
              <h1 className="mt-3 font-serif text-5xl font-medium leading-[1.02] tracking-tight text-stone-950 sm:text-6xl">
                {character.name}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">{character.summary}</p>
            </div>
            <div className="flex flex-col justify-between border-t border-stone-300 pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">Reading context</p>
                <p className="mt-2 font-serif text-xl text-stone-900">{character.tradition === 'judaism' ? 'Judaism' : character.tradition === 'christianity' ? 'Christianity' : 'Islam'}</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">This profile follows the name as it appears in this project context.</p>
              </div>
              {relationships.find((relationship) => relationship.sourceHref)?.sourceHref && (
                <Link href={relationships.find((relationship) => relationship.sourceHref)!.sourceHref!} className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-stone-800 underline decoration-stone-400 underline-offset-4 hover:text-[#805535]">
                  Open comparison context
                </Link>
              )}
            </div>
          </header>

          <section aria-labelledby="references-heading" className="mt-10">
            <div className="grid gap-3 border-b border-stone-300 pb-4 sm:grid-cols-[minmax(0,1fr)_minmax(14rem,0.6fr)] sm:items-end">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#805535]">Check the evidence</p>
                <h2 id="references-heading" className="mt-2 font-serif text-3xl font-medium text-stone-950">Scripture references</h2>
              </div>
              <p className="text-sm leading-6 text-stone-600">Locations are shown first so you can verify the passage and edition.</p>
            </div>
            <p className="border-b border-stone-200 py-3 text-sm leading-6 text-stone-600">{character.referenceNote}</p>
            <ol className="divide-y divide-stone-200">
              {character.references.map((reference) => (
                <li key={reference.location} className="grid gap-4 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-stone-500">{reference.collection}</p>
                    <p className="mt-1 font-serif text-xl font-medium text-stone-950">{reference.location}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">{reference.editionNote}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:justify-end">
                    <a href={reference.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-stone-900 underline decoration-stone-400 underline-offset-4 hover:text-[#805535]">
                      Open passage <Icon name="link" className="h-4 w-4" />
                    </a>
                    <Link href={`/feedback?${new URLSearchParams({ profile: character.slug, name: character.name, reference: reference.location, revision: String(CHARACTER_CONTENT_REVISION) })}`} className="inline-flex min-h-11 items-center text-sm text-stone-600 underline decoration-stone-300 underline-offset-4 hover:text-stone-950">
                      Suggest correction
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <aside className="mt-8 border-l-2 border-[#805535] bg-[#f4f0e9] px-5 py-4" aria-label="Editorial status">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#805535]">Editorial status</p>
            <p className="mt-1 text-base font-semibold text-stone-900">{character.editorialStatus}</p>
            <p className="mt-1 text-sm leading-6 text-stone-700">
              {character.editorialNote}
            </p>
          </aside>

          {relationships.map((relationship) => {
            const relatedNames = CHARACTER_NAMES.filter(
              (name) =>
                relationship.nameIds.includes(name.id) && name.id !== character.id,
            )

            return (
              <section
                key={relationship.id}
                aria-labelledby={`${relationship.id}-heading`}
                className="mt-12"
              >
                <div className="border-b border-stone-300 pb-3">
                  <h2
                    id={`${relationship.id}-heading`}
                    className="font-serif text-2xl font-semibold text-stone-900"
                  >
                    {relationship.label}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {relationship.note}
                  </p>
                </div>
                <ul className="divide-y divide-stone-200 border-b border-stone-200">
                  {relatedNames.map((name) => (
                    <li key={name.id}>
                      <Link
                        href={`/characters/${name.slug}`}
                        className="flex min-h-14 items-center justify-between gap-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-700"
                      >
                        <span>
                          <span className="font-semibold text-stone-900">{name.name}</span>
                          <span className="ml-2 text-stone-600">{name.context}</span>
                        </span>
                        <span className="shrink-0 text-stone-600" aria-hidden="true">View</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-stone-500">
                  {relationship.reviewStatus}
                  {' · '}
                  <Link href={`/feedback?${new URLSearchParams({ profile: character.slug, name: character.name, reference: `${relationship.label}: ${relationship.note}`, revision: String(CHARACTER_CONTENT_REVISION) })}`} className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-stone-900">Suggest a correction</Link>
                  {relationship.sourceHref && (
                    <>
                      {'. '}
                      <Link
                        href={relationship.sourceHref}
                        className="underline underline-offset-4 hover:text-stone-900"
                      >
                        Read the existing comparison
                      </Link>
                    </>
                  )}
                </p>
              </section>
            )
          })}
        </article>
      </main>
      <Footer />
    </div>
  )
}
