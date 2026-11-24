import Link from 'next/link'
import { TOPIC_CARDS } from '@/lib/content'
import Icon from '@/components/ui/Icon'

export default function FeaturedTopics() {
  return (
    <section className="border-t border-stone-200 bg-[#fbfaf7] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#805535]">Study by subject</p>
            <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-stone-950 sm:text-4xl">Choose a topic</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-stone-600">A clear starting point for texts, people, ideas, and places.</p>
          </div>
          <Link href="/topics" className="inline-flex min-h-10 items-center text-sm font-medium text-stone-800 underline decoration-stone-400 underline-offset-4 hover:text-[#805535]">Browse all topics</Link>
        </div>

        <div className="grid gap-x-12 sm:grid-cols-2">
          {TOPIC_CARDS.map((card, index) => (
            <Link key={card.id} href={`/topics/${card.slug}`} className="group grid min-h-[6.5rem] grid-cols-[2.5rem_minmax(0,1fr)_auto] items-start gap-3 border-t border-stone-200 py-4 transition-colors hover:border-stone-500">
              <span className="pt-0.5 font-serif text-sm text-stone-400">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">{card.category}</p>
                <h3 className="mt-1 font-serif text-lg font-medium text-stone-900 group-hover:text-[#805535]">{card.title}</h3>
                <p className="mt-1 max-w-md text-sm leading-5 text-stone-600">{card.description}</p>
              </div>
              <Icon name={card.icon} className="mt-1 h-5 w-5 text-stone-500 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
