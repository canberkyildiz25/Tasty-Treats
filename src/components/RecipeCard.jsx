import { Link } from 'react-router-dom'
import { totalMinutes, activeMinutes, formatDuration, KITCHENS } from '../data/recipes'
import { photoFor } from '../data/photos'
import { useKitchen } from '../store/kitchen'

export default function RecipeCard({ recipe }) {
  const saved = useKitchen((s) => s.saved.includes(recipe.slug))
  const kitchen = KITCHENS.find((k) => k.id === recipe.kitchen)
  const photo = photoFor(recipe.slug)
  const total = totalMinutes(recipe)
  const hands = activeMinutes(recipe)

  return (
    <Link to={`/recipes/${recipe.slug}`} className="ticket block group">
      {photo && (
        <div className="overflow-hidden">
          <img
            src={photo.src}
            alt=""
            loading="lazy"
            className="w-full aspect-16/10 object-cover transition-transform duration-700 ease-service group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className="docket">{recipe.ticket}</span>
          <div className="flex gap-1.5">
            {saved && <span className="stamp text-copper-500">Saved</span>}
            <span className="stamp text-steel-500">{kitchen?.label}</span>
          </div>
        </div>

        <h3 className="font-display text-xl text-char-950 mb-2 leading-tight transition-colors group-hover:text-copper-500">
          {recipe.title}
        </h3>

        <p className="text-sm text-char-800/70 line-clamp-2 leading-snug mb-5">
          {recipe.short}
        </p>

        <div className="perforation mb-3.5" />

        <dl className="grid grid-cols-3 gap-3">
          <div>
            <dt className="docket mb-0.5">Total</dt>
            <dd className="font-mono text-sm text-char-900">{formatDuration(total)}</dd>
          </div>
          <div>
            <dt className="docket mb-0.5">Hands on</dt>
            <dd className="font-mono text-sm text-copper-500">{formatDuration(hands)}</dd>
          </div>
          <div>
            <dt className="docket mb-0.5">Serves</dt>
            <dd className="font-mono text-sm text-char-900">{recipe.serves}</dd>
          </div>
        </dl>
      </div>
    </Link>
  )
}
