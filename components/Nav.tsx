'use client'
/* Üst menü. Anasayfada açılış filminin üstündeyken saydam ve açık renkli;
   film ekrandan çıkınca kâğıt zemine dönüyor. Diğer sayfalarda baştan
   kâğıt. Kaydedilen sayısı depo tarayıcıda yüklenene kadar gösterilmiyor —
   sunucudaki "0" gerçek sanılmasın. */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useKitchen } from '@/lib/store'

export default function Nav() {
  const pathname = usePathname() ?? '/'
  const onHome = pathname === '/'
  const [filmInView, setFilmInView] = useState(true)
  const overFilm = onHome && filmInView
  const count = useKitchen((s) => s.saved.length)
  const hydrated = useKitchen((s) => s.hydrated)
  const countRef = useRef<HTMLSpanElement>(null)
  const first = useRef(true)

  useEffect(() => {
    const film = onHome ? document.getElementById('film') : null
    if (!film) return
    const io = new IntersectionObserver(
      ([entry]) => setFilmInView(entry.isIntersecting),
      { rootMargin: `-76px 0px 0px 0px`, threshold: 0 },
    )
    io.observe(film)
    return () => io.disconnect()
  }, [onHome])

  // Kaydedince sayaç bir kez atıyor — geri bildirim, süs değil.
  useEffect(() => {
    if (!hydrated) return
    if (first.current) { first.current = false; return }
    const el = countRef.current
    if (!el) return
    el.classList.remove('bump')
    void el.offsetWidth
    el.classList.add('bump')
  }, [count, hydrated])

  const link = (href: string) => (pathname === href || pathname.startsWith(`${href}/`) ? 'page' : undefined)

  return (
    <header className="nav" data-tone={overFilm ? 'film' : 'paper'}>
      <div className="frame nav-inner">
        <Link href="/" className="wordmark" aria-label="MISE — home">
          <b>MISE</b>
          <small>EVERYTHING IN ITS PLACE</small>
        </Link>
        <nav className="nav-links" aria-label="Main">
          <Link href="/recipes" aria-current={link('/recipes')}>Recipes</Link>
          <Link href="/method" aria-current={link('/method')}>
            <span className="long">The MISE way</span>
            <span className="short">Method</span>
          </Link>
          <Link href="/saved" aria-current={link('/saved')} className="saved-pill" aria-label={hydrated ? `Saved recipes: ${count}` : 'Saved recipes'}>
            <span className="long">Saved</span>
            <span ref={countRef} className="count" aria-hidden>{hydrated ? count : '·'}</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
