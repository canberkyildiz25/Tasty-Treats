'use client'
/* Açılış sekansını başlatır (CSS, .loaded ile) ve filmi yönetir:
   - Hareket azaltılmışsa ya da veri tasarrufu açıksa video hiç
     oynatılmıyor; kapak karesi kalıyor.
   - Dar ekranda 720p, geniş ekranda 1080p kaynak seçiliyor.
   - Film bir kez oynuyor ve son karesinde duruyor; döngü yok. */
import { useEffect } from 'react'

export default function HeroLoader() {
  useEffect(() => {
    const hero = document.querySelector('.film')
    const t = window.setTimeout(() => hero?.classList.add('loaded'), 120)

    const video = document.querySelector<HTMLVideoElement>('.film-media video')
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches || conn?.saveData
    if (video && !calm) {
      const src = window.matchMedia('(max-width: 900px)').matches ? video.dataset.srcSm : video.dataset.srcLg
      if (src) {
        video.src = src
        video.play().catch(() => {})
      }
    }
    return () => window.clearTimeout(t)
  }, [])
  return null
}
