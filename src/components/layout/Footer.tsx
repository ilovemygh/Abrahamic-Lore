import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="text-sm font-semibold text-stone-900">Abrahamic Lore</p>
            <p className="mt-2 text-xs leading-relaxed text-stone-500">
              One environment to explore Judaism, Christianity, Islam, and the traditions they carry.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-stone-500">
              <li><Link href="/traditions" className="inline-flex min-h-11 items-center hover:text-stone-900 transition-colors">Browse Traditions</Link></li>
              <li><Link href="/characters" className="inline-flex min-h-11 items-center hover:text-stone-900 transition-colors">Names &amp; Figures</Link></li>
              <li><Link href="/topics" className="inline-flex min-h-11 items-center hover:text-stone-900 transition-colors">Topics</Link></li>
              <li><Link href="/search" className="inline-flex min-h-11 items-center hover:text-stone-900 transition-colors">Search</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Platform</p>
            <ul className="mt-3 space-y-2 text-sm text-stone-500">
              <li><Link href="/about" className="inline-flex min-h-11 items-center hover:text-stone-900 transition-colors">About</Link></li>
              <li><Link href="/sources" className="inline-flex min-h-11 items-center hover:text-stone-900 transition-colors">Sources &amp; editorial approach</Link></li>
              <li><Link href="/feedback" className="inline-flex min-h-11 items-center hover:text-stone-900 transition-colors">Suggest a correction</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-stone-200 pt-6 text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Abrahamic Lore. A shared space for learning.</p>
          <Link
            href="/about"
            className="text-stone-500 underline underline-offset-4 hover:text-stone-900 transition-colors"
          >
            About & Contributors
          </Link>
        </div>
      </div>
    </footer>
  )
}
