# Design — MISE

Locked design system for every route. Read before changing a page; amend this
file when the system needs to grow.

MISE is a recipe site built around one idea: you say when you want to eat, and
every step of the recipe gets a clock time, with the minutes that need you
separated from the minutes that don't. The structure comes out of the object
that already does that job in a restaurant kitchen — the prep ticket: a
typewriter docket, a perforated rule, a ticket number. The colour comes out of
the market: tomato, saffron, basil, aubergine.

Rebuilt on the FORGE stack (Next.js 16, TypeScript, Tailwind 4, GSAP
ScrollTrigger, Framer Motion, next/font). The identity is MISE's own; only the
engineering and the motion vocabulary come from FORGE.

## Genre
editorial / utility

## Palette — the market board (2026-09-29)
The owner asked for livelier colour and to lose the sepia (paper, charcoal,
copper). The new colours come from the recipes' own ingredients, and each one
has a job:

| Colour | Value | Job | Contrast |
| --- | --- | --- | --- |
| Tomato | `#D6301F` | primary accent, buttons, times, *mains*, *oven* | 4.88 on white; white on it 4.88 |
| Saffron | `#FFC21A` | block surface (home selection), CTA on film, bars on aubergine | ink on it 11.25 |
| Basil | `#137A45` | *starters*, *bench* | 5.39 on white |
| Sky | `#1565C0` | *sides*, *fridge* | 5.75 on white |
| Plum | `#6B2A7A` | *puddings* | white on it > 9 |
| Hob orange | `#E8590C` | *hob* bars only (tag uses `#B8430A`) | 3.58, non-text |
| Aubergine | `#2B0F36` | dark surface: film scrim, ledger band | white 17.15 · saffron 10.60 |
| Ink | `#1B1220` | text | 18.20 on white |
| Muted | `#5E5563` | secondary text | 7.11 on white |

On saffron, tomato and course colours fall below 3:1, so the saffron block
uses deep tomato `#A51D10` (4.67) and ink.

## Surfaces
- **Canvas** — plain white. No cream, no paper tint.
- **Aubergine** — the opening film's scrim and the "time that needs you" band.
- **Saffron** — the short selection on the home page.
- **Tomato** (`#C8281A`) — the footer, with a tone-on-tone wordmark (a saffron
  wordmark on red read as fast-food branding).
- **Ticket** — white, hairline, a 5 px colour rule on top instead of a torn
  paper edge (tomato for the plan, saffron for ingredients).

## Colour carries meaning, never alone
- Courses: starters basil, mains tomato, sides sky, puddings plum — on ticket
  codes, stamps and the course filter chips; the course name is always there.
- Stations: oven tomato, hob orange, bench basil, fridge sky — on timeline
  bars, with the station code (OVN/HOB/PRP/CLD) next to every bar and a legend
  under every timeline.
- Solid bar = hands on, hatched = waiting, plus the word "unattended".
- Focus ring changes with the surface (`--focus`): tomato on white, saffron on
  aubergine, ink on saffron, white on tomato.

## Typography
- **Display:** Bricolage Grotesque, 700–800, optical size on. Roman only —
  never an italic word inside a heading.
- **Body:** Onest 400–600.
- **Figures and dockets:** Space Mono. Every clock time, duration, quantity
  and ticket number is set in it; that is what makes a page read as a ticket.

## Macrostructure
- Home: **Film opening → workbench.** The film owns the first screen; below
  it the page is a working tool (set a time, see the plan), then evidence
  (hands-on against waiting for every recipe), then a short selection, then
  the full index.
- Recipes: **Rail + index.** A strip of plates across the top, filters, grid.
- Recipe: **Ticket.** Photo and title, ingredients on a ticket that scales,
  the timeline as the main column.
- Method: **Long document** with sticky side headings.
- Saved: **Rail of tickets.**

## Motion (FORGE vocabulary, applied with restraint)
- Opening: film plays once and rests on its last frame (no loop). Headline
  lines rise behind a mask on load, 80 ms apart.
- Section titles: words rise into place once, when they enter.
- Photographs: a curtain wipe (clip-path, bottom to top) once, when they
  enter; large ones drift a few percent with scroll.
- Timeline and proportion bars grow from zero when they enter — the motion
  explains the number.
- Copper scroll-progress hairline; count-up on the few real numbers.
- Magnetic pull on primary buttons, fine pointers only.
- `prefers-reduced-motion`: all of the above off; content is simply there.
- Not used: custom cursor, film grain, looping animation, scroll hijacking.

## Honesty
- Recipe photographs: Wikimedia Commons, credited on each recipe.
- Opening film: Pexels (Gilario Guevara), credited in the footer.
- No invented numbers: counts and minutes are computed from the recipe data.
