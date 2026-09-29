import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  COURSES, KITCHENS, activeMinutes, findRecipe, formatDuration, recipes, totalMinutes,
} from '@/lib/recipes'
import { photoFor } from '@/lib/photos'
import CookTimeline from '@/components/CookTimeline'
import Ingredients from '@/components/Ingredients'
import SaveButton from '@/components/SaveButton'
import RecipeCard from '@/components/RecipeCard'

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const recipe = findRecipe(slug)
  if (!recipe) return {}
  const photo = photoFor(slug)
  return {
    title: recipe.title,
    description: `${recipe.short} ${formatDuration(activeMinutes(recipe))} hands on, ${formatDuration(totalMinutes(recipe))} in all.`,
    openGraph: photo ? { images: [photo.src] } : undefined,
  }
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const recipe = findRecipe(slug)
  if (!recipe) notFound()

  const photo = photoFor(slug)
  const kitchen = KITCHENS.find((k) => k.id === recipe.kitchen)
  const course = COURSES.find((c) => c.id === recipe.course)
  const related = recipes.filter((r) => r.slug !== slug && r.course === recipe.course).slice(0, 3)

  return (
    <article className="frame page-top">
      <nav aria-label="Breadcrumb" className="docket flex gap-2">
        <Link href="/recipes" className="hover:text-copper-600">Recipes</Link>
        <span aria-hidden>/</span>
        <span className="text-ink">{recipe.ticket}</span>
      </nav>

      <header className="recipe-head mt-8">
        <div>
          <div className="stamps">
            <span className="stamp text-copper-600">{course?.label}</span>
            <span className="stamp text-muted">{kitchen?.label}</span>
            <span className="stamp text-muted" aria-label={`Difficulty ${recipe.difficulty} of 3`}>
              {'●'.repeat(recipe.difficulty)}{'○'.repeat(3 - recipe.difficulty)}
            </span>
          </div>
          <h1 className="title-l split mt-6">{recipe.title}</h1>
          <p className="lede mt-6">{recipe.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <SaveButton slug={recipe.slug} />
            <dl className="recipe-figures">
              <div><dt className="docket">Hands on</dt><dd className="text-copper-600">{formatDuration(activeMinutes(recipe))}</dd></div>
              <div><dt className="docket">Total</dt><dd>{formatDuration(totalMinutes(recipe))}</dd></div>
              <div><dt className="docket">Serves</dt><dd>{recipe.serves}</dd></div>
            </dl>
          </div>
        </div>

        {photo && (
          <figure>
            <div className="recipe-photo curtain drift relative">
              <Image src={photo.src} alt={recipe.title} fill priority sizes="(max-width: 960px) 100vw, 40vw" />
            </div>
            {/* Wikimedia lisansı künyeyi zorunlu kılıyor. */}
            <figcaption className="docket mt-3">
              {photo.credit} ·{' '}
              <a href={photo.page || photo.licenseUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-copper-600">
                {photo.license}
              </a>
            </figcaption>
          </figure>
        )}
      </header>

      <div className="recipe-body">
        <Ingredients recipe={recipe} />
        <CookTimeline recipe={recipe} />
      </div>

      {related.length > 0 && (
        <section className="section pb-0" aria-labelledby="more-heading">
          <div className="section-head-split mb-10">
            <h2 id="more-heading" className="title-m split">More {course?.label.toLowerCase()}</h2>
            <Link href={`/recipes?course=${recipe.course}`} className="text-link">All of them <span aria-hidden>↗</span></Link>
          </div>
          <div className="grid-cards">
            {related.map((r) => <RecipeCard key={r.slug} recipe={r} />)}
          </div>
        </section>
      )}
    </article>
  )
}
