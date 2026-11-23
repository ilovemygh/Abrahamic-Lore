import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Icon from '@/components/ui/Icon'
import {
  ABOUT_OVERVIEW,
  GITHUB_CONTRIBUTORS,
  GITHUB_ORGANIZATION,
  PHASE_PLAN,
  TECH_STACK,
} from '@/data/about'

export const metadata: Metadata = {
  title: 'About | Abrahamic Lore',
  description:
    'Learn about Abrahamic Lore, the ilovemygh GitHub organization, and the contributors maintaining this comparative study platform.',
}

export default function AboutPage() {
  const traditionHighlights = [
    {
      name: 'Judaism',
      icon: 'star-of-david' as const,
      pillClass: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      name: 'Christianity',
      icon: 'cross' as const,
      pillClass: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      name: 'Islam',
      icon: 'crescent' as const,
      pillClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ]

  const projectPrinciples = [
    {
      title: 'Comparative Study',
      icon: 'scales' as const,
      description:
        'Explore shared prophetic roots, covenants, historical timelines, and canonical scriptures side by side across all three traditions.',
    },
    {
      title: 'Zero-Emoji Iconography',
      icon: 'book' as const,
      description: ABOUT_OVERVIEW.iconPhilosophy,
    },
    {
      title: 'Phased Open Platform',
      icon: 'columns' as const,
      description:
        'Built iteratively from static scholarly explorations and local preferences toward authenticated profiles, deep search, and knowledge graphs.',
    },
  ]

  const explorationLinks = [
    { label: 'Explore Hub', href: '/explore' },
    { label: 'Browse Traditions', href: '/traditions' },
    { label: 'Timeline & Lineage', href: '/timeline' },
    { label: 'Topic Catalog', href: '/topics' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <Navbar tradition={null} />

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-12 px-4 py-12 sm:px-6">
        {/* Hero Header */}
        <section className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            About the Project
          </p>
          <h1 className="font-serif text-4xl font-bold text-stone-900 sm:text-5xl">
            {ABOUT_OVERVIEW.title}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-stone-600">
            {ABOUT_OVERVIEW.tagline}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {traditionHighlights.map((tradition) => (
              <span
                key={tradition.name}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${tradition.pillClass}`}
              >
                <Icon name={tradition.icon} className="h-3.5 w-3.5" />
                {tradition.name}
              </span>
            ))}
          </div>
        </section>

        {/* About the Application (from README) */}
        <section className="space-y-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="space-y-3 border-b border-stone-100 pb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Project Overview
            </p>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              What Abrahamic Lore Is About
            </h2>
            <p className="text-sm leading-relaxed text-stone-600 sm:text-base">
              {ABOUT_OVERVIEW.summary}
            </p>
            <p className="text-sm leading-relaxed text-stone-500">
              {ABOUT_OVERVIEW.editorialNote}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {projectPrinciples.map((principle) => (
              <div
                key={principle.title}
                className="rounded-2xl border border-stone-100 bg-stone-50/70 p-5 space-y-2.5"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-700">
                  <Icon name={principle.icon} className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">{principle.title}</h3>
                <p className="text-xs leading-relaxed text-stone-600">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* GitHub Organization & Contributors */}
        <section className="space-y-6">
          <div className="flex flex-col gap-1 border-b border-stone-200 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Open Source Stewardship
              </p>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                GitHub Organization &amp; Contributors
              </h2>
            </div>
            <span className="text-xs text-stone-500">
              {GITHUB_CONTRIBUTORS.length} owners &amp; contributors
            </span>
          </div>

          {/* Organization Card */}
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-stone-900">
                    <Icon name="github" className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                      GitHub Organization
                    </p>
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      {GITHUB_ORGANIZATION.name}
                    </h3>
                  </div>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-stone-600">
                  {GITHUB_ORGANIZATION.description}
                </p>
                <p className="text-xs italic text-stone-500">
                  {GITHUB_ORGANIZATION.signature}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <a
                  href={GITHUB_ORGANIZATION.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-stone-700"
                >
                  <Icon name="github" className="h-4 w-4" />
                  github.com/{GITHUB_ORGANIZATION.name}
                </a>
                <a
                  href={GITHUB_ORGANIZATION.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-5 py-2.5 text-xs font-semibold text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-100"
                >
                  View Repository →
                </a>
              </div>
            </div>
          </div>

          {/* Contributors / Owners Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {GITHUB_CONTRIBUTORS.map((contributor) => (
              <div
                key={contributor.username}
                className="flex flex-col justify-between gap-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs transition-all hover:border-stone-300"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={contributor.avatarUrl}
                    alt={`${contributor.username} GitHub avatar`}
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-full border border-stone-200 bg-stone-100 object-cover"
                  />
                  <div className="min-w-0 space-y-1">
                    <span className="inline-flex items-center rounded-full border border-stone-200 bg-stone-100 px-2.5 py-0.5 text-[11px] font-medium text-stone-700">
                      {contributor.role}
                    </span>
                    <h3 className="truncate font-serif text-lg font-bold text-stone-900">
                      {contributor.username}
                    </h3>
                    <p className="truncate text-xs text-stone-500">
                      @{contributor.username}
                    </p>
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-4">
                  <a
                    href={contributor.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-stone-100 py-2.5 text-xs font-semibold text-stone-800 transition-colors hover:bg-stone-200"
                  >
                    <Icon name="github" className="h-4 w-4" />
                    View GitHub Profile →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack & Phase Plan (from README) */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Stack */}
          <div className="space-y-5 rounded-3xl border border-stone-200 bg-white p-6 shadow-xs sm:p-8">
            <div className="border-b border-stone-100 pb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Architecture
              </p>
              <h2 className="mt-1 font-serif text-xl font-bold text-stone-900">
                Technology Stack
              </h2>
            </div>

            <dl className="divide-y divide-stone-100">
              {TECH_STACK.map((item) => (
                <div
                  key={item.layer}
                  className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                    {item.layer}
                  </dt>
                  <dd className="text-sm font-medium text-stone-900">{item.tech}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Phase Plan */}
          <div className="space-y-5 rounded-3xl border border-stone-200 bg-white p-6 shadow-xs sm:p-8">
            <div className="border-b border-stone-100 pb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Roadmap
              </p>
              <h2 className="mt-1 font-serif text-xl font-bold text-stone-900">
                Phase Plan
              </h2>
            </div>

            <div className="space-y-3">
              {PHASE_PLAN.map((item) => (
                <div
                  key={item.phase}
                  className="flex items-start justify-between gap-4 rounded-xl border border-stone-100 bg-stone-50/70 p-3.5"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      {item.phase}
                    </p>
                    <p className="text-sm text-stone-800">{item.scope}</p>
                  </div>
                  {item.status === 'done' ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      <Icon name="check" className="h-3.5 w-3.5" />
                      Done
                    </span>
                  ) : (
                    <span className="inline-flex shrink-0 items-center rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-xs font-medium text-stone-500">
                      Planned
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Continue Exploring */}
        <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Continue Exploring
              </h2>
              <p className="mt-1 text-xs text-stone-500">
                Navigate directly to the comparative corpus, traditions, timeline, or topic catalog.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {explorationLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs font-semibold text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-100"
                >
                  {item.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
