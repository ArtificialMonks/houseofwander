# House of Wander Collection + Amigo Update

Date: May 26, 2026  
For: Joey, Jo, Maaike, Laurens, and the House of Wander team

## What changed

House of Wander has moved from a one-stay prototype into a full collection
scaffold.

- `/` is the brand gateway with the 3D House of Wander object.
- `/stays` is the collection landing page.
- `/stays/casa-cabane` is the flagship stay page with the guided walkthrough.
- `/stays/casa-fabiola`, `/stays/louise-marie`,
  `/stays/thelma-louise`, `/stays/heritage-collection`, and
  `/stays/the-love-nest` now exist as structured stay pages.
- `/casa-cabane` redirects to `/stays/casa-cabane` so older links still work.
- `/style-lab` compares three visual directions: Editorial Warm, Coastal Light,
  and Boutique Night.

## Source model

Every stay now has a structured JSON file in `source/stays/`.

The source model separates:

- confirmed or local media
- public Airbnb facts
- briefing-document story
- prototype copy
- missing host confirmations

Casa Cabane remains the most complete stay because it has local approved media,
chapter timings, the walkthrough video, and Airbnb-informed facts.

The Love Nest has public Airbnb facts from Airbnb room
`1025111265786397251`, but the page does not copy Airbnb-hosted photos.

The other stays have story scaffolds from the briefing document and visible
team to-dos for Airbnb URLs, facts, and approved photos.

## Amigo status

Amigo is now designed as a source-aware guided UI, not a live AI backend yet.

It can:

- help guests choose where to start
- explain which stays are ready
- explain what comes from public Airbnb data
- point out what still needs host confirmation
- route guests to Airbnb when a booking URL exists

It does not yet:

- check live price or availability
- process payment
- sync Airbnb messages
- read a host inbox
- manage direct bookings
- use a live LLM backend

## Airbnb and photo guardrails

The site uses Airbnb as a workflow reference, not as a brand clone.

Safe defaults:

- Use public Airbnb facts only where accessible.
- Keep live prices, dates, cancellation, payment, and guest-host messaging on
  Airbnb.
- Do not copy Airbnb-hosted photos into the website without owner approval.
- Use gallery placeholders until Maaike and Laurens provide approved image
  exports.

## Team to-dos

Highest priority:

1. Confirm official Airbnb URLs for Casa Fabiola, Louise Marie, Thelma &
   Louise, Heritage Collection, and each Heritage sub-apartment.
2. Export owner-approved photo sets for every stay.
3. Confirm guest capacity, bedroom setup, beds, bathrooms, amenities, rules,
   safety notes, and parking/access details for each stay.
4. Confirm whether The Love Nest is part of the final House of Wander
   collection and whether the public Airbnb room found is the correct listing.
5. Approve which style direction should become the default: Editorial Warm,
   Coastal Light, or Boutique Night.
6. Decide when Amigo should move from scripted UI to live AI/backend.

## Recommended next build pass

Make the pages client-presentation ready by replacing placeholders with
approved image sets and confirming the missing listing facts. After that, Amigo
can become a real retrieval-backed assistant over the structured stay data,
briefing docs, and host-approved house rules.
