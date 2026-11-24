import Link from 'next/link'

const traditions = [
  { label: 'Judaism', detail: 'Names and references in Jewish contexts', tone: 'border-blue-300' },
  { label: 'Christianity', detail: 'Names and references in Christian contexts', tone: 'border-rose-300' },
  { label: 'Islam', detail: 'Names and references in Islamic contexts', tone: 'border-emerald-300' },
]

export default function NamesIndexFeature() {
  return (
    <section className="border-b border-stone-200 bg-[#fbfaf7] py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#805535]">Names &amp; figures</p>
          <h2 className="mt-2 max-w-xl font-serif text-3xl font-medium leading-tight tracking-tight text-stone-950 sm:text-4xl">A name is a doorway to its sources.</h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-stone-600">Browse the pilot index, open a distinct name profile, and see which passages the current project cites.</p>
          <Link href="/characters" className="mt-5 inline-flex min-h-11 items-center gap-2 bg-stone-950 px-4 text-sm font-medium text-white transition-colors hover:bg-stone-700">
            Browse name profiles <span className="sr-only">in the pilot index</span>
          </Link>
        </div>

        <div className="grid border-y border-stone-300 sm:grid-cols-3 sm:divide-x sm:divide-stone-300">
          {traditions.map((tradition) => (
            <div key={tradition.label} className="flex items-start gap-3 border-b border-stone-300 py-4 last:border-b-0 sm:border-b-0 sm:px-4 sm:first:pl-0 sm:last:pr-0">
              <span aria-hidden="true" className={`mt-1 h-8 w-1 shrink-0 border-l-2 ${tradition.tone}`} />
              <div>
                <h3 className="text-sm font-semibold text-stone-900">{tradition.label}</h3>
                <p className="mt-1 text-xs leading-5 text-stone-600">{tradition.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
