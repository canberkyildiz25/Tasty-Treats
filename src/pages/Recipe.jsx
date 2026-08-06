import { useParams, Link } from 'react-router-dom'
import {
  findRecipe,
  recipes,
  KITCHENS,
  COURSES,
  totalMinutes,
  activeMinutes,
  formatDuration,
  scaleQuantity,
  formatQuantity,
} from '../data/recipes'
import { photoFor } from '../data/photos'
import { useKitchen } from '../store/kitchen'
import CookTimeline from '../components/CookTimeline'
import RecipeCard from '../components/RecipeCard'

export default function Recipe() {
  const { slug } = useParams()
  const recipe = findRecipe(slug)
  const photo = photoFor(slug)

  const toggleSaved = useKitchen((s) => s.toggleSaved)
  const saved = useKitchen((s) => s.saved.includes(slug))
  const setServings = useKitchen((s) => s.setServings)
  const servings = useKitchen((s) => s.servingsBySlug[slug]) ?? recipe?.serves ?? 2

  if (!recipe) {
    return (
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-24 text-center">
        <h1 className="font-display text-4xl mb-5">No such recipe</h1>
        <Link to="/recipes" className="btn-service">All recipes</Link>
      </div>
    )
  }

  const kitchen = KITCHENS.find((k) => k.id === recipe.kitchen)
  const course = COURSES.find((c) => c.id === recipe.course)
  const related = recipes
    .filter((r) => r.slug !== recipe.slug && r.course === recipe.course)
    .slice(0, 3)

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 md:py-14">
      <nav className="docket mb-7 flex items-center gap-2">
        <Link to="/recipes" className="hover:text-copper-500 transition-colors">RECIPES</Link>
        <span>/</span>
        <span className="text-char-900">{recipe.ticket}</span>
      </nav>

      <header className="grid md:grid-cols-[1fr_240px] gap-8 items-start mb-12">
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="stamp text-copper-500">{course?.label}</span>
            <span className="stamp text-steel-500">{kitchen?.label}</span>
            <span className="stamp text-steel-500">
              {'●'.repeat(recipe.difficulty)}{'○'.repeat(3 - recipe.difficulty)}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl text-char-950 mb-4">
            {recipe.title}
          </h1>

          <p className="text-lg text-char-800/80 leading-relaxed mb-6 max-w-xl">
            {recipe.intro}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => toggleSaved(recipe.slug)}
              className={saved ? 'btn-outline' : 'btn-service'}
            >
              {saved ? '✓ Saved' : 'Save this'}
            </button>

            <dl className="flex gap-6">
              <div>
                <dt className="docket mb-0.5">Total</dt>
                <dd className="font-mono">{formatDuration(totalMinutes(recipe))}</dd>
              </div>
              <div>
                <dt className="docket mb-0.5">Hands on</dt>
                <dd className="font-mono text-copper-500">
                  {formatDuration(activeMinutes(recipe))}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Fotoğraflar Wikimedia Commons'tan; lisans künyeyi zorunlu kılıyor */}
        {photo && (
          <figure className="order-first md:order-none">
            <img
              src={photo.src}
              alt={recipe.title}
              className="w-full aspect-3/2 md:aspect-4/5 object-cover border border-ticket-200"
            />
            <figcaption className="docket mt-2.5 leading-relaxed">
              {photo.credit}
              {' · '}
              <a
                href={photo.page || photo.licenseUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-copper-500 transition-colors"
              >
                {photo.license}
              </a>
            </figcaption>
          </figure>
        )}
      </header>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start">
        {/* Malzemeler + porsiyon ölçekleyici */}
        <aside className="ticket p-5 lg:sticky lg:top-28">
          <div className="flex items-center justify-between mb-5">
            <p className="docket text-copper-500">INGREDIENTS</p>
            <div className="flex items-center border border-ticket-200">
              <button
                onClick={() => setServings(recipe.slug, Math.max(1, servings - 1))}
                className="px-2.5 py-1 text-char-800 hover:bg-ticket-100 transition-colors"
                aria-label="Fewer servings"
              >
                −
              </button>
              <span className="font-mono text-sm w-7 text-center">{servings}</span>
              <button
                onClick={() => setServings(recipe.slug, Math.min(20, servings + 1))}
                className="px-2.5 py-1 text-char-800 hover:bg-ticket-100 transition-colors"
                aria-label="More servings"
              >
                +
              </button>
            </div>
          </div>

          <p className="docket mb-4">
            SCALED FOR {servings} {servings === 1 ? 'PERSON' : 'PEOPLE'}
          </p>

          <ul className="space-y-2.5">
            {recipe.ingredients.map((ing) => {
              const qty = scaleQuantity(ing.qty, recipe.serves, servings)
              return (
                <li key={ing.item} className="flex gap-3 text-sm">
                  <span className="font-mono text-copper-500 shrink-0 w-16 text-right">
                    {qty === null ? '—' : `${formatQuantity(qty)}${ing.unit}`}
                  </span>
                  <span className="text-char-800">{ing.item}</span>
                </li>
              )
            })}
          </ul>
        </aside>

        <div className="space-y-10">
          <CookTimeline recipe={recipe} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl mb-6">More {course?.label.toLowerCase()}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <RecipeCard key={item.slug} recipe={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
