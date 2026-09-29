'use client'
/* Anasayfanın sonundaki tam dizin: öğüne göre süzülen ince satırlar. */
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { COURSES, activeMinutes, formatDuration, totalMinutes, type CourseId, type Recipe } from '@/lib/recipes'
import { photoFor } from '@/lib/photos'

export default function HomeIndex({ recipes }: { recipes: Recipe[] }) {
  const [course, setCourse] = useState<CourseId | 'all'>('all')
  const list = course === 'all' ? recipes : recipes.filter((r) => r.course === course)
  const options = [{ id: 'all' as const, label: 'Everything' }, ...COURSES]

  return (
    <>
      <div className="chips mb-8" role="group" aria-label="Filter by course">
        {options.map((o) => (
          <button
            key={o.id}
            className="chip"
            aria-pressed={course === o.id}
            onClick={() => setCourse(o.id)}
          >
            {o.label}
            <span className="n">{o.id === 'all' ? recipes.length : recipes.filter((r) => r.course === o.id).length}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">{list.length} recipes shown</p>
      <ul className="index">
        {list.map((r) => {
          const photo = photoFor(r.slug)
          return (
            <li key={r.slug}>
              <Link href={`/recipes/${r.slug}`}>
                {photo ? <Image src={photo.src} alt="" width={144} height={144} sizes="72px" /> : <span />}
                <div className="min-w-0">
                  <p className="docket">{r.ticket} · {formatDuration(activeMinutes(r))} hands on · {formatDuration(totalMinutes(r))} total</p>
                  <h3 className="mt-1">{r.title}</h3>
                </div>
                <span className="arrow" aria-hidden>↗</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
