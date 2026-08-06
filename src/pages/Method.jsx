import { Link } from 'react-router-dom'
import { STATIONS, findRecipe, formatDuration } from '../data/recipes'
import { buildSchedule } from '../lib/schedule'
import { photoFor } from '../data/photos'

const EXAMPLE_SLUG = 'braised-short-rib'
const EXAMPLE_SERVE = '19:30'

/** Her istasyonu, o istasyonda en çok zaman geçiren tariflerden biriyle örnekliyoruz. */
const STATION_EXAMPLES = {
  oven: 'gratin-dauphinois',
  hob: 'cacio-e-pepe',
  prep: 'panzanella',
  cold: 'lemon-posset',
}

/** Tarifin belirli bir istasyonda geçirdiği toplam süre. */
const minutesAt = (recipe, station) =>
  recipe.steps.filter((s) => s.station === station).reduce((sum, s) => sum + s.minutes, 0)

export default function Method() {
  const recipe = findRecipe(EXAMPLE_SLUG)
  const plan = buildSchedule(recipe, EXAMPLE_SERVE)
  const photo = photoFor(EXAMPLE_SLUG)

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 md:py-16">
      <header className="max-w-2xl mb-14">
        <p className="docket text-copper-500 mb-3">THE METHOD</p>
        <h1 className="font-display text-5xl md:text-6xl text-char-950 mb-5">
          How it works
        </h1>
        <p className="text-lg text-char-800/75 leading-relaxed">
          A recipe usually gives you a list and a running order and leaves the clock to
          you. Here the clock is the point: pick the moment you want to eat and every
          step gets a time of its own.
        </p>
      </header>

      <div className="perforation mb-14" />

      <section className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-10 mb-14">
        <h2 className="font-display text-2xl text-char-950 md:sticky md:top-28 md:self-start">
          Backwards from dinner
        </h2>
        <div className="space-y-4 text-char-800/80 leading-relaxed max-w-xl">
          <p>
            Steps run in the order they are written — one finishes, the next begins —
            so the whole recipe has a length. Set a serving time and that length is
            subtracted from it. The result is a start time, and every step in between
            inherits one.
          </p>
          <p>
            Some recipes come out starting the night before. Pizza dough is twelve
            hours in the fridge; there is no arrangement of the afternoon that avoids
            it. Better to see that on the page than at six o'clock.
          </p>
        </div>
      </section>

      {/* Çalışan örnek */}
      <section className="ticket mb-16 grid md:grid-cols-[260px_1fr]">
        {photo && (
          <img
            src={photo.src}
            alt={recipe.title}
            loading="lazy"
            className="w-full h-full aspect-3/2 md:aspect-auto object-cover"
          />
        )}

        <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <p className="docket text-copper-500 mb-2">WORKED EXAMPLE</p>
            <h2 className="font-display text-2xl text-char-950">{recipe.title}</h2>
          </div>
          <span className="stamp text-steel-500">EATING AT {EXAMPLE_SERVE}</span>
        </div>

        <div className="perforation mb-6" />

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-7">
          <Figure label="START AT" value={plan.startLabel} accent />
          <Figure label="TOTAL" value={formatDuration(plan.total)} />
          <Figure label="HANDS ON" value={formatDuration(plan.hands)} />
          <Figure label="WAITING" value={formatDuration(plan.idle)} />
        </dl>

        <p className="text-sm text-char-800/70 leading-relaxed max-w-xl">
          <span className="font-mono">{formatDuration(plan.total)}</span> on paper, but
          only{' '}
          <span className="text-copper-500 font-mono">
            {formatDuration(plan.hands)}
          </span>{' '}
          of it wants you in the kitchen. The rest is the oven working while you are
          somewhere else — which is why this is a better weekday dish than most things
          that finish faster.
        </p>
        </div>
      </section>

      <section className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-10 mb-14">
        <h2 className="font-display text-2xl text-char-950 md:sticky md:top-28 md:self-start">
          Solid bars and hatched ones
        </h2>
        <div className="space-y-5 max-w-xl">
          <p className="text-char-800/80 leading-relaxed">
            Every step is marked one of two ways, and the bar next to it says which.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-2.5 w-24 bg-copper-500 shrink-0" />
              <p className="text-sm text-char-800/80">
                <span className="text-char-950">Hands on.</span> You are standing there
                doing it — chopping, browning, stirring.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="h-2.5 w-24 bg-ticket-200 shrink-0"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #DCD6C8 0 4px, #F0ECE3 4px 8px)',
                }}
              />
              <p className="text-sm text-char-800/80">
                <span className="text-char-950">Unattended.</span> Proving, braising,
                resting, chilling. Start the next thing, or do not.
              </p>
            </div>
          </div>

          <p className="text-char-800/80 leading-relaxed">
            Added up, those give the two figures at the top of every recipe. Total time
            is what the recipe costs; hands-on time is what it costs you.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-10 mb-14">
        <h2 className="font-display text-2xl text-char-950 md:sticky md:top-28 md:self-start">
          Stations
        </h2>
        <div className="max-w-xl">
          <p className="text-char-800/80 leading-relaxed mb-6">
            Each step names the surface it needs. It is there so you can see a clash
            coming — two things wanting the oven at different temperatures, say — before
            you have committed to both.
          </p>
          <dl className="grid grid-cols-2 gap-4">
            {Object.entries(STATIONS).map(([id, station]) => {
              const example = findRecipe(STATION_EXAMPLES[id])
              const shot = photoFor(STATION_EXAMPLES[id])

              return (
                <div key={id} className="border border-ticket-200">
                  {shot && (
                    <img
                      src={shot.src}
                      alt=""
                      loading="lazy"
                      className="w-full aspect-3/2 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <dt className="docket mb-1">{station.short}</dt>
                    <dd className="text-char-900 mb-1.5">{station.label}</dd>
                    {example && (
                      <p className="text-xs text-char-800/60 leading-snug">
                        {example.title} spends{' '}
                        <span className="font-mono">
                          {formatDuration(minutesAt(example, id))}
                        </span>{' '}
                        here
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </dl>
        </div>
      </section>

      <section className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-10 mb-14">
        <h2 className="font-display text-2xl text-char-950 md:sticky md:top-28 md:self-start">
          Scaling
        </h2>
        <div className="space-y-4 text-char-800/80 leading-relaxed max-w-xl">
          <p>
            Change the number of people and the quantities follow, rounded to quarters
            so they stay measurable — ¾ tsp, not 0.7381. Anything written to taste stays
            to taste.
          </p>
          <p>
            Times do not scale, and that is deliberate. Doubling a braise does not double
            its hours; it mostly means a bigger pan.
          </p>
        </div>
      </section>

      <div className="perforation mb-10" />

      <section className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-10 mb-16">
        <h2 className="font-display text-2xl text-char-950 md:sticky md:top-28 md:self-start">
          What it does not do
        </h2>
        <div className="space-y-4 text-char-800/80 leading-relaxed max-w-xl">
          <p>
            It will not overlap two steps for you. The schedule runs them in the written
            order, so a recipe that could have the sauce going during the rest still
            shows them one after another. In practice you gain time; you never lose it.
          </p>
          <p>
            It also does not know your oven, and every oven lies by about ten degrees in
            one direction or the other.
          </p>
        </div>
      </section>

      <div className="flex flex-wrap gap-4">
        <Link to="/recipes" className="btn-service">
          Open the list
        </Link>
        <Link to={`/recipes/${recipe.slug}`} className="btn-outline">
          See this one in full
        </Link>
      </div>
    </div>
  )
}

function Figure({ label, value, accent }) {
  return (
    <div>
      <dt className="docket mb-1">{label}</dt>
      <dd
        className={`font-mono text-xl ${accent ? 'text-copper-500' : 'text-char-900'}`}
      >
        {value}
      </dd>
    </div>
  )
}
