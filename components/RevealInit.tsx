'use client'
/* Kaydırınca belirme, ekran dışındaki videoyu durdurma ve mıknatıs etkili
   düğmeler — FORGE'dan. Her rotada yeniden bağlanıyor. Mıknatıs yalnızca
   ince imleçli cihazlarda: dokunmatikte sahte hover tetiklenirdi. */
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function RevealInit() {
  const pathname = usePathname()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => io.observe(el))

    const cleanups: Array<() => void> = []
    const motion = document.documentElement.classList.contains('motion')
    if (motion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      document.querySelectorAll<HTMLElement>('.magnetic').forEach((btn) => {
        const move = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect()
          const x = (e.clientX - r.left - r.width / 2) * 0.22
          const y = (e.clientY - r.top - r.height / 2) * 0.3
          btn.style.transform = `translate(${x}px, ${y}px)`
        }
        const leave = () => { btn.style.transform = '' }
        btn.addEventListener('mousemove', move)
        btn.addEventListener('mouseleave', leave)
        cleanups.push(() => {
          btn.removeEventListener('mousemove', move)
          btn.removeEventListener('mouseleave', leave)
        })
      })
    }

    return () => {
      io.disconnect()
      cleanups.forEach((fn) => fn())
    }
  }, [pathname])

  return null
}
