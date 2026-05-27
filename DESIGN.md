# House of Wander DESIGN.md

Design source of truth for the House of Wander prototype. Use this before
editing `app/page.tsx`, `app/casa-cabane/page.tsx`, or `app/globals.css`.

## 1. Product Feel

House of Wander is a guided stay world, not an Airbnb clone and not a generic
booking dashboard.

The collection page should feel like a calm gateway into several places. A stay
detail page should feel cinematic at first, then increasingly practical as the
guest decides whether to book. Casa Cabane is the first proof: poster gateway,
fullscreen walkthrough, then Airbnb-level decision information in a House of
Wander voice.

Core promise:

- Enter atmosphere first.
- Make practical details easy to find.
- Keep booking safe and familiar through Airbnb until direct booking is approved.
- Let the site guide the guest instead of forcing menu diving.

## 2. Sources To Reuse

Borrow from `ArtificialMonks/ai-design-studio`:

- Keep brand, nav, stay facts, and copy in structured source files once the site
  grows beyond the current prototype.
- Keep heavy media separate and tracked with a manifest.
- Use a scarce accent rule. One high-value accent moment per section is stronger
  than sprinkling gold everywhere.
- Use clear handoff docs for Claude/Codex: changed files, verified behavior,
  open questions, and next step.

Borrow from Airbnb product design:

- Photography and video carry most of the visual weight.
- Property cards are image-first, with compact facts below.
- Trust signals belong near the decision point: rating, reviews, host, response,
  guest count, amenities, house rules.
- Listing details need a sticky booking/reservation rail on desktop and a sticky
  bottom CTA on mobile.
- Mobile search/detail flows should collapse into one clear primary action
  rather than exposing every control at once.

Do not borrow Airbnb brand identity directly. No Airbnb logo, no exact visual
copying, no Rausch red as the House of Wander brand color.

## 3. Color

Current House of Wander palette:

- Ink: `#0b0f0a`
- Ink soft: `#151b12`
- Paper: `#f2ece0`
- Paper warm: `#e6dcc9`
- Gold: `#c99b55`
- Clay: `#b27449`
- Moss: `#1e2a1a`

Color rules:

- Use dark cinematic surfaces for gateways and immersive video.
- Use paper and warm off-white surfaces for decision/detail sections.
- Use gold for one premium signal per section: CTA, active progress, stat, or
  divider.
- Use clay for secondary warm signals and warnings.
- Avoid a one-note beige or dark-green page. Pair warm paper with cool lake,
  moss, glass, and ink tones.

## 4. Type

House of Wander may keep the current system serif display stack for cinematic
headlines. Detail surfaces should follow a quieter Airbnb-like product rhythm:

- Display: serif, 400 weight, large only in true gateways.
- Product headings: 20-28px, modest weight, no shouting.
- Body: 14-16px sans, comfortable line-height.
- Labels: small uppercase only for metadata and section kickers.
- Rating number can be the single loud typographic moment in the detail section.

No negative tracking. Do not scale font size directly with viewport width.

## 5. Layout

Collection page:

- First viewport is the House of Wander brand gateway.
- Stays are cards, not dashboard rows.
- Casa Cabane remains the featured proof, with rating/review/guest meta visible.
- Future stays can appear as "brief needed" cards until media and details exist.

Casa Cabane page:

- Gateway first, with "Enter walkthrough" as the dominant action.
- Fullscreen journey opens immediately from the gateway.
- Detail section follows as a practical decision layer.
- Airbnb CTA appears in both gateway and detail layer.

Desktop detail model:

- Left side: photos/video/story, amenities, reviews, house notes.
- Right side: sticky booking panel with dates/guests placeholder, Airbnb CTA,
  and safety note that final transaction happens on Airbnb.

Mobile detail model:

- One column.
- Primary booking CTA becomes sticky at the bottom once the user enters detail
  content.
