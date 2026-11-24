import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { COMPARISON_ENTITIES } from '@/data/abrahamic_entities'
import Icon from '@/components/ui/Icon'

export const metadata = {
  title: 'Abrahamic Traditions | Comparative Study',
  description: 'Deep dive into the distinctive viewpoints of Judaism, Christianity, and Islam.',
}

export default function TraditionsPage() {
  const comparisons = Object.values(COMPARISON_ENTITIES)

  const traditions = [
    {
      id: 'judaism',
      title: 'Judaism',
      subtitle: 'The Covenant & The Torah',
      accentColor: 'border-blue-700',
      icon: 'star-of-david' as const,
      summary: 'Centered upon the eternal Brit (Covenant) forged at Sinai, the mitzvot (commandments), and the preservation of divine law through the Tanakh and Talmud.',
      coreScripture: 'Tanakh (Torah, Nevi\'im, Ketuvim)',
      keyConcept: 'Halakha, Chessed, Tikkun Olam',
    },
    {
      id: 'christianity',
      title: 'Christianity',
      subtitle: 'Grace, Incarnation & The Gospel',
      accentColor: 'border-rose-800',
      icon: 'cross' as const,
      summary: 'Centered upon the life, death, and resurrection of Jesus of Nazareth (Yeshua / Christ), the incarnation of the Word, and salvation through faith and divine grace.',
      coreScripture: 'The Holy Bible (Old & New Testaments)',
      keyConcept: 'Grace (Charis), Trinity / Logos, Agape',
    },
    {
      id: 'islam',
      title: 'Islam',
      subtitle: 'Tawhid & Final Revelation',
      accentColor: 'border-emerald-800',
      icon: 'crescent' as const,
      summary: 'Centered upon pure primordial monotheism (Tawhid), submission to the uncreated Word revealed to Prophet Muhammad ﷺ, and the continuous prophetic line.',
      coreScripture: 'Al-Qur\'an Al-Karim & Sunnah',
      keyConcept: 'Tawhid, Risalah, Akhirah',
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <Navbar tradition={null} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <section className="max-w-3xl border-b border-stone-300 pb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#805535]">Tradition perspectives</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight tracking-tight text-stone-950 sm:text-5xl">Three traditions, read in context.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">Explore the sources, practices, and ideas that shape each tradition, then follow a question across their distinct perspectives.</p>
        </section>

        {/* 3 Pillars */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-stone-300">
          {traditions.map((trad) => (
            <div
              key={trad.id}
              className={`border-t-2 ${trad.accentColor} pt-5 md:px-7 md:first:pl-0 md:last:pr-0`}
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <Icon name={trad.icon} className="h-6 w-6 text-stone-700" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">{trad.subtitle}</p>
                  </div>
                  <h2 className="mt-5 font-serif text-2xl font-medium text-stone-950">{trad.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{trad.summary}</p>
                </div>

                <div className="mt-6 space-y-4 border-t border-stone-200 pt-4 text-sm">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">Core scripture</span>
                    <p className="mt-1 text-stone-800">{trad.coreScripture}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">Key concepts</span>
                    <p className="mt-1 text-stone-800">{trad.keyConcept}</p>
                  </div>
                </div>
              </div>

              <Link href={`/search?q=${trad.id}`} className="mt-5 inline-flex min-h-10 items-center text-sm font-medium text-stone-800 underline decoration-stone-300 underline-offset-4 hover:text-[#805535]">Find related entries</Link>
            </div>
          ))}
        </div>

        <section className="mt-16">
          <div className="border-b border-stone-300 pb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#805535]">Follow a question</p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-stone-950">Comparative studies</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">Choose a topic to see where interpretations converge and where they differ.</p>
          </div>

          <ul className="divide-y divide-stone-200">
            {comparisons.map((c) => (
              <li key={c.slug}>
                <Link href={`/compare/${c.slug}`} className="group grid min-h-20 gap-2 py-4 sm:grid-cols-[minmax(10rem,0.4fr)_minmax(0,1fr)_auto] sm:items-center sm:gap-6">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">{c.category}</span>
                  <span className="font-serif text-lg font-medium text-stone-900 group-hover:text-[#805535]">{c.title}</span>
                  <span className="text-xs font-medium text-stone-600">Open comparison</span>
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
