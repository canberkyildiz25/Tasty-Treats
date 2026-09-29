import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { STATIONS, findRecipe, formatDuration, type Recipe, type StationId } from '@/lib/recipes'
import { buildSchedule } from '@/lib/schedule'
import { photoFor } from '@/lib/photos'

export const metadata: Metadata = {
  title: 'The MISE way',
  description: 'How MISE works: backwards from dinner, hands-on time kept apart from waiting, stations, and scaling.',
}

const EXAMPLE_SLUG = 'braised-short-rib'
const EXAMPLE_SERVE = '19:30'

/* Her istasyonu, orada en çok zaman geçiren tariflerden biriyle örnekliyoruz. */
const STATION_EXAMPLES: Record<StationId, string> = {
  oven: 'gratin-dauphinois',
  hob: 'cacio-e-pepe',
  prep: 'panzanella',
  cold: 'lemon-posset',
}

const minutesAt = (recipe: Recipe, station: StationId) =>
  recipe.steps.filter((s) => s.station === station).reduce((sum, s) => sum + s.minutes, 0)

export default function MethodPage() {
  const recipe = findRecipe(EXAMPLE_SLUG)!
  const plan = buildSchedule(recipe, EXAMPLE_SERVE)
  const photo = photoFor(EXAMPLE_SLUG)

  return (
    <div className="frame page-top">
      <header className="section-head max-w-4xl">
        <p className="eyebrow">The method</p>
        <h1 className="title-xl split">How it works</h1>
        <p className="lede">
          A recipe usually gives you a list and a running order and leaves the clock to you. Here the
          clock is the point: pick the moment you want to eat and every step gets a time of its own.
        </p>
      </header>

      <section className="doc-row">
        <h2 className="title-s">Backwards from dinner</h2>
        <div>
          <p>
            Steps run in the order they are written — one finishes, the next begins — so the whole
            recipe has a length. Set a serving time and that length is subtracted from it. The result
            is a start time, and every step in between inherits one.
          </p>
          <p>
            Some recipes come out starting the night before. Pizza dough is twelve hours in the
            fridge; there is no arrangement of the afternoon that avoids it. Better to see that on the
            page than at six o’clock.
          </p>
        </div>
      </section>

      {/* Çalışan örnek */}
      <section className="ticket grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] my-6" aria-labelledby="example-title">
        {photo && (
          <div className="relative min-h-72 curtain drift overflow-hidden">
            <Image src={photo.src} alt={recipe.title} fill sizes="(max-width: 768px) 100vw, 40vw" />
          </div>
        )}
        <div className="p-[clamp(1.25rem,3vw,2.25rem)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Worked example</p>
              <h2 id="example-title" className="title-m mt-3">{recipe.title}</h2>
            </div>
            <span className="stamp text-muted">Eating at {EXAMPLE_SERVE}</span>
          </div>
          <div className="perforation my-6" />
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            <div><dt className="docket">Start at</dt><dd className="mono text-2xl text-copper-600 mt-1">{plan.startLabel}</dd></div>
            <div><dt className="docket">Total</dt><dd className="mono text-2xl mt-1">{formatDuration(plan.total)}</dd></div>
            <div><dt className="docket">Hands on</dt><dd className="mono text-2xl mt-1">{formatDuration(plan.hands)}</dd></div>
            <div><dt className="docket">Waiting</dt><dd className="mono text-2xl mt-1">{formatDuration(plan.idle)}</dd></div>
          </dl>
          <p className="mt-6 text-muted leading-relaxed max-w-xl">
            <span className="mono text-ink">{formatDuration(plan.total)}</span> on paper, but only{' '}
            <span className="mono text-copper-600">{formatDuration(plan.hands)}</span> of it wants you in
            the kitchen. The rest is the oven working while you are somewhere else — which is why this is
            a better weekday dish than most things that finish faster.
          </p>
        </div>
      </section>

      <section className="doc-row">
        <h2 className="title-s">Solid bars and hatched ones</h2>
        <div>
          <p>Every step is marked one of two ways, and the bar next to it says which.</p>
          <div className="grid gap-4 my-6">
            <div className="flex items-center gap-4">
              <span className="bar w-24 shrink-0" aria-hidden />
              <p className="text-sm"><b>Hands on.</b> You are standing there doing it — chopping, browning, stirring.</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="bar idle w-24 shrink-0" aria-hidden />
              <p className="text-sm"><b>Unattended.</b> Proving, braising, resting, chilling. Start the next thing, or do not.</p>
            </div>
          </div>
          <p>Added up, those give the two figures at the top of every recipe. Total time is what the recipe costs; hands-on time is what it costs you.</p>
        </div>
      </section>

      <section className="doc-row">
        <h2 className="title-s">Stations</h2>
        <div>
          <p>
            Each step names the surface it needs. It is there so you can see a clash coming — two
            things wanting the oven at different temperatures, say — before you have committed to both.
          </p>
          <dl className="grid grid-cols-2 gap-4 mt-6">
            {(Object.keys(STATIONS) as StationId[]).map((id) => {
              const example = findRecipe(STATION_EXAMPLES[id])
              const shot = photoFor(STATION_EXAMPLES[id])
              return (
                <div key={id} className="border border-ticket-200 bg-white">
                  {shot && (
                    <div className="relative aspect-[3/2] curtain">
                      <Image src={shot.src} alt="" fill sizes="(max-width: 768px) 50vw, 20vw" />
                    </div>
                  )}
                  <div className="p-4">
                    <dt className="docket">{STATIONS[id].short}</dt>
                    <dd className="mt-1">{STATIONS[id].label}</dd>
                    {example && (
                      <p className="text-xs text-muted mt-2 leading-snug">
                        {example.title} spends <span className="mono">{formatDuration(minutesAt(example, id))}</span> here
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </dl>
        </div>
      </section>

      <section className="doc-row">
        <h2 className="title-s">Scaling</h2>
        <div>
          <p>
            Change the number of people and the quantities follow, rounded to quarters so they stay
            measurable — ¾ tsp, not 0.7381. Anything written to taste stays to taste.
          </p>
          <p>Times do not scale, and that is deliberate. Doubling a braise does not double its hours; it mostly means a bigger pan.</p>
        </div>
      </section>

      <section className="doc-row">
        <h2 className="title-s">What it does not do</h2>
        <div>
          <p>
            It will not overlap two steps for you. The schedule runs them in the written order, so a
            recipe that could have the sauce going during the rest still shows them one after another.
            In practice you gain time; you never lose it.
          </p>
          <p>It also does not know your oven, and every oven lies by about ten degrees in one direction or the other.</p>
        </div>
      </section>

      <div className="flex flex-wrap gap-4 pt-6 pb-4">
        <Link href="/recipes" className="btn magnetic">Open the list <span className="arrow" aria-hidden>↗</span></Link>
        <Link href={`/recipes/${recipe.slug}`} className="btn btn-ghost">See this one in full</Link>
      </div>
    </div>
  )
}
