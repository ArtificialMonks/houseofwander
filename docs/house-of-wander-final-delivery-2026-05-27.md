# House of Wander Final Delivery Update

Date: May 27, 2026  
For: Joey, Jo, Maaike, Laudi, Laurens, and the House of Wander team

## Where to review

- Live site: https://houseofwander-ochre.vercel.app
- GitHub repo: https://github.com/ArtificialMonks/houseofwander
- The current production commit and deployment ID are listed in the GitHub and
  Vercel project history.

## What is now built

House of Wander is now a focused three-stay prototype instead of a Casa
Cabane-only proof.

- `/` remains the House of Wander gateway with the 3D object.
- `/stays` is the priority collection overview.
- `/stays/casa-cabane` is the flagship guided walkthrough.
- `/stays/casa-fabiola` now uses public Airbnb facts and a local main photo.
- `/stays/louise-marie` now uses public Airbnb facts and a local main photo.
- The other listings are removed from the public collection for now.
- `/style-lab` remains the house-style comparison page.

## Data integrated

The source model now includes public listing snapshots for:

- Casa Cabane — Airbnb ID `962896812968290131`
- Casa Fabiola — Airbnb ID `51655826`
- Louise Marie — Airbnb ID `563442400500577170`

Every stay page now has a visible source map with listing title, listing ID,
public source status, and links. Facts are labelled as public Airbnb data,
briefing source, prototype copy, project media, or confirmation needed.

## Image handling

Airbnb-hosted photo URLs were not downloaded and are not displayed by the site.
They are stored as reference-only in `source/airbnb/photo-references.json`.

The website now uses:

- local project-media main photos for Casa Cabane, Casa Fabiola, and Louise
  Marie
- placeholders only for wider gallery expansion

The next asset task is for Maaike, Laudi, or Laurens to provide owner-approved
photo exports for any additional gallery images.

## Amigo and Toon

Amigo is still intentionally a scripted, source-aware guide. It can explain
stays, source boundaries, booking handoffs, missing confirmations, and the
difference between public Airbnb facts and future direct booking.

Toon is not built as a live agent yet. The safe ingestion plan for Airbnb
conversations is documented in:

- `docs/amigo-toon-safe-ingestion-playbook.md`
- `source/voice/amigo-toon-training-schema.json`

No private Airbnb inbox scraping, login automation, message sending, pricing
changes, calendar changes, or host-account actions were performed.

## Open questions

1. Confirm whether the current three-stay focus is the right public-preview
   scope.
2. Provide owner-approved gallery exports beyond the main photos now integrated.
3. Decide which removed listings should return later and under which names.
4. Decide when to request the Airbnb GDPR data export for Amigo/Toon training.
5. Decide when to move from Airbnb handoff to direct booking discovery.

## Safety boundary

The final version uses public Airbnb listing pages and the provided Claude
research files only. It does not rely on private account access or unsafe
scraping.

## Verification completed

- `npm run build` passes locally with Next.js 16.2.6.
- GitHub `main` is pushed and clean.
- Vercel production deployment is ready and promoted.
- Live route checks pass for `/`, `/stays`, the three stay detail pages,
  `/style-lab`, and the `/casa-cabane` redirect.
- Browser QA screenshots were captured for desktop, mobile, and the Casa Cabane
  guided journey in `renders/house-of-wander-live-deploy/`.
