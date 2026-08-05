/**
 * Servis saatinden geriye doğru çizelge.
 *
 * Adımlar sırayla bağımlıdır (biri bitmeden sonraki başlamaz), ama pasif
 * adımların içinde mutfakta durmak gerekmez. Çizelge bunu ayırır ve
 * "ellerinin dolu olduğu" dakikaları ayrıca toplar — asıl bilmek istediğin
 * şey toplam süre değil, kaç dakika tezgâhta duracağın.
 */

export function buildSchedule(recipe, serveAt) {
  const steps = recipe.steps

  // Toplam süre = adımların ardışık toplamı
  const total = steps.reduce((sum, s) => sum + s.minutes, 0)

  // Servis anından geriye sayarak her adımın başlangıcını bul
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
export function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** 1110 → "18:30"; gece yarısını aşarsa sarmalar */
export function fromMinutes(total) {
  const wrapped = ((total % 1440) + 1440) % 1440
  const h = Math.floor(wrapped / 60)
  const m = wrapped % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

const normalise = (mins) => ((mins % 1440) + 1440) % 1440

/** Bir sonraki yarım saate yuvarlanmış, şimdiden birkaç saat sonrası. */
export function defaultServeTime() {
  const now = new Date()
  now.setHours(now.getHours() + 3)
  const mins = now.getMinutes()
  now.setMinutes(mins < 30 ? 30 : 0)
  if (mins >= 30) now.setHours(now.getHours() + 1)
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
}
