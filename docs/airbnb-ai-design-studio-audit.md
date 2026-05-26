# House of Wander Design Audit

This audit compares the current House of Wander prototype with two references:

- The local `ArtificialMonks/ai-design-studio` repo.
- Public Airbnb-inspired DESIGN.md material from getdesign/awesome-design-md.

The goal is not to copy Airbnb. The goal is to use proven marketplace workflow
patterns while keeping House of Wander cinematic, guided, and ownable.

## What We Can Borrow From AI Design Studio

### 1. Source-of-truth split

AI Design Studio separates human-authored source from heavy assets. House of
Wander is still mostly hard-coded in React arrays. That is fine for a prototype,
but the next client-ready step should move data into structured files:

- `source/brand.json`
- `source/nav.json`
- `source/stays/index.json`
- `source/stays/casa-cabane.json`
- `source/airbnb/casa-cabane-snapshot.json`
- `assets/manifest.json`

Why it helps: every future stay can be added without rewriting the UI, and the
team can tell which details are public Airbnb facts, host-confirmed facts, or
prototype copy.

### 2. Scarce accent rule

AI Design Studio's strongest rule is restraint: one accent moment per section.
House of Wander should keep gold scarce. Use it for the current chapter, a key
rating, or the main CTA, not every border and label.

### 3. Reusable primitives

The studio has simple Button, Container, token, and brand conventions. House of
Wander can stay vanilla CSS for now, but should still introduce repeatable
component concepts:

- StayCard
- TrustStrip
- BookingPanel
- AmenityGroup
- ReviewScoreGrid
- JourneyControls
- SourceBadge

### 4. Asset discipline

Current media lives in `public/media`, which works for Next.js. As the site
grows, add an asset manifest that records original file, generated/exported
versions, poster, video duration, and approval status.

## What We Can Borrow From Airbnb Product Design

### 1. Photography-first hierarchy

Airbnb lets images do the heavy lifting. House of Wander should go even further:
video and real frames lead the page, while typography stays calm inside detail
sections.

### 2. Compact decision layer

Airbnb detail pages are not just mood. They put practical facts, rating, reviews,
amenities, host, rules, and booking action near the point of decision. Casa
Cabane now has the beginnings of this, but the next pass should make the booking
panel more functional.

Recommended additions:

- Date/guest placeholder selectors that clearly hand off to Airbnb.
- "What is confirmed" vs "needs host confirmation" badges.
- Collapsible mobile sections for Amenities, Reviews, Rules, Location.
- A sticky mobile bottom CTA with rating and "Check dates on Airbnb".

### 3. Marketplace density without dashboard feeling

Airbnb uses compact cards and tight grids. House of Wander should use that
density only after the cinematic gateway. Collection cards can be practical:
image, title, place, rating, guests, status, one action.

### 4. Mobile-first booking CTA

Airbnb collapses reservation into a bottom action on mobile. House of Wander
should do the same, but with House of Wander language:

- "Check dates on Airbnb"
- Rating + review count beside it
- Exit/collection path still reachable

## Current Gaps In House of Wander

- Stay data and Airbnb facts are hard-coded in `app/page.tsx` and
  `app/casa-cabane/page.tsx`.
- The collection page has a strong 3D object but not yet enough marketplace
  utility for multiple stays.
- Casa Cabane has rich detail, but the booking panel is still informational
  rather than an interaction model.
- No source badge system yet, so client reviewers cannot quickly see which facts
  came from Airbnb vs which need confirmation.
- No root `DESIGN.md` existed before this audit, so future agents could drift
  visually.

## Recommended Next Implementation Pass

1. Add structured source files for House of Wander and Casa Cabane.
2. Refactor page arrays to load from those source files.
3. Upgrade Casa Cabane detail into an Airbnb-informed product layout:
   left content column plus sticky booking panel on desktop.
4. Add mobile sticky booking CTA below the gateway/detail content.
5. Add source badges: Airbnb public, host confirmed, prototype copy, needs
   confirmation.
6. Add a fuller collection-card model for future stays.

## Reference Notes

Useful Airbnb-derived patterns from the public DESIGN.md material:

- Single accent color discipline.
- Photo-first cards.
- Rounded, friendly interactive elements.
- Trust/rating display as the loudest typography moment.
- Amenities and reviews in compact detail sections.
- Sticky reservation rail on desktop, bottom reservation CTA on mobile.

Useful AI Design Studio patterns:

- Source files for brand/nav/content.
- Asset manifest and approval state.
- Shared tokens and primitives.
- Handoff docs after implementation.

