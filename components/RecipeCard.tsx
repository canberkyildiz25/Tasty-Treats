import Link from 'next/link'
import Image from 'next/image'
import { KITCHENS, activeMinutes, formatDuration, totalMinutes, type Recipe } from '@/lib/recipes'
import { photoFor } from '@/lib/photos'
import SavedMark from './SavedMark'

/* Kart: fotoğraf (perdeyle açılır), fiş künyesi, başlık, tek cümle, üç
   rakam. Bütün kart bağlantı. */
export default function RecipeCard({
  recipe,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  headingLevel = 'h3',
  reveal = true,
}: {
  recipe: Recipe
  priority?: boolean
  sizes?: string
  headingLevel?: 'h2' | 'h3'
  /* false: perde efekti yok. Suspense'in sunucu yedeğinde kullanılıyor —
     GSAP o yedeğe stil yazarsa React onu devralırken uyuşmazlık görüyor. */
  reveal?: boolean
}) {
  const kitchen = KITCHENS.find((k) => k.id === recipe.kitchen)
  const photo = photoFor(recipe.slug)
  const Heading = headingLevel

  return (
    <Link href={`/recipes/${recipe.slug}`} className="card">
      {photo && (
        <div className={`card-media${reveal ? ' curtain' : ''}`}>
          <Image src={photo.src} alt="" fill sizes={sizes} priority={priority} />
        </div>
      )}
      <div className="card-meta docket">
        <span><b className={`tone course-${recipe.course} font-normal`}>{recipe.ticket}</b> / {kitchen?.label}</span>
        <SavedMark slug={recipe.slug} />
      </div>
      <Heading className="card-title title-s">{recipe.title}</Heading>
      <p className="card-short">{recipe.short}</p>
      <dl className="card-stats">
        <div className="hands"><dt className="docket">Hands on</dt><dd>{formatDuration(activeMinutes(recipe))}</dd></div>
        <div><dt className="docket">Total</dt><dd>{formatDuration(totalMinutes(recipe))}</dd></div>
        <div><dt className="docket">Serves</dt><dd>{recipe.serves}</dd></div>
      </dl>
    </Link>
  )
}
