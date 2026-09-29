'use client'
/**
 * Kaydedilen tarifler ve son kullanılan porsiyon sayıları — tarayıcıda.
 *
 * Next sunucuda da çizdiği için kalıcı depo sunucuda boş, tarayıcıda dolu
 * başlar. Farkı hidrasyon hatasına çevirmemek için depo kendiliğinden
 * yüklenmiyor (skipHydration); <StoreHydrator /> ilk çizimden sonra
 * yüklüyor ve `hydrated` bayrağını kaldırıyor. Sayaç gibi yerler o bayrağa
 * bakarak sunucudaki hâli ("0") yanlışlıkla gerçek sanmıyor.
 */
import { useEffect } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface KitchenState {
  saved: string[]
  servingsBySlug: Record<string, number>
  hydrated: boolean
  toggleSaved: (slug: string) => void
  setServings: (slug: string, servings: number) => void
}

export const useKitchen = create<KitchenState>()(
  persist(
    (set) => ({
      saved: [],
      servingsBySlug: {},
      hydrated: false,
      toggleSaved: (slug) =>
        set((state) => ({
          saved: state.saved.includes(slug)
            ? state.saved.filter((s) => s !== slug)
            : [...state.saved, slug],
        })),
      setServings: (slug, servings) =>
        set((state) => ({ servingsBySlug: { ...state.servingsBySlug, [slug]: servings } })),
    }),
    {
      // Vite sürümüyle aynı anahtar: eski sitede kaydedilenler kaybolmuyor.
      name: 'mise-kitchen',
      skipHydration: true,
      partialize: (s) => ({ saved: s.saved, servingsBySlug: s.servingsBySlug }),
    },
  ),
)

export function StoreHydrator() {
  useEffect(() => {
    Promise.resolve(useKitchen.persist.rehydrate()).then(() =>
      useKitchen.setState({ hydrated: true }),
    )
  }, [])
  return null
}
