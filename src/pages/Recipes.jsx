import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { recipes, findRecipe, COURSES, KITCHENS, activeMinutes } from '../data/recipes'
import { photoFor } from '../data/photos'
import RecipeCard from '../components/RecipeCard'

const EFFORT = [
  { id: 'quick', label: 'Under 20 min hands on', test: (r) => activeMinutes(r) <= 20 },
  { id: 'weekend', label: 'A project', test: (r) => activeMinutes(r) > 20 },
]

/** Sayfanın üstündeki pas rayı — her mutfaktan bir tabak. */
const RAIL = [
  'roast-chicken-lemon-thyme',
  'pizza-margherita',
  'karniyarik',
  'shakshuka',
  'gratin-dauphinois',
  'sticky-toffee',
]

export default function Recipes() {
  const [params, setParams] = useSearchParams()
  const course = params.get('course') ?? 'all'
  const kitchen = params.get('kitchen') ?? 'all'
  const effort = params.get('effort') ?? 'all'

  const setFilter = (key, value) => {
    if (value === 'all') params.delete(key)
    else params.set(key, value)
    setParams(params, { replace: true })
  }

  const visible = useMemo(() => {
    let list = recipes
    if (course !== 'all') list = list.filter((r) => r.course === course)
    if (kitchen !== 'all') list = list.filter((r) => r.kitchen === kitchen)
    if (effort !== 'all') {
      const rule = EFFORT.find((e) => e.id === effort)
      if (rule) list = list.filter(rule.test)
    }
    return list
  }, [course, kitchen, effort])

  return (
    <>
      {/* Pas rayı — kenardan kenara, boşluksuz */}
      <div className="border-b border-ticket-200 grid grid-cols-3 sm:grid-cols-6">
        {RAIL.map((slug) => {
          const dish = findRecipe(slug)
          const shot = photoFor(slug)
          if (!dish || !shot) return null

          return (
            <Link
              key={slug}
              to={`/recipes/${slug}`}
              title={dish.title}
              className="group relative block overflow-hidden"
            >
              <img
                src={shot.src}
                alt=""
                className="w-full aspect-square sm:aspect-4/3 object-cover transition-transform duration-700 ease-service group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-char-950/30 transition-colors duration-500 group-hover:bg-char-950/5" />
              <span className="absolute bottom-2 left-2.5 font-mono text-[0.55rem] tracking-[0.14em] text-ticket-50/80">
                {dish.ticket}
              </span>
            </Link>
          )
        })}
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        <header className="mb-10 max-w-xl">
          <p className="docket text-copper-500 mb-3">THE LIST</p>
          <h1 className="font-display text-5xl md:text-6xl text-char-950 mb-4">Recipes</h1>
          <p className="text-char-800/75 leading-relaxed">
            Fourteen, all written the same way: what you need, what you actually have to
            stand there for, and when to start so it lands on time.
          </p>
        </header>

        <div className="perforation mb-6" />

        <div className="space-y-4 mb-9">
          <FilterRow label="Course" options={COURSES} active={course} onSelect={(v) => setFilter('course', v)} />
          <FilterRow label="Kitchen" options={KITCHENS} active={kitchen} onSelect={(v) => setFilter('kitchen', v)} />
          <FilterRow label="Effort" options={EFFORT} active={effort} onSelect={(v) => setFilter('effort', v)} />
        </div>

        <p className="docket mb-5">
          {visible.length} {visible.length === 1 ? 'RECIPE' : 'RECIPES'}
        </p>

        {visible.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-display text-2xl mb-3">Nothing at that combination</p>
            <p className="text-char-800/60">Try dropping one of the filters.</p>
          </div>
        )}
      </div>
    </>
  )
}

function FilterRow({ label, options, active, onSelect }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="docket w-16 shrink-0">{label}</span>
      <Chip active={active === 'all'} onClick={() => onSelect('all')}>Any</Chip>
      {options.map((option) => (
        <Chip key={option.id} active={active === option.id} onClick={() => onSelect(option.id)}>
          {option.label}
        </Chip>
      ))}
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 text-sm border transition-all duration-300 ${
        active
          ? 'bg-char-900 text-ticket-50 border-char-900'
          : 'bg-transparent text-char-800/80 border-ticket-200 hover:border-char-700 hover:text-char-950'
      }`}
    >
      {children}
    </button>
  )
}
