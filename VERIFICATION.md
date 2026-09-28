# MISE redesign verification / 2026-09-28

- Production build: PASS (Vite, 59 modules).
- git diff --check: PASS (only normal Windows line-ending notices).
- Recipe scheduling: all 14 recipes end at the chosen serving time; active + idle equals total. Chicken 20:00 -> 17:16; 21:01 -> 18:17. Midnight rollover flagged correctly.
- Browser: home course filter returns 7 mains; library Starters + British returns 0, Clear filters restores 14; save increments the header, saved page contains the recipe, remove restores the empty state; portions update ingredients; home serving time is carried to the recipe URL and plan.
- Responsive: 320, 375, 414, 768 and 1440px checked. No document overflow. Narrow saved-row overlap found and corrected; rechecked at 320px. Narrow home headline kept to two lines.
- Assets: no broken images in browser; no console errors/warnings during final check. Hero WebP 189,894 bytes. Fonts self-hosted with OFL license files.
- Contrast on paper: copper 5.68:1, muted text 5.23:1, primary button 17.62:1. Top photographic scrim added for navigation readability.
- Motion: CSS scroll-timeline enhancement with static fallback; reduced-motion rule removes spatial motion. No video is used.
- Live deployment: PASS after user renewed Vercel login. Deployment dpl_3bJ6NuG64b9No7PhYZAvRjUJYmjy is READY and aliased to https://mise-prep.vercel.app/. Browser verified the new heading, loaded hero image and no console errors. Local Vite preview remains at http://127.0.0.1:5175/.
