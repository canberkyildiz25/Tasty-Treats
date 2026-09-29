'use client'

import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/* Görünür olunca sayan rakam (Framer Motion, FORGE'dan). Sunucu çizimi ve
   hareketi azaltılmış görünüm gerçek sayıyı gösteriyor; sayma yalnızca
   bir süs, bilgi değil. */
export default function Counter({ target, pad = 0 }: { target: number; pad?: number }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(target)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || reduce || started.current) return
    started.current = true
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, target])

  return <b ref={ref}>{String(value).padStart(pad, '0')}</b>
}
