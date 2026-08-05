import { useMemo, useState } from 'react'
import { STATIONS, formatDuration } from '../data/recipes'
import { buildSchedule, defaultServeTime } from '../lib/schedule'

/**
 * İmza öğe: pişirme çizelgesi.
 * Servis saatini söylüyorsun, her adım geriye doğru bir saate oturuyor.
 * Pasif adımlar (fırında bekleyen, dinlenen) farklı işaretleniyor — asıl
 * mesele toplam süre değil, tezgâhta kaç dakika duracağın.
 */
export default function CookTimeline({ recipe }) {
  const [serveAt, setServeAt] = useState(defaultServeTime)

  const schedule = useMemo(() => buildSchedule(recipe, serveAt), [recipe, serveAt])
  const longest = Math.max(...schedule.steps.map((s) => s.minutes))

  return (
    <section className="ticket p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-7">
        <div>
          <p className="docket text-copper-500 mb-2">THE PLAN</p>
          <h2 className="font-display text-2xl md:text-3xl">Work backwards</h2>
        </div>

        <label className="flex items-center gap-3">
          <span className="docket">EATING AT</span>
          <input
            type="time"
            value={serveAt}
            onChange={(e) => setServeAt(e.target.value)}
            className="font-mono text-lg bg-ticket-50 border border-ticket-200 px-3 py-1.5 focus:border-copper-500 focus:outline-none"
          />
        </label>
      </div>

      {/* Özet */}
      <div className="perforation mb-5" />
      <dl className="grid grid-cols-3 gap-4 mb-7">
        <Stat label="START AT" value={schedule.startLabel} accent />
        <Stat label="HANDS ON" value={formatDuration(schedule.hands)} />
        <Stat label="WAITING" value={formatDuration(schedule.idle)} />
      </dl>

      {schedule.startsYesterday && (
        <p className="text-sm text-flame-500 border border-flame-500/40 px-3.5 py-2.5 mb-6">
          This one starts the day before — the dough and the chilling see to that.
        </p>
      )}

      {/* Adımlar */}
      <ol className="space-y-0">
        {schedule.steps.map((step) => {
          const station = STATIONS[step.station]
          const width = Math.max(6, (step.minutes / longest) * 100)

          return (
            <li key={step.index} className="py-4 border-t border-ticket-200 first:border-t-0">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-mono text-sm text-char-900 w-12 shrink-0">
                  {step.startLabel}
                </span>
                <p className="flex-1 text-char-800 leading-snug">{step.text}</p>
                <span className="docket shrink-0 hidden sm:block">{station.short}</span>
              </div>

              {/* Süre çubuğu — dolu: elin işte, çizgili: bekliyorsun */}
              <div className="flex items-center gap-3 pl-16">
                <div
                  className={`h-2 transition-all duration-500 ${
                    step.hands ? 'bg-copper-500' : 'bg-ticket-200'
                  }`}
                  style={{
                    width: `${width}%`,
                    backgroundImage: step.hands
                      ? undefined
                      : 'repeating-linear-gradient(45deg, #DCD6C8 0 4px, #F0ECE3 4px 8px)',
                  }}
                />
                <span className="docket shrink-0">
                  {formatDuration(step.minutes)}
                  {!step.hands && ' · unattended'}
                </span>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="perforation mt-5 mb-4" />
      <p className="text-sm text-steel-500 leading-relaxed">
        Solid bars need you at the bench. Hatched ones do not — that is when the
        next thing gets started, or when you sit down.
      </p>
    </section>
  )
}

function Stat({ label, value, accent }) {
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
