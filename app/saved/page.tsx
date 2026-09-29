import type { Metadata } from 'next'
import SavedList from '@/components/SavedList'

export const metadata: Metadata = {
  title: 'Saved',
  description: 'Recipes you saved, kept in this browser.',
}

export default function SavedPage() {
  return (
    <div className="frame page-top">
      <header className="section-head max-w-3xl">
        <p className="eyebrow">The pass</p>
        <h1 className="title-xl split">Saved</h1>
        <p className="lede">
          Kept in this browser, not in an account. Clear your site data and this list goes with it.
        </p>
      </header>
      <div className="perforation mb-10" />
      <SavedList />
    </div>
  )
}
