# Design — MISE

Locked design system for every route. Read before changing a page; amend this
file when the system needs to grow.

MISE is a recipe site built around one idea: you say when you want to eat, and
every step of the recipe gets a clock time, with the minutes that need you
separated from the minutes that don't. The visual system comes out of the
object that already does that job in a restaurant kitchen — the prep ticket:
paper, a typewriter docket, a perforated edge, copper pans, a smoked-charcoal
pass.

Rebuilt on the FORGE stack (Next.js 16, TypeScript, Tailwind 4, GSAP
ScrollTrigger, Framer Motion, next/font). The identity is MISE's own; only the
engineering and the motion vocabulary come from FORGE.

## Genre
editorial / utility

## Surfaces
- **Pass** — smoked charcoal `#14120F`. The opening film on the home page, the
  "time that needs you" band, the footer. Warm, dark, lit by copper.
- **Paper** — prep-ticket paper `#FAF8F3`. Everything you read or use.
- **Ticket** — white `#FFFFFF` with a hairline and a torn bottom edge. Only
  for things that behave like a ticket: the plan, the ingredient list, a saved
  recipe.

## Palette (measured on its surface)
| Role | Value | Contrast |
| --- | --- | --- |
| Ink on paper | `#1C1A17` | 16.36 |
| Muted on paper | `#6A655C` | 5.45 |
| Copper text on paper | `#96551F` | 5.47 |
| Copper fill (bars, rules — not text) | `#B87333` | 3.57, non-text |
| Paper on pass | `#FAF8F3` | 17.62 |
| Muted on pass | `#A9A396` | 7.45 |
| Copper text on pass | `#D18F4F` | 6.90 |
| Warning | `#B83D12` | 5.33 |

The old docket grey `#8B8B87` measured 3.22 on paper and is retired for text.

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
