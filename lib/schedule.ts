/**
 * Servis saatinden geriye doğru çizelge.
 *
 * Adımlar sırayla bağımlıdır (biri bitmeden sonraki başlamaz), ama pasif
 * adımların içinde mutfakta durmak gerekmez. Çizelge bunu ayırır ve
 * "ellerinin dolu olduğu" dakikaları ayrıca toplar — asıl bilmek istediğin
 * şey toplam süre değil, kaç dakika tezgâhta duracağın.
 */
import type { Recipe, Step } from './recipes'

export interface ScheduledStep extends Step {
  index: number
  startAt: number
  endAt: number
  startLabel: string
  endLabel: string
}

export interface Schedule {
  steps: ScheduledStep[]
  total: number
  hands: number
  idle: number
  startLabel: string
  startsYesterday: boolean
}

export function buildSchedule(recipe: Recipe, serveAt: string): Schedule {
  const steps = recipe.steps
  const total = steps.reduce((sum, s) => sum + s.minutes, 0)
  const startMinutes = toMinutes(serveAt) - total

  let cursor = startMinutes
  const scheduled = steps.map((step, i) => {
    const start = cursor
    cursor += step.minutes
    return {
      ...step,
      index: i,
      startAt: normalise(start),
      endAt: normalise(cursor),
      startLabel: fromMinutes(start),
      endLabel: fromMinutes(cursor),
    }
  })

  const hands = steps.filter((s) => s.hands).reduce((sum, s) => sum + s.minutes, 0)

  return {
    steps: scheduled,
    total,
    hands,
    idle: total - hands,
    startLabel: fromMinutes(startMinutes),
    startsYesterday: startMinutes < 0,
  }
}

/** "18:30" → 1110 */
export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** 1110 → "18:30"; gece yarısını aşarsa sarmalar */
export function fromMinutes(total: number): string {
  const wrapped = ((total % 1440) + 1440) % 1440
  const h = Math.floor(wrapped / 60)
  const m = wrapped % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

const normalise = (mins: number) => ((mins % 1440) + 1440) % 1440

export const isClockTime = (value: string | null | undefined): value is string =>
  /^([01]\d|2[0-3]):[0-5]\d$/.test(value ?? '')

/** Bir sonraki yarım saate yuvarlanmış, şimdiden birkaç saat sonrası. */
export function defaultServeTime(): string {
  const now = new Date()
  now.setHours(now.getHours() + 3)
  const mins = now.getMinutes()
  now.setMinutes(mins < 30 ? 30 : 0)
  if (mins >= 30) now.setHours(now.getHours() + 1)
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
}
