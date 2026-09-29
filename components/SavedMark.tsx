'use client'
import { useKitchen } from '@/lib/store'

/* Kartın köşesindeki "Saved" işareti — yalnızca tarayıcıdaki depo
   yüklendikten sonra; sunucu çizimi her zaman boş. */
export default function SavedMark({ slug }: { slug: string }) {
  const saved = useKitchen((s) => s.hydrated && s.saved.includes(slug))
  return <span className="text-copper-600">{saved ? 'Saved' : ' '}</span>
}
