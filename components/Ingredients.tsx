'use client'
/* Malzeme fişi ve porsiyon ölçekleyici. Miktarlar çeyreklere yuvarlanıyor
   (¾ tsp, 0.7381 değil); "tadına göre" olanlar öyle kalıyor. Seçilen
   porsiyon tarayıcıda tarif başına hatırlanıyor. */
import { formatQuantity, scaleQuantity, type Recipe } from '@/lib/recipes'
import { useKitchen } from '@/lib/store'

export default function Ingredients({ recipe }: { recipe: Recipe }) {
  const stored = useKitchen((s) => (s.hydrated ? s.servingsBySlug[recipe.slug] : undefined))
  const setServings = useKitchen((s) => s.setServings)
  const servings = stored ?? recipe.serves

  return (
    <aside className="ticket ingredients" aria-labelledby="ing-title">
      <div className="flex items-center justify-between gap-4">
        <h2 id="ing-title" className="eyebrow">Ingredients</h2>
        <div className="stepper" role="group" aria-label="Servings">
          <button onClick={() => setServings(recipe.slug, Math.max(1, servings - 1))} disabled={servings <= 1} aria-label="Fewer servings">−</button>
          <output aria-live="polite" aria-label={`${servings} servings`}>{servings}</output>
          <button onClick={() => setServings(recipe.slug, Math.min(20, servings + 1))} disabled={servings >= 20} aria-label="More servings">+</button>
        </div>
      </div>
      <p className="docket mt-4">Scaled for {servings} {servings === 1 ? 'person' : 'people'}</p>
      <ul className="ing-list">
        {recipe.ingredients.map((ing) => {
          const qty = scaleQuantity(ing.qty, recipe.serves, servings, ing.unit)
          return (
            <li key={ing.item}>
              <span className="q">{qty === null ? '—' : `${formatQuantity(qty, ing.unit)}${ing.unit ? ` ${ing.unit}` : ''}`}</span>
              <span>{ing.item}</span>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
