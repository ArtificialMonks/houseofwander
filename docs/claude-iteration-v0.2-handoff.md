# Casa Cabane v0.2 - Claude Design Iteration Handoff

One scoped, high-taste visual iteration on the local prototype. Real footage only.
No backend, CMS, booking flow, generated loops, or deployment introduced.

## Files Changed

- `app/page.tsx` - restructured around a single-take "theater" composition.
- `app/globals.css` - new type system, palette, hero, theater, filmstrip, closing.

No other files were touched. Source media, chapter timings, video src, poster
src, and the Airbnb URL are unchanged.

## Design Intent

Treat the page like a short film built around Maaike & Laudi's real walkthrough.

- **Type** - Display serif (system serif stack, no network fonts) paired with a
  refined sans body. Generous line-height, calmer letter-spacing, and an italic
  serif accent in the intro to slow the eye down.
- **Palette** - Warmer ink, softer ivory, and a more disciplined gold instead of
  the previous brassy accent. New radial vignette in the hero and a faint film
  grain overlay (inlined SVG, no extra request).
- **Hero** - Top "House of Wander - Casa Cabane - Stekene" brand bar, large
  serif headline, refined CTAs (pill-shaped, paper + ghost), animated scroll
  cue line at the bottom, runtime + "filmed on location" credit.
- **Intro** - Two-column "intent" block with an italic serif side note that
  explicitly says every frame is real footage. Anchors the no-fake-claims rule
  inside the page itself.
- **Walkthrough (sticky stage)** - Replaced the side-by-side video + panel with
  a "theater" layout: top stage header (chapter code / label / timecode),
  letterboxed video (16/10), caption block beside it on desktop and overlaid on
  mobile, and a 6-segment filmstrip nav underneath with a gold progress fill
  that tracks the current chapter's scroll progress.
- **Closing** - Quieter sand-toned "end frame" band with the Airbnb CTA and a
  prototype version mark.

## Scroll/Video Behavior

Preserved the original scroll-linked chapter mapping. Added a `chapterProgress`
state (0-1 within the active chapter) so the filmstrip rail can fill smoothly
instead of jumping per chapter. Reduced-motion users still get the static
fallback (no seeking, no animations).

Chapter title swap is animated via a `key={activeChapter.id}` remount on the
`h2`, triggering a 700ms rise + fade keyframe. All animations are disabled
under `prefers-reduced-motion: reduce`.

## Mobile

- Theater collapses to single column.
- Video fills `calc(100svh - 168px)` so it dominates the viewport.
- Caption is absolutely positioned over the bottom of the video with a stronger
  gradient backdrop for legibility.
- Filmstrip becomes a horizontally scrollable strip with larger tap targets.
- Hero CTAs stack full-width below 560px.

## Verified

- `npm run build` passes cleanly (Next.js 16.2.6, Turbopack, TypeScript check
  finishes, static pages generate).
- No new dependencies. No network fonts. No new assets.
- Source media in `public/media/` is untouched.

## Recommended Codex Pass

- Run `npm start -- -p 3000` and visually QA the walkthrough on desktop.
- Mobile viewport check at 390x844 and 768x1024 for caption legibility and the
  filmstrip overflow behavior.
- Check that the chapter rail fills smoothly under fast scroll and that the
  active chapter swap doesn't flicker.
- Confirm the reduced-motion path (system setting on) still keeps the video on
  the chapter 0 frame and removes the rise animation.
- Verify the fallback message is reachable by temporarily renaming the video
  file.

## Not Done (Intentional)

- No generated loops, no Seedance/Higgsfield/Kie.ai prompts run. Loop prompt
  template stays in `docs/tutorial-learning-notes.md` for later approval.
- No GitHub or Vercel deployment work.
- No real copy beyond the existing scope. New microcopy on the page stays
  truthful to what the video actually shows.
- No font additions via `next/font` - kept to a system serif/sans stack to
  avoid a build-time network dependency on this offline-tolerant prototype.

## Next Best Iteration (Optional)

- If the team approves generated mood loops, the first candidate is a slow
  lake-shimmer loop for the "Lake" chapter background while the walkthrough
  video is between chapters.
- If a real direct-booking path is approved, the filmstrip's "Stay" chapter
  would gain a secondary inline CTA without changing the rest of the page.
