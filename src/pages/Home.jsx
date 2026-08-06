import { Link } from 'react-router-dom'
import {
  recipes,
  findRecipe,
  COURSES,
  activeMinutes,
  totalMinutes,
  formatDuration,
} from '../data/recipes'
import { buildSchedule } from '../lib/schedule'
import { photoFor } from '../data/photos'
import RecipeCard from '../components/RecipeCard'

/** Vitrindeki örnek gerçekten hesaplanıyor — sabit metin değil. */
const DEMO_SLUG = 'roast-chicken-lemon-thyme'
const DEMO_SERVE = '20:00'

export default function Home() {
  const demo = findRecipe(DEMO_SLUG)
  const demoPhoto = photoFor(DEMO_SLUG)
  const plan = buildSchedule(demo, DEMO_SERVE)

  // Tezgâhta en az durduran üçü — hafta içi için
  const weeknight = [...recipes]
    .sort((a, b) => activeMinutes(a) - activeMinutes(b))
    .slice(0, 3)

  return (
    <>
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-start">
          <div className="animate-plate">
            <p className="docket text-copper-500 mb-5">
              MISE EN PLACE · FOURTEEN RECIPES
            </p>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-char-950 mb-6">
              The cooking is
              <br />
              the easy part.
            </h1>

            <p className="text-lg text-char-800/80 leading-relaxed max-w-lg mb-9">
              What goes wrong is the timing. Every recipe here is written as a prep
              ticket — say when you want to eat and it counts backwards: what to start,
              at what time, and which stretches you can walk away from.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/recipes" className="btn-service">
                Open the list
              </Link>
              <Link to="/method" className="btn-outline">
                How the timing works
              </Link>
            </div>
          </div>

          {/* Kavramı tek fişte gösteren örnek */}
          <aside className="ticket">
            {demoPhoto && (
              <img
                src={demoPhoto.src}
                alt={demo.title}
                className="w-full aspect-4/3 object-cover"
              />
            )}

            <div className="p-6">
            <div className="flex items-start justify-between gap-3 mb-5">
              <span className="docket">{demo.ticket}</span>
              <span className="stamp text-copper-500">Worked example</span>
            </div>

            <h2 className="font-display text-xl text-char-950 leading-tight mb-1">
              {demo.title}
            </h2>
            <p className="docket mb-5">ON THE TABLE AT {DEMO_SERVE}</p>

            <div className="perforation mb-5" />

            <dl className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <dt className="docket mb-1">START AT</dt>
                <dd className="font-mono text-2xl text-copper-500">{plan.startLabel}</dd>
              </div>
              <div>
                <dt className="docket mb-1">HANDS ON</dt>
                <dd className="font-mono text-2xl text-char-900">
                  {formatDuration(plan.hands)}
                </dd>
              </div>
            </dl>

            <ol className="space-y-2.5 mb-6">
              {plan.steps.slice(0, 4).map((step) => (
                <li key={step.index} className="flex gap-3 text-sm">
                  <span
                    className={`font-mono shrink-0 ${
                      step.hands ? 'text-copper-500' : 'text-steel-500'
                    }`}
                  >
                    {step.startLabel}
                  </span>
                  <span className="text-char-800/85 leading-snug line-clamp-2">
                    {step.text}
                  </span>
                </li>
              ))}
              <li className="docket pl-[3.6rem]">
                + {plan.steps.length - 4} MORE
              </li>
            </ol>

            <Link
              to={`/recipes/${demo.slug}`}
              className="docket text-copper-500 hover:text-copper-600 transition-colors"
            >
              SEE THE FULL PLAN →
            </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Üç sayı — sitenin bütün iddiası bu ayrımda */}
      <section className="border-y border-ticket-200 bg-ticket-100/60">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 md:py-20">
          <div className="max-w-xl mb-10">
            <p className="docket text-copper-500 mb-3">THE THREE NUMBERS</p>
            <h2 className="font-display text-3xl md:text-4xl text-char-950 mb-4">
              Total time tells you almost nothing
            </h2>
            <p className="text-char-800/75 leading-relaxed">
              A four-hour braise is an easy Tuesday. A thirty-minute pasta can have you
              standing over the pan for all thirty. So every recipe splits the two.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <Number
              label="TOTAL"
              value="Start to plate"
              body="Everything end to end, including the oven coming up to temperature and the rest afterwards."
            />
            <Number
              label="HANDS ON"
              value="You, at the bench"
              body="The minutes you cannot spend anywhere else. This is the number that decides whether tonight works."
              accent
            />
            <Number
              label="WAITING"
              value="The oven's problem"
              body="Proving, braising, chilling, resting. Marked separately on every step so you know when to sit down."
            />
          </div>
        </div>
      </section>

      {/* Hafta içi seçkisi */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="docket text-copper-500 mb-3">LEAST TIME ON YOUR FEET</p>
            <h2 className="font-display text-3xl md:text-4xl text-char-950">
              For a weeknight
            </h2>
          </div>
          <Link
            to="/recipes?effort=quick"
            className="docket text-copper-500 hover:text-copper-600 transition-colors"
          >
            ALL QUICK ONES →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {weeknight.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Bütün set, tek ekranda */}
      <section className="border-t border-ticket-200 bg-ticket-100/40">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="docket text-copper-500 mb-3">THE FOURTEEN</p>
              <h2 className="font-display text-3xl md:text-4xl text-char-950">
                Everything on the board
              </h2>
            </div>
            <Link
              to="/recipes"
              className="docket text-copper-500 hover:text-copper-600 transition-colors"
            >
              OPEN THE LIST →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {recipes.map((recipe) => {
              const photo = photoFor(recipe.slug)
              if (!photo) return null

              return (
                <Link
                  key={recipe.slug}
                  to={`/recipes/${recipe.slug}`}
                  className="group relative block overflow-hidden"
                >
                  <img
                    src={photo.src}
                    alt=""
                    loading="lazy"
                    className="w-full aspect-square object-cover transition-transform duration-700 ease-service group-hover:scale-105"
                  />

                  {/* Başlığın okunması için koyulaştırma */}
                  <div className="absolute inset-0 bg-linear-to-t from-char-950/90 via-char-950/25 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-3.5">
                    <p className="font-mono text-[0.58rem] tracking-[0.14em] text-ticket-50/65 mb-1">
                      {recipe.ticket} · {formatDuration(activeMinutes(recipe))} ON
                    </p>
                    <h3 className="font-display text-base leading-tight text-ticket-50 transition-colors group-hover:text-copper-300">
                      {recipe.title}
                    </h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Kurs kısayolları */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16 md:py-20">
        <div className="perforation mb-8" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COURSES.map((course) => {
            const count = recipes.filter((r) => r.course === course.id).length
            const fastest = Math.min(
              ...recipes
                .filter((r) => r.course === course.id)
                .map((r) => totalMinutes(r)),
            )

            return (
              <Link
                key={course.id}
                to={`/recipes?course=${course.id}`}
                className="ticket p-5 group"
              >
                <p className="docket mb-3">
                  {count} {count === 1 ? 'TICKET' : 'TICKETS'}
                </p>
                <h3 className="font-display text-xl text-char-950 mb-2 transition-colors group-hover:text-copper-500">
                  {course.label}
                </h3>
                <p className="docket">FROM {formatDuration(fastest)}</p>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}

function Number({ label, value, body, accent }) {
  return (
    <div className="ticket p-6">
      <p className="docket mb-3">{label}</p>
      <p
        className={`font-display text-2xl mb-3 ${
          accent ? 'text-copper-500' : 'text-char-950'
        }`}
      >
        {value}
      </p>
      <p className="text-sm text-char-800/70 leading-relaxed">{body}</p>
    </div>
  )
}
