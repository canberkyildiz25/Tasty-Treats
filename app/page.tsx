/* Hallmark · macrostructure: Film opening → workbench · genre: editorial/utility
 * surfaces: pass (charcoal) → paper → pass → paper · design.md
 * type: Bricolage Grotesque 800 display · Onest body · Space Mono figures
 * enrichment: opening film (Pexels, credited) · recipe photographs (Wikimedia, credited)
 * motion: staged opening, film parallax, word rise, photo curtains, bars that
 *   grow to their real length, count-up, magnetic CTA · all gated on reduced motion
 * pre-emit critique: P5 H5 E4 S5 R4 V5
 */
import Link from 'next/link'
import { recipes, findRecipe, activeMinutes, totalMinutes, formatDuration } from '@/lib/recipes'
import { photoFor } from '@/lib/photos'
import HeroLoader from '@/components/HeroLoader'
import Counter from '@/components/Counter'
import HomePlan from '@/components/HomePlan'
import HomeIndex from '@/components/HomeIndex'
import RecipeCard from '@/components/RecipeCard'

const DEMO = 'roast-chicken-lemon-thyme'

export default function Home() {
  const demo = findRecipe(DEMO)!
  const handsTotal = recipes.reduce((sum, r) => sum + activeMinutes(r), 0)
  const allTotal = recipes.reduce((sum, r) => sum + totalMinutes(r), 0)
  const share = Math.round((handsTotal / allTotal) * 100)

  // Ledger: most waiting first — the recipes where MISE saves you the most.
  const ledger = [...recipes].sort(
    (a, b) => activeMinutes(a) / totalMinutes(a) - activeMinutes(b) / totalMinutes(b),
  )
  const weeknight = [...recipes].sort((a, b) => activeMinutes(a) - activeMinutes(b)).slice(0, 3)

  return (
    <>
      {/* ── Film ─────────────────────────────────────────── */}
      <section id="film" className="film" aria-labelledby="film-title">
        <HeroLoader />
        <div className="film-media" aria-hidden>
          <video
            muted
            playsInline
            preload="none"
            poster="/film/butter-poster.jpg"
            data-src-sm="/film/butter-720.mp4"
            data-src-lg="/film/butter-1080.mp4"
          />
        </div>
        <div className="frame film-copy">
          <p className="eyebrow rise" style={{ '--i': 0 } as React.CSSProperties}>Recipes with the timing worked out</p>
          <h1 id="film-title" className="title-xl">
            <span className="line"><span style={{ '--i': 1 } as React.CSSProperties}>Good food.</span></span>
            <span className="line"><span style={{ '--i': 2 } as React.CSSProperties}>Better timing.</span></span>
          </h1>
          <p className="lede rise" style={{ '--i': 4 } as React.CSSProperties}>
            Tell us when you want to eat. Every step of the recipe gets a clock time, and the
            minutes that need you are kept apart from the ones that don’t.
          </p>
          <div className="film-actions rise" style={{ '--i': 5 } as React.CSSProperties}>
            <Link href="/recipes" className="btn btn-light magnetic">
              Find your next dinner <span className="arrow" aria-hidden>↗</span>
            </Link>
            <a href="#plan" className="text-link">See how it works</a>
          </div>
        </div>
        <div className="frame">
          <div className="film-foot rise" style={{ '--i': 6 } as React.CSSProperties}>
            <p className="docket">Nº 01 · The pass</p>
            <div className="count">
              <Counter target={recipes.length} pad={2} />
              <span>recipes,<br />every minute worked out</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Plan ─────────────────────────────────────────── */}
      <section id="plan" className="section" aria-labelledby="plan-heading">
        <div className="frame">
          <div className="section-head">
            <p className="eyebrow">Try it on a roast</p>
            <h2 id="plan-heading" className="title-l split">Dinner, on your time.</h2>
            <p className="lede">Change the time. The start moves, every step moves with it, and the waiting stays yours.</p>
          </div>
          <HomePlan recipe={demo} photo={photoFor(DEMO)} />
        </div>
      </section>

      {/* ── Ledger ───────────────────────────────────────── */}
      <section className="pass section" aria-labelledby="ledger-heading">
        <div className="frame">
          <div className="section-head-split mb-[clamp(2.5rem,5vw,4rem)]">
            <div className="section-head mb-0">
              <p className="eyebrow">Time that needs you</p>
              <h2 id="ledger-heading" className="title-l split">Most of cooking is waiting.</h2>
            </div>
            <p className="lede">
              Across all {recipes.length} recipes, {share}% of the time is hands on. The rest is the oven,
              the pot or the fridge doing the work while you do something else.
            </p>
          </div>
          <ul className="ledger" data-grow-group>
            {ledger.map((r) => {
              const hands = activeMinutes(r)
              const total = totalMinutes(r)
              return (
                <li key={r.slug}>
                  <Link href={`/recipes/${r.slug}`}>
                    <span className="name">{r.title}</span>
                    <span className="track" aria-hidden>
                      <span className="hands bar-grow" style={{ width: `${Math.max(2, (hands / total) * 100)}%` }} />
                    </span>
                    <span className="nums"><b>{formatDuration(hands)}</b> of {formatDuration(total)}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="legend docket">
            <span><i className="bg-copper-500" /> Hands on</span>
            <span><i style={{ background: 'var(--hatch-pass)' }} /> Waiting — oven, pot, fridge</span>
          </div>
        </div>
      </section>

      {/* ── Selection ────────────────────────────────────── */}
      <section className="section" aria-labelledby="weeknight-heading">
        <div className="frame">
          <div className="section-head-split mb-[clamp(2.5rem,5vw,4rem)]">
            <div className="section-head mb-0">
              <p className="eyebrow">Less time at the stove</p>
              <h2 id="weeknight-heading" className="title-l split">For an ordinary Tuesday.</h2>
            </div>
            <Link href="/recipes?effort=quick" className="text-link">All low-effort recipes <span aria-hidden>↗</span></Link>
          </div>
          <div className="selection">
            {weeknight.map((r, i) => (
              <RecipeCard
                key={r.slug}
                recipe={r}
                sizes={i === 0 ? '(max-width: 900px) 100vw, 58vw' : '(max-width: 900px) 100vw, 40vw'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Index ────────────────────────────────────────── */}
      <section className="section pt-0" aria-labelledby="index-heading">
        <div className="frame">
          <div className="section-head">
            <p className="eyebrow">The whole list</p>
            <h2 id="index-heading" className="title-l split">Something worth making.</h2>
          </div>
          <HomeIndex recipes={recipes} />
        </div>
      </section>
    </>
  )
}
