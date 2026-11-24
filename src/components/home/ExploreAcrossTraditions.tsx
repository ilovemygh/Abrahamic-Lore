import Link from 'next/link'
import { FEATURED_COMPARISONS } from '@/lib/content'
import { TRADITION_LABELS } from '@/lib/content'

export default function ExploreAcrossTraditions() {
  return (
    <section className="bg-stone-950 py-16 text-stone-100 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(16rem,0.7fr)] sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-400">Read comparatively</p>
            <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Same subject, distinct readings</h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-stone-300">
            Follow one question across traditions. Each comparison keeps its own language, sources, and theological point of view in view.
          </p>
        </div>

        <div className="grid gap-x-12 sm:grid-cols-2">
          {FEATURED_COMPARISONS.map((item, index) => (
            <Link key={item.id} href={`/compare/${item.slug}`} className="group grid min-h-28 grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-t border-white/20 py-5 transition-colors hover:border-white/70">
              <span className="pt-0.5 font-serif text-sm text-stone-400">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-serif text-xl font-medium text-white group-hover:text-[#e4c6a5]">{item.title}</h3>
                  <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-stone-400">{item.traditions.map((tradition) => TRADITION_LABELS[tradition]).join(' · ')}</span>
                </div>
                <p className="mt-2 max-w-xl text-sm leading-6 text-stone-300">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
