'use client'
/* Kaydırma koreografisi — FORGE'un GsapFx'inden uyarlandı, MISE'nin
   sınıflarına bağlandı. Her rota değişiminde yeniden kuruluyor ve
   temizleniyor. Hareket azaltılmışsa hiçbiri çalışmıyor.

   .split     başlık kelimeleri maskenin içinden yükselir (bir kez)
   .curtain   fotoğraf alttan yukarı perdeyle açılır (bir kez)
   .drift     büyük fotoğraf kaydırmayla birkaç yüzde kayar
   .bar-grow  çubuk sıfırdan gerçek uzunluğuna uzar — sayıyı anlatır
   .foot-mark alt bilgideki MISE damgası aşağıdan yükselir */
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function splitWords(root: HTMLElement): HTMLElement[] {
  const wrap = (node: Node) => {
    ;[...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment()
        ;(child.textContent ?? '').split(/(\s+)/).forEach((part) => {
          if (!part) return
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return }
          const outer = document.createElement('span')
          outer.className = 'w'
          const inner = document.createElement('span')
          inner.textContent = part
          outer.appendChild(inner)
          frag.appendChild(outer)
        })
        node.replaceChild(frag, child)
      } else if (
        child.nodeType === Node.ELEMENT_NODE &&
        (child as HTMLElement).tagName !== 'BR' &&
        !(child as HTMLElement).classList.contains('w')
      ) {
        wrap(child)
      }
    })
  }
  wrap(root)
  return [...root.querySelectorAll<HTMLElement>('.w > span')]
}

export default function GsapFx() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains('motion')) return

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('.split').forEach((title) => {
        if (title.dataset.split) return
        title.dataset.split = '1'
        const words = splitWords(title)
        gsap.set(title, { visibility: 'visible' })
        gsap.fromTo(
          words,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1,
            stagger: 0.06,
            ease: 'power4.out',
            scrollTrigger: { trigger: title, start: 'top 90%', once: true },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('.curtain').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power4.inOut',
            onComplete: () => el.classList.add('curtain-done'),
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('.drift img').forEach((img) => {
        // Görsel çerçevesinden %12 uzun ve üstten taşıyor; kaydırdıkça
        // aşağı iniyor, hiçbir anda altta boşluk açılmıyor.
        gsap.fromTo(
          img,
          { yPercent: 0 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('[data-grow-group]').forEach((group) => {
        const bars = group.querySelectorAll<HTMLElement>('.bar-grow')
        if (!bars.length) return
        gsap.fromTo(
          bars,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: group, start: 'top 82%', once: true },
          },
        )
      })

      const film = document.querySelector<HTMLElement>('.film-media')
      if (film) {
        gsap.fromTo(
          film,
          { yPercent: 0 },
          {
            yPercent: 14,
            ease: 'none',
            scrollTrigger: { trigger: '.film', start: 'top top', end: 'bottom top', scrub: 0.4 },
          },
        )
      }

      const mark = document.querySelector('.foot-mark')
      if (mark) {
        gsap.fromTo(
          mark,
          { yPercent: 40 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: { trigger: '.foot', start: 'top bottom', end: 'bottom bottom', scrub: 0.4 },
          },
        )
      }
    })

    root.classList.add('gsap-ready')

    // Görseller yüklendikçe sayfa uzuyor; tetik noktalarını güncel tut.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [pathname])

  return null
}
