'use client'
/* Anasayfanın çalışan örneği: saat değişince solda büyük "başla" saati,
   sağda fişin ilk adımları güncelleniyor. Sayfanın kendini anlattığı yer
   bir paragraf değil, kullanılabilen bir alet. */
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { STATIONS, formatDuration, type Recipe } from '@/lib/recipes'
import { buildSchedule } from '@/lib/schedule'
import type { Photo } from '@/lib/photos'
import TimeInput from './TimeInput'

export default function HomePlan({ recipe, photo }: { recipe: Recipe; photo: Photo | null }) {
  const [serveAt, setServeAt] = useState('20:00')
  const plan = useMemo(() => buildSchedule(recipe, serveAt), [recipe, serveAt])
  const longest = Math.max(...plan.steps.map((s) => s.minutes))

  return (
    <div className="plan-grid">
      <div className="plan-clock">
        <p className="docket start-label">Start cooking at</p>
        <p className="start" aria-live="polite">{plan.startLabel}</p>
        {plan.startsYesterday && <p className="notice mt-4">That is the day before.</p>}
        <dl className="plan-figures">
          <div><dt className="docket">Needs you</dt><dd className="text-tomato">{formatDuration(plan.hands)}</dd></div>
          <div><dt className="docket">Yours to spend</dt><dd>{formatDuration(plan.idle)}</dd></div>
        </dl>
        {photo && (
          <div className="plan-photo curtain drift hidden lg:block">
            <Image src={photo.src} alt={recipe.title} fill sizes="40vw" />
          </div>
        )}
      </div>

      <div className="ticket">
        <div className="px-[clamp(1.25rem,3vw,2rem)] pt-[clamp(1.25rem,3vw,2rem)] pb-5">
          <p className="docket">{recipe.ticket} / The Sunday roast</p>
          <h3 className="title-m mt-2">{recipe.title}</h3>
        </div>
        <TimeInput id="home-serve-at" label="We eat at" value={serveAt} onChange={setServeAt} />
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
                <span className="docket">{formatDuration(step.minutes)}{step.hands ? '' : ' · walk away'}</span>
                <span className="station-tag ml-auto" data-station={step.station} title={STATIONS[step.station].label}>
                  {STATIONS[step.station].short}
                </span>
              </div>
            </li>
          ))}
        </ol>
        <div className="px-[clamp(1.25rem,3vw,2rem)] pb-8 pt-2">
          <Link className="text-link" href={`/recipes/${recipe.slug}?at=${encodeURIComponent(serveAt)}`}>
            Open the full ticket <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
