import Link from 'next/link'
import { COMPARISON_ENTITIES, TOPIC_DETAILS } from '@/data/abrahamic_entities'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Icon from '@/components/ui/Icon'

export const metadata = {
  title: 'Explore Sacred Lineages & Comparisons | Abrahamic Lore',
  description: 'Explore comparative deep-dives, theological convergence, and sacred figures across Judaism, Christianity, and Islam.',
}

export default function ExplorePage() {
  const comparisons = Object.values(COMPARISON_ENTITIES)
  const topics = Object.values(TOPIC_DETAILS)

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfaf7]">
      <Navbar tradition={null} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        {/* Header */}
        <section className="max-w-3xl border-b border-stone-300 pb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#805535]">Explore the collection</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight tracking-tight text-stone-950 sm:text-5xl">Choose a path through the material.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">Compare figures and ideas, or follow a subject into its historical and scriptural context.</p>
        </section>

        {/* Featured Comparative Entities */}
        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-stone-300 pb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#805535]">Compare traditions</p>
              <h2 className="mt-2 font-serif text-3xl font-medium text-stone-950">Figures &amp; ideas</h2>
            </div>
            <span className="text-sm text-stone-500">{comparisons.length} studies</span>
          </div>

          <ul className="divide-y divide-stone-200">
            {comparisons.map((c, index) => (
              <li key={c.slug}>
                <Link href={`/compare/${c.slug}`} className="group grid min-h-24 gap-2 py-5 sm:grid-cols-[2.5rem_minmax(10rem,0.45fr)_minmax(0,1fr)_auto] sm:items-center sm:gap-5">
                  <span className="font-serif text-sm text-stone-400">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">{c.category}</span>
                  <span>
                    <span className="block font-serif text-xl font-medium text-stone-950 group-hover:text-[#805535]">{c.title}</span>
                    <span className="mt-1 block max-w-2xl text-sm leading-6 text-stone-600">{c.summary}</span>
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-stone-600">Read study</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Thematic Topics */}
        <section className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-stone-300 pb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#805535]">Study by subject</p>
              <h2 className="mt-2 font-serif text-3xl font-medium text-stone-950">Topics &amp; contexts</h2>
            </div>
            <span className="text-sm text-stone-500">{topics.length} topics</span>
          </div>

          <ul className="grid gap-x-12 sm:grid-cols-2">
            {topics.map((topic) => (
              <li key={topic.slug} className="border-b border-stone-200">
                <Link href={`/topics/${topic.slug}`} className="group flex min-h-20 items-start gap-4 py-4">
                  <Icon name={topic.icon} className="mt-1 h-5 w-5 text-stone-500" />
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">{topic.category}</span>
                    <span className="mt-1 block font-serif text-lg font-medium text-stone-900 group-hover:text-[#805535]">{topic.title}</span>
                    <span className="mt-1 block text-sm leading-5 text-stone-600">{topic.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  )
}
