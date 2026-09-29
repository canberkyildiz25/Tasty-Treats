'use client'
/* Tarif listesinin süzgeçleri. Seçim adreste (?course=&kitchen=&effort=)
   duruyor, yani paylaşılabiliyor.

   useSearchParams kullanılmıyor: o, bileşeni <Suspense> içine almayı
   gerektiriyor ve Suspense bölümü sayfanın geri kalanından sonra
   hidrasyonla devralınıyor — GsapFx araya girip kartlara stil yazınca
   React uyuşmazlık görüyordu. Adres lib/location üzerinden okunup
   yazılıyor. Sunucu çizimi süzgeçsiz tam liste. */
import { useMemo } from 'react'
import { COURSES, KITCHENS, activeMinutes, recipes, type Recipe } from '@/lib/recipes'
import RecipeCard from './RecipeCard'
import { replaceSearch, useLocationSearch } from '@/lib/location'

const EFFORT = [
  { id: 'quick', label: 'Under 20 min hands on', test: (r: Recipe) => activeMinutes(r) <= 20 },
  { id: 'weekend', label: 'A project', test: (r: Recipe) => activeMinutes(r) > 20 },
]

export function RecipeGrid({ list, reveal = true }: { list: Recipe[]; reveal?: boolean }) {
  return (
    <div className="grid-cards">
      {list.map((r, i) => <RecipeCard key={r.slug} recipe={r} priority={i < 3} reveal={reveal} />)}
    </div>
  )
}

type FilterKey = 'course' | 'kitchen' | 'effort'

export default function RecipeFilters() {
  const search = useLocationSearch()
  const params = useMemo(() => new URLSearchParams(search), [search])
  const course = params.get('course') ?? 'all'
  const kitchen = params.get('kitchen') ?? 'all'
  const effort = params.get('effort') ?? 'all'

  const setFilter = (key: FilterKey, value: string) => {
    const next = new URLSearchParams(params)
    if (value === 'all') next.delete(key)
    else next.set(key, value)
    replaceSearch(next)
  }

  const visible = useMemo(() => {
    let list = recipes
    if (course !== 'all') list = list.filter((r) => r.course === course)
    if (kitchen !== 'all') list = list.filter((r) => r.kitchen === kitchen)
    const rule = EFFORT.find((e) => e.id === effort)
    if (rule) list = list.filter(rule.test)
    return list
  }, [course, kitchen, effort])

  return (
    <>
      <div className="filters">
        <FilterRow label="Course" options={COURSES} active={course} onSelect={(v) => setFilter('course', v)} />
        <FilterRow label="Kitchen" options={KITCHENS} active={kitchen} onSelect={(v) => setFilter('kitchen', v)} />
        <FilterRow label="Effort" options={EFFORT} active={effort} onSelect={(v) => setFilter('effort', v)} />
      </div>
      <p className="docket mb-8" role="status">
        {visible.length} {visible.length === 1 ? 'recipe' : 'recipes'}
      </p>
      {visible.length > 0 ? (
        <RecipeGrid list={visible} />
      ) : (
        <div className="py-20 border-t border-ticket-200">
          <p className="title-s">Nothing at that combination.</p>
          <p className="text-muted mt-2">Try dropping one of the filters.</p>
          <button className="btn btn-ghost mt-6" onClick={() => replaceSearch(new URLSearchParams())}>
            Clear filters
          </button>
        </div>
      )}
    </>
  )
}

function FilterRow({ label, options, active, onSelect }: {
  label: string
  options: { id: string; label: string }[]
  active: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="filter-row" role="group" aria-label={label}>
      <span className="docket">{label}</span>
      <div className="chips">
        <button className="chip" aria-pressed={active === 'all'} onClick={() => onSelect('all')}>Any</button>
        {options.map((o) => (
          <button key={o.id} className="chip" aria-pressed={active === o.id} onClick={() => onSelect(o.id)}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}
