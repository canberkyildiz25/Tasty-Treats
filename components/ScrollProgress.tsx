'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/* Bakır ilerleme çizgisi — Framer Motion'ın kaydırma yayı (FORGE'dan). */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()
  const spring = useSpring(scrollYProgress, { stiffness: 220, damping: 36, mass: 0.4 })

  return <motion.div id="scroll-progress" style={{ scaleX: reduce ? scrollYProgress : spring }} aria-hidden="true" />
}
