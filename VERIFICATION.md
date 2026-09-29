# Verification — Next.js rebuild, 2026-09-28

- Type check (`tsc --noEmit`): clean.
- End-to-end (Playwright, 17 checks, all pass): 14 cards on /recipes; Mains
  filter → 7 with `?course=main` in the URL; Starters + British → empty state;
  Clear filters → 14; deep link `?effort=quick` → 6; recipe `?at=20:00` →
  start 17:16, changing to 21:30 → 18:46; servings 4 → 6 scales 1.6 kg → 2.4 kg;
  save → nav count 1; saved page lists it; servings remembered after reload;
  remove → empty state; home plan 20:00 → 17:16, 19:00 → 16:16 and carries
  `?at=19%3A00` to the recipe; home index Puddings → 3; unknown recipe → 404;
  no page errors.
- Console: no errors on /, /recipes, /recipes/[slug], /method, /saved.
  A hydration mismatch caused by GSAP styling a Suspense fallback was found
  and removed by dropping the Suspense boundary from the recipe filters.
- Responsive: 320, 375, 414, 768, 1440 px — no horizontal overflow on any route.
- Contrast: no text below AA on any route. Two flagged items are not failures:
  nav text over the opening film (measured against the page, not the film)
  and the decorative, aria-hidden footer wordmark.
- Reduced motion: `html.motion` not set, film never loaded (poster only),
  headings not split, bars drawn at full length.
- Bug fixed from the Vite version: metric quantities were rounded to quarters,
  so the 1.6 kg chicken showed as 1½ kg even at its own serving count.
