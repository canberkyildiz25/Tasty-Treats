'use client'
import Image from 'next/image'
import Link from 'next/link'
import { KITCHENS, activeMinutes, findRecipe, formatDuration, recipes, totalMinutes, type Recipe } from '@/lib/recipes'
import { photoFor } from '@/lib/photos'
import { useKitchen } from '@/lib/store'

/* Kaydedilenler tarayıcıda; tarif sonradan silinmiş olabilir diye
   ayıklanıyor. Depo yüklenene kadar boş durum gösterilmiyor — yoksa
   dolu listesi olan biri bir an "hiçbir şey yok" görürdü. */
export default function SavedList() {
  const hydrated = useKitchen((s) => s.hydrated)
  const saved = useKitchen((s) => s.saved)
  const toggle = useKitchen((s) => s.toggleSaved)

  if (!hydrated) return <p className="docket py-20" aria-busy="true">Checking the rail…</p>

  const list = saved.map(findRecipe).filter((r): r is Recipe => Boolean(r))
  const handsTotal = list.reduce((sum, r) => sum + activeMinutes(r), 0)

  if (list.length === 0) {
    return (
      <div className="py-16 max-w-md">
        <p className="title-m">Nothing on the rail.</p>
        <p className="text-muted mt-3">Anything you save from a recipe page turns up here.</p>
        <Link href="/recipes" className="btn magnetic mt-8">Browse all {recipes.length} <span className="arrow" aria-hidden>↗</span></Link>
      </div>
    )
  }

  return (
    <>
      <dl className="flex flex-wrap gap-10 mb-10">
        <div><dt className="docket">On the list</dt><dd className="mono text-3xl mt-1">{list.length}</dd></div>
        <div><dt className="docket">Hands on, all of it</dt><dd className="mono text-3xl text-copper-600 mt-1">{formatDuration(handsTotal)}</dd></div>
      </dl>
      <ul className="grid gap-5">
        {list.map((r) => {
          const kitchen = KITCHENS.find((k) => k.id === r.kitchen)
          const photo = photoFor(r.slug)
          return (
            <li key={r.slug} className="ticket p-5">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href={`/recipes/${r.slug}`} className="group flex items-center gap-4 flex-1 min-w-0 basis-64">
                  {photo && (
                    <span className="relative w-20 h-20 shrink-0 overflow-hidden">
                      <Image src={photo.src} alt="" fill sizes="80px" />
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="docket block">{r.ticket} · {kitchen?.label}</span>
                    <span className="title-s block mt-1 group-hover:text-copper-600 transition-colors">{r.title}</span>
                  </span>
                </Link>
                <dl className="flex gap-6">
                  <div><dt className="docket">Total</dt><dd className="mono mt-0.5">{formatDuration(totalMinutes(r))}</dd></div>
                  <div><dt className="docket">Hands on</dt><dd className="mono mt-0.5 text-copper-600">{formatDuration(activeMinutes(r))}</dd></div>
                </dl>
                <button
                  onClick={() => toggle(r.slug)}
                  className="docket min-h-11 px-2 hover:text-flame-600 transition-colors"
                  aria-label={`Remove ${r.title} from saved`}
                >
                  Remove
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
