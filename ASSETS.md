# Assets

## Opening film
`public/film/butter-1080.mp4` (4.4 MB), `butter-720.mp4` (1.9 MB), `butter-poster.jpg` (83 KB).

Source: "Butter melting in a pan" by Gilario Guevara, Pexels video 10835189
(https://www.pexels.com/video/10835189/). Pexels licence: free to use, no
attribution required; credited in the footer anyway.

Edit: trimmed to 2.2–19.5 s, mirrored horizontally so the butter settles on
the right and the headline sits over the dark pan, audio removed, H.264
(`-crf 27` / `-crf 28`, `+faststart`). Poster is the first frame of the cut.

Playback: loaded only after hydration, 720p below 900 px wide, 1080p above;
not loaded at all with `prefers-reduced-motion` or Save-Data. Plays once and
rests on its last frame.

## Recipe photographs
`public/img/*.jpg` — Wikimedia Commons, CC BY / CC BY-SA. Author and licence
are in `lib/photos.ts` and printed under the photo on every recipe page.

## Fonts
Bricolage Grotesque, Onest and Space Mono through `next/font/google`:
downloaded at build time, self-hosted as woff2 subsets. All three are SIL OFL.

## Retired
`public/img/mise-evening-kitchen.webp` — the ImageGen kitchen that was the
hero of the Vite version. Removed on this branch; it is still in `main`.
