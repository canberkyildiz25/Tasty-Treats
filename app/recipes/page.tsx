import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { findRecipe, recipes } from '@/lib/recipes'
import { photoFor } from '@/lib/photos'
import RecipeFilters from '@/components/RecipeFilters'

export const metadata: Metadata = {
  title: 'Recipes',
  description: 'Fourteen recipes, all written the same way: what you need, what you have to stand there for, and when to start so it lands on time.',
}

/* Sayfanın üstündeki pas rayı — her mutfaktan bir tabak, kenardan kenara. */
const RAIL = ['roast-chicken-lemon-thyme', 'pizza-margherita', 'karniyarik', 'shakshuka', 'gratin-dauphinois', 'sticky-toffee']

export default function RecipesPage() {
  return (
    <>
      <div className="rail">
        {RAIL.map((slug) => {
          const dish = findRecipe(slug)
          const shot = photoFor(slug)
          if (!dish || !shot) return null
          return (
            <Link key={slug} href={`/recipes/${slug}`} aria-label={dish.title}>
              <Image src={shot.src} alt="" fill sizes="(max-width: 640px) 33vw, 17vw" priority />
              <span>{dish.ticket}</span>
            </Link>
          )
        })}
      </div>

      <div className="frame section pt-[clamp(3rem,7vw,5rem)]">
        <header className="section-head max-w-3xl">
          <p className="eyebrow">The list</p>
          <h1 className="title-xl split">Recipes</h1>
          <p className="lede">
            {recipes.length} of them, all written the same way: what you need, what you actually
            have to stand there for, and when to start so it lands on time.
          </p>
        </header>
        <div className="perforation" />
        <RecipeFilters />
      </div>
    </>
  )
}
