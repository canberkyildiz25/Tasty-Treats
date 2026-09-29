'use client'
/* İmza öğe: pişirme çizelgesi. Servis saatini söylüyorsun, her adım
   geriye doğru bir saate oturuyor. Dolu çubuk: elin işte. Taralı: bekliyor.

   Saat üç yerden gelebiliyor, bu sırayla: okurun alana yazdığı, adresteki
   ?at= (anasayfadaki plan buraya bununla bağlanıyor), yoksa "şimdiden
   birkaç saat sonrası". Sunucu çiziminde son ikisi bilinmiyor; orada
   sabit 19:30, tarayıcıda gerçek değer (lib/location). */
import { useMemo, useState } from 'react'
import { STATIONS, formatDuration, type Recipe } from '@/lib/recipes'
import { buildSchedule, defaultServeTime, isClockTime } from '@/lib/schedule'
import TimeInput from './TimeInput'
import { useClientValue, useLocationSearch } from '@/lib/location'

export default function CookTimeline({ recipe }: { recipe: Recipe }) {
  const [chosen, setServeAt] = useState<string | null>(null)
  const at = new URLSearchParams(useLocationSearch()).get('at')
  const fallback = useClientValue(defaultServeTime, '19:30')
  const serveAt = chosen ?? (isClockTime(at) ? at : fallback)

  const plan = useMemo(() => buildSchedule(recipe, serveAt), [recipe, serveAt])
  const longest = Math.max(...plan.steps.map((s) => s.minutes))

  return (
    <section className="ticket" aria-labelledby="plan-title">
      <div className="flex flex-wrap items-end justify-between gap-4 px-[clamp(1.25rem,3vw,2rem)] pt-[clamp(1.25rem,3vw,2rem)] pb-5">
        <div>
          <p className="eyebrow">The plan</p>
          <h2 id="plan-title" className="title-m mt-3 split">Work backwards</h2>
        </div>
      </div>
      <TimeInput id="serve-at" label="Eating at" value={serveAt} onChange={setServeAt} />

      <dl className="grid grid-cols-3 gap-4 px-[clamp(1.25rem,3vw,2rem)] py-6 border-b border-line" aria-live="polite" aria-atomic="true">
        <div><dt className="docket">Start at</dt><dd className="mono text-[clamp(1.4rem,3vw,2rem)] text-tomato mt-1">{plan.startLabel}</dd></div>
        <div><dt className="docket">Hands on</dt><dd className="mono text-[clamp(1.1rem,2.2vw,1.5rem)] mt-1">{formatDuration(plan.hands)}</dd></div>
        <div><dt className="docket">Waiting</dt><dd className="mono text-[clamp(1.1rem,2.2vw,1.5rem)] mt-1">{formatDuration(plan.idle)}</dd></div>
      </dl>

      {plan.startsYesterday && (
        <p className="notice mx-[clamp(1.25rem,3vw,2rem)] mt-5">
          This one starts the day before — the dough and the chilling see to that.
        </p>
      )}

      <ol className="steps" data-grow-group>
        {plan.steps.map((step) => (
          <li key={step.index} className="step">
            <time>{step.startLabel}</time>
            <p>{step.text}</p>
            <div className="meta">
              <span
                className={`bar bar-grow ${step.hands ? '' : 'idle'}`}
                data-station={step.station}
                style={{ width: `${Math.max(6, (step.minutes / longest) * 100) * 0.62}%` }}
                aria-hidden
              />
              <span className="docket">
                {formatDuration(step.minutes)}{step.hands ? '' : ' · unattended'}
              </span>
              <span className="station-tag station" data-station={step.station} title={STATIONS[step.station].label}>
                {STATIONS[step.station].short}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <div className="perforation mx-[clamp(1.25rem,3vw,2rem)]" />
      <div className="px-[clamp(1.25rem,3vw,2rem)] pt-4 pb-7">
        <p className="text-sm text-muted leading-relaxed">
          Solid bars need you at the bench. Hatched ones do not — that is when the next thing
          gets started, or when you sit down. The colour is the station:
        </p>
        <ul className="legend docket mt-3" aria-label="Stations">
          {(Object.keys(STATIONS) as (keyof typeof STATIONS)[]).map((id) => (
            <li key={id} className="inline-flex items-center gap-2">
              <span className="station-tag" data-station={id}>{STATIONS[id].short}</span>
              {STATIONS[id].label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
