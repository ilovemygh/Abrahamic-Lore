import type { Tradition } from '@/types'
import { getHeroContent } from '@/lib/content'
import Link from 'next/link'

interface HeroProps {
  tradition: Tradition | null
  onChangeTradition: () => void
}

export default function Hero({ tradition, onChangeTradition }: HeroProps) {
  const { headline, description } = getHeroContent(tradition)

  return (
    <section className="border-b border-stone-200 bg-[#f4f0e9]">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end lg:gap-20 lg:px-8 lg:py-24">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#805535]">
            A comparative reading guide
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.045em] text-stone-950">
            {headline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-stone-700 sm:text-lg sm:leading-8">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/explore"
            className="inline-flex min-h-12 items-center justify-center bg-stone-950 px-5 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            Browse the collection
          </Link>
          <Link
            href="/search"
            className="inline-flex min-h-12 items-center justify-center border border-stone-400 bg-transparent px-5 text-sm font-medium text-stone-800 transition-colors hover:bg-white/60"
          >
            Search names and topics
          </Link>
          </div>

          {tradition && (
            <button
              onClick={onChangeTradition}
              className="mt-5 min-h-11 text-sm text-stone-600 underline decoration-stone-400 underline-offset-4 transition-colors hover:text-stone-950"
            >
              Change reading perspective
            </button>
          )}
        </div>

        <div className="border-t border-stone-400/70 pt-5 lg:border-l lg:border-t-0 lg:pb-1 lg:pl-8 lg:pt-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
            A useful way in
          </p>
          <ol className="mt-5 divide-y divide-stone-300/80">
            {[
              ['01', 'Choose a question', 'Begin with a figure, text, or idea.'],
              ['02', 'Read in context', 'See how a tradition frames the subject.'],
              ['03', 'Compare with care', 'Follow the sources and note the differences.'],
            ].map(([number, title, detail]) => (
              <li key={number} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 py-4 first:pt-0 last:pb-0">
                <span className="pt-0.5 font-serif text-sm text-[#805535]">{number}</span>
                <div>
                  <h2 className="text-sm font-semibold text-stone-900">{title}</h2>
                  <p className="mt-1 text-sm leading-6 text-stone-600">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/traditions" className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-stone-800 underline decoration-stone-400 underline-offset-4 hover:text-[#805535]">
            Meet the traditions
          </Link>
        </div>
      </div>
    </section>
  )
}
