import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/** Kaydedilen tarifler ve son kullanılan porsiyon sayıları. */
export const useKitchen = create()(
  persist(
    (set, get) => ({
      saved: [], // slug listesi
      servingsBySlug: {}, // { slug: number }

      toggleSaved: (slug) =>
        set((state) => ({
          saved: state.saved.includes(slug)
            ? state.saved.filter((s) => s !== slug)
            : [...state.saved, slug],
        })),

      isSaved: (slug) => get().saved.includes(slug),

      setServings: (slug, servings) =>
        set((state) => ({
          servingsBySlug: { ...state.servingsBySlug, [slug]: servings },
        })),

      servingsFor: (slug, fallback) => get().servingsBySlug[slug] ?? fallback,
    }),
    { name: 'mise-kitchen' },
  ),
)
