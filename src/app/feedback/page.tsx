import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CorrectionForm from '@/components/feedback/CorrectionForm'

export const metadata: Metadata = {
  title: 'Suggest a Correction | Abrahamic Lore',
  description: 'Send an editor a source-backed correction for a name profile, reference, attribution, or relationship.',
}

export default async function FeedbackPage({
  searchParams,
}: {
  searchParams: Promise<{ profile?: string; name?: string; reference?: string; revision?: string }>
}) {
  const initial = await searchParams

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfaf7]">
      <Navbar tradition={null} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-stone-500">
          <Link href="/" className="underline underline-offset-4 hover:text-stone-900">Home</Link>
          <span className="px-2" aria-hidden="true">/</span>
          <span aria-current="page" className="text-stone-800">Suggest a correction</span>
        </nav>
        <header className="max-w-3xl border-b border-stone-300 pb-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#805535]">Editorial feedback</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight tracking-tight text-stone-950 sm:text-5xl">Help us check the sources.</h1>
          <p className="mt-4 text-base leading-7 text-stone-600">Point an editor to a name, passage, attribution, or relationship that needs review. A source and edition make the suggestion easier to assess.</p>
        </header>
        <CorrectionForm profile={initial.profile} name={initial.name} reference={initial.reference} revision={initial.revision} />
      </main>
      <Footer />
    </div>
  )
}
