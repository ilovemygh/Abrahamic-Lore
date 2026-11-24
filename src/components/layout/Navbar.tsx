'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { TRADITION_LABELS } from '@/lib/content'
import { logout } from '@/lib/actions'
import { useUser } from '@/hooks/useUser'
import Icon from '@/components/ui/Icon'
import type { Tradition } from '@/types'

interface NavbarProps {
  tradition: Tradition | null
  onChangeTradition?: () => void
}

export default function Navbar({ tradition, onChangeTradition }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useUser()
  const pathname = usePathname()

  const navigation = [
    { href: '/explore', label: 'Explore' },
    { href: '/traditions', label: 'Traditions' },
    { href: '/timeline', label: 'Timeline' },
    { href: '/characters', label: 'Names' },
    { href: '/topics', label: 'Topics' },
  ]

  const linkClass = (href: string) =>
    `relative inline-flex min-h-11 items-center transition-colors hover:text-stone-950 ${pathname === href || pathname.startsWith(`${href}/`) ? 'font-medium text-stone-950 after:absolute after:inset-x-0 after:-bottom-[0.3rem] after:h-px after:bg-stone-900' : 'text-stone-600'}`

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#fbfaf7]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5 rounded-sm" aria-label="Abrahamic Lore home">
          <span className="flex h-8 w-8 items-center justify-center border border-stone-300 text-stone-700">
            <Icon name="book" className="h-[18px] w-[18px]" />
          </span>
          <span className="font-serif text-[17px] font-semibold tracking-tight text-stone-950">
            Abrahamic Lore
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-[13px] lg:flex">
          {navigation.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)} aria-current={pathname === href ? 'page' : undefined}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          {tradition && onChangeTradition && (
            <button
              onClick={onChangeTradition}
              className="hidden min-h-11 items-center gap-2 border-l border-stone-200 pl-4 text-xs text-stone-600 transition-colors hover:text-stone-950 sm:flex"
              aria-label={`Change reading perspective, currently ${TRADITION_LABELS[tradition]}`}
            >
              <span className="text-stone-400">Reading from</span>
              <span className="font-medium text-stone-800">{TRADITION_LABELS[tradition]}</span>
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-stone-500 sm:block truncate max-w-[140px]">
                {user.email}
              </span>
              <form action={logout}>
                <button
                  type="submit"
                  className="min-h-11 rounded-sm border border-stone-300 px-3.5 text-sm text-stone-800 transition-colors hover:border-stone-500 hover:bg-white"
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex min-h-11 items-center rounded-sm bg-stone-900 px-4 text-sm text-white transition-colors hover:bg-stone-700"
            >
              Sign In
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            className="inline-flex h-11 w-11 items-center justify-center text-stone-700 transition-colors hover:bg-stone-100 lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-stone-200 bg-[#fbfaf7] px-4 py-3 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col divide-y divide-stone-200 text-sm text-stone-700">
            {navigation.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} aria-current={pathname === href ? 'page' : undefined} className="flex min-h-12 items-center justify-between">
                {label}
                {pathname === href && <span className="text-xs text-stone-500">Current page</span>}
              </Link>
            ))}
            <Link href="/search" onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center">Search</Link>
            {tradition && onChangeTradition && (
              <button onClick={() => { setMenuOpen(false); onChangeTradition() }} className="flex min-h-12 items-center text-left text-stone-600">
                Change perspective · {TRADITION_LABELS[tradition]}
              </button>
            )}
            {user ? (
              <form action={logout}>
                <button type="submit" className="text-left text-stone-500">Sign Out</button>
              </form>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)}>Sign In</Link>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
