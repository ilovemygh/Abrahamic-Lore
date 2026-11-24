'use client'

import { useState } from 'react'

interface CorrectionFormProps {
  profile?: string
  name?: string
  reference?: string
  revision?: string
}

export default function CorrectionForm({ profile = '', name = '', reference = '', revision = '' }: CorrectionFormProps) {
  const [profileValue, setProfileValue] = useState(profile)
  const [nameValue, setNameValue] = useState(name)
  const [referenceValue, setReferenceValue] = useState(reference)
  const [suggestion, setSuggestion] = useState('')
  const [source, setSource] = useState('')

  function continueToGitHub(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const body = [
      `Profile slug: ${profileValue || 'Not specified'}`,
      `Name: ${nameValue || 'Not specified'}`,
      `Profile revision: ${revision || 'Not specified'}`,
      `Passage or claim: ${referenceValue || 'Not specified'}`,
      '',
      'Suggested correction:',
      suggestion,
      '',
      'Source and edition:',
      source || 'Not specified',
    ].join('\n')
    const params = new URLSearchParams({
      template: 'source-correction.md',
      title: `[Correction] ${nameValue || profileValue || 'Name profile'}`,
      body,
    })
    window.open(`https://github.com/AIZATFIR/abrahamic-lore/issues/new?${params.toString()}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={continueToGitHub} className="mt-8 max-w-3xl">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-stone-800">
          Profile name
          <input value={nameValue} onChange={(event) => setNameValue(event.target.value)} className="mt-2 min-h-12 w-full border border-stone-300 bg-white px-3 text-sm font-normal text-stone-900 outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-200" />
        </label>
        <label className="block text-sm font-medium text-stone-800">
          Profile slug <span className="font-normal text-stone-500">(optional)</span>
          <input value={profileValue} onChange={(event) => setProfileValue(event.target.value)} className="mt-2 min-h-12 w-full border border-stone-300 bg-white px-3 text-sm font-normal text-stone-900 outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-200" />
        </label>
      </div>
      <label className="mt-5 block text-sm font-medium text-stone-800">
        Passage or claim to review
        <input value={referenceValue} onChange={(event) => setReferenceValue(event.target.value)} className="mt-2 min-h-12 w-full border border-stone-300 bg-white px-3 text-sm font-normal text-stone-900 outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-200" />
      </label>
      <label className="mt-5 block text-sm font-medium text-stone-800">
        What should be corrected?
        <textarea required value={suggestion} onChange={(event) => setSuggestion(event.target.value)} rows={5} className="mt-2 w-full border border-stone-300 bg-white px-3 py-3 text-sm font-normal leading-6 text-stone-900 outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-200" />
      </label>
      <label className="mt-5 block text-sm font-medium text-stone-800">
        Supporting source and edition
        <textarea value={source} onChange={(event) => setSource(event.target.value)} rows={3} className="mt-2 w-full border border-stone-300 bg-white px-3 py-3 text-sm font-normal leading-6 text-stone-900 outline-none focus:border-stone-900 focus:ring-2 focus:ring-stone-200" />
      </label>
      <div className="mt-6 flex flex-col gap-4 border-t border-stone-300 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-xs leading-5 text-stone-600">This opens a prefilled GitHub issue in a new tab. The site does not submit or store your suggestion; review it on GitHub before posting.</p>
        <button type="submit" className="inline-flex min-h-12 shrink-0 items-center justify-center bg-stone-950 px-5 text-sm font-medium text-white transition-colors hover:bg-stone-700">Continue to GitHub</button>
      </div>
    </form>
  )
}
