# MISE

*Good food. Better timing.*

A recipe site built around the one question a recipe usually leaves to you: when do I start? Tell MISE when you want to eat and every step gets a clock time, with the minutes that need you at the bench kept apart from the ones that do not.

**Live:** https://mise-prep.vercel.app

This is a rebuild of Tasty Treats, a course project that listed recipes from an API. The first version is in the repository's history.

## What it does

- **Scheduling backwards.** Pick a serving time and each step inherits a start time. Recipes that need the night before say so.
- **Hands-on and waiting, kept apart.** Every step is marked as work or as waiting, and the front page charts both for all fourteen recipes.
- **Scaling that knows its units.** Metric quantities keep their real value, spoon and count measures round to quarters, and nothing written "to taste" is touched.
- **Filters in the address.** Course, kitchen and effort are part of the URL, so a filtered list can be shared as a link.
- **Saved recipes and servings**, kept in the browser, with no account.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), every route prerendered |
| Language | TypeScript 5, with a typed recipe model in `lib/recipes.ts` |
| Styling | Tailwind CSS 4 and a hand-written token system in `app/globals.css` |
| Motion | GSAP 3 with ScrollTrigger for what is tied to the scroll, Framer Motion 12 for springs and counting up |
| State | Zustand, saved to the browser and read back after first paint |
| Type | Bricolage Grotesque, Onest and Space Mono through `next/font` |

## Run it

Node 20 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # the production build
npm start        # serve that build
npm run lint
```

There are no environment variables and no API: the recipes ship with the site.

## Layout of the code

```
app/            the routes: /, /recipes, /recipes/[slug], /method, /saved
components/     Nav, Footer, CookTimeline, Ingredients, HomePlan, RecipeFilters and the rest of the interface
                GsapFx (what is tied to the scroll), RevealInit, ScrollProgress, Counter, HeroLoader
lib/
  recipes.ts    the fourteen recipes, typed
  schedule.ts   a serving time to a clock time for every step
  photos.ts     each photograph and who took it
  store.ts      saved recipes and servings
design.md       the design system and its rules
vercel.json     tells Vercel that this is a Next.js app
```

## Motion

Headline words rise from behind a mask, photographs open with a curtain wipe, the timeline and the ledger bars grow to their real length, and the opening film drifts with the scroll. All of it is gated on `prefers-reduced-motion`: with that set, the film is never loaded and every element is simply there.

## Design

See [`design.md`](design.md). Smoked charcoal, prep-ticket paper and market colours that each carry a meaning. Space Mono sets every time, duration and quantity, because that is what makes a page read as a kitchen ticket.

## Credits

The recipe photographs are from Wikimedia Commons (CC BY and CC BY-SA), each credited on its recipe. The opening film is by Gilario Guevara, on Pexels.

## Deploying

The live site is on Vercel and builds from `main`.

## Author

[Canberk Yıldız](https://canberkyildiz.netlify.app)