- Long data blocks collapse into clear sections: Overview, Amenities, Reviews,
  Rules, Location.

## 6. Components

Primary button:

- Minimum height 48px.
- Strong contrast.
- One primary CTA per section.

Secondary action:

- Outline or ghost style.
- Never visually compete with the primary CTA.

Stay card:

- Image-first.
- 14px or smaller radius.
- Short metadata stack: place, rating/reviews, guests, status.
- Avoid nested cards.

Trust strip:

- Compact facts in columns.
- Rating, reviews, host, response, guest capacity.
- Use tabular numbers where possible.

Booking panel:

- Sticky on desktop.
- Bottom CTA on mobile.
- Clear "Check dates on Airbnb" action until direct booking exists.
- Include date, guest, house-rule placeholders only if the data is real or
  clearly marked as a prototype.

Filmstrip / walkthrough controls:

- Always provide Exit, Collection, Previous, Next, Play/Pause, active chapter,
  timecode, and Airbnb CTA.
- Scroll or wheel can fine-tune video time but must never be the only way to
  navigate.

Amigo guide:

- Starts as a scripted UI prototype, clearly labeled as not live AI.
- Helps guests move between collection, stay details, walkthrough, and Airbnb
  booking handoff.
- Never implies live availability, pricing, payment, cancellation, host inbox,
  or Airbnb sync until those systems exist.
- Later becomes the bridge between guest questions, Maaike & Laurens' operator
  workflow, Airbnb communication, and direct booking.

## 7. Content Model

The next structural improvement should be to move hard-coded stay data into:

- `source/brand.json`
- `source/nav.json`
- `source/stays/casa-cabane.json`
- `source/stays/index.json`
- `source/airbnb/casa-cabane-snapshot.json`
- `assets/manifest.json`

Keep scraped/public Airbnb facts separate from host-confirmed facts. Label each
field as one of:

- `source: airbnb-public`
- `source: host-confirmed`
- `source: prototype-copy`
- `source: needs-confirmation`

## 8. Airbnb-Informed Workflow

Use Airbnb as the workflow reference, not the brand reference.

Guest decision sequence:

1. Feel the place.
2. See quick facts.
3. Understand sleeping setup.
4. Check amenities and outdoor life.
5. Read trust signals and review themes.
6. Confirm house rules and safety notes.
7. Choose dates / guests on Airbnb.

Never imply live price, availability, cancellation policy, or direct booking
unless that data is live and verified.

## 9. Responsive Rules

Breakpoints:

- Mobile: below 744px.
- Tablet: 744-1128px.
- Desktop: 1128-1440px.
- Wide: above 1440px.

Touch targets:

- Primary CTAs: at least 48px high.
- Icon/action buttons: at least 40px square where possible.
- Filmstrip chapter controls must remain reachable on 390px-wide screens.

Mobile anti-patterns:

- No hidden exit path in fullscreen journey.
- No horizontal overflow.
- No caption covering essential controls.
- No giant desktop hero typography inside detail panels.

## 10. Guardrails

Do:

- Keep the real Casa Cabane video and poster as the visual source of truth.
- Keep House of Wander warmer and more cinematic than Airbnb.
- Make the practical layer feel clear, compact, and trustworthy.
- Add source notes when facts come from Airbnb public pages.
- Keep Amigo honest about prototype vs future platform capability.
- Keep Airbnb photo references separate from public display until
  owner-approved image exports exist.
- Keep private Airbnb conversations out of Git; Amigo/Toon training starts from
  a GDPR export or approved channel-manager route.

Do not:

- Clone Airbnb's exact UI, logo, or brand palette.
- Add a booking backend, CMS, analytics, deployment, or generated loops without
  explicit approval.
- Invent amenities, prices, policies, safety claims, or reviews.
- Hide the Airbnb handoff behind a custom checkout-looking flow.
- Scrape logged-in Airbnb host inboxes, change account settings, send messages,
  or store credentials/cookies in the repository.
