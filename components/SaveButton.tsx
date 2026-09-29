'use client'
import { useKitchen } from '@/lib/store'

/* Kaydet / kaydedildi. Depo yüklenmeden önce basılırsa yine çalışıyor;
   yalnızca etiket, yüklenene kadar varsayılan hâlde. */
export default function SaveButton({ slug }: { slug: string }) {
  const saved = useKitchen((s) => s.hydrated && s.saved.includes(slug))
  const toggle = useKitchen((s) => s.toggleSaved)
  return (
    <button onClick={() => toggle(slug)} aria-pressed={saved} className={`btn magnetic ${saved ? 'btn-ghost' : ''}`}>
      {saved ? 'Saved — on your rail' : 'Save this recipe'}
    </button>
  )
}
