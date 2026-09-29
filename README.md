# MISE

> **Good food. Better timing.**

A recipe site built around one question a recipe usually leaves to you: *when
do I start?* Tell MISE when you want to eat and every step gets a clock time,
with the minutes that need you at the bench kept apart from the ones that
don't.

## What it does

- **Backwards scheduling** — pick a serving time; each step inherits a start
  time. Recipes that need the night before say so.
- **Hands-on versus waiting** — every step is marked as work or waiting; the
  front page charts both for all fourteen recipes.
- **Scaling** — metric quantities keep their real value, spoon and count
  measures round to quarters, nothing written "to taste" is touched.
- **Filters in the URL** — course, kitchen and effort; shareable links.
- **Saved recipes and servings** — kept in the browser, no account.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), every route prerendered |
| Language | TypeScript 5 — typed recipe model in `lib/recipes.ts` |
| Styling | Tailwind CSS 4 + a hand-written token system (`app/globals.css`) |
| Motion | GSAP 3 + ScrollTrigger for scroll choreography, Framer Motion 12 for springs and count-up |
| State | Zustand (persisted, hydrated after first paint) |
| Fonts | `next/font` — Bricolage Grotesque, Onest, Space Mono |

```
app/            routes: /, /recipes, /recipes/[slug], /method, /saved
components/     Nav, Footer, CookTimeline, Ingredients, HomePlan, RecipeFilters …
                GsapFx (scroll choreography), RevealInit, ScrollProgress, Counter, HeroLoader
lib/            recipes.ts, photos.ts, schedule.ts, store.ts
```

## Motion

Headline words rise behind a mask, photographs open with a curtain wipe, the
timeline and ledger bars grow to their real length, the opening film drifts
with the scroll. Everything is gated on `prefers-reduced-motion`: with it on,
the film is never loaded and every element is simply there.

## Design

See [`design.md`](design.md). Smoked charcoal, prep-ticket paper and copper;
Space Mono for every time, duration and quantity, because that is what makes
a page read as a kitchen ticket.

## Credits

Recipe photographs: Wikimedia Commons (CC BY / CC BY-SA), credited on each
recipe. Opening film: Gilario Guevara on Pexels.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```
