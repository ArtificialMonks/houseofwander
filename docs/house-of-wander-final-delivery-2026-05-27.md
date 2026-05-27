# House of Wander Final Delivery Update

Date: May 27, 2026  
For: Joey, Jo, Maaike, Laudi, Laurens, and the House of Wander team

## Where to review

- Live site: https://houseofwander-ochre.vercel.app
- GitHub repo: https://github.com/ArtificialMonks/houseofwander
- The current production commit and deployment ID are listed in the GitHub and
  Vercel project history.

## What is now built

House of Wander is now a collection-ready prototype instead of a Casa Cabane-only
proof.

- `/` remains the House of Wander gateway with the 3D object.
- `/stays` is the collection overview.
- `/stays/casa-cabane` is the flagship guided walkthrough.
- `/stays/casa-fabiola` now uses public Airbnb facts.
- `/stays/louise-marie` now uses public Airbnb facts.
- `/stays/thelma-louise` now maps to the Blankenberge Airbnb listing from
  Laurens' URL list, with brand-name confirmation still flagged.
- `/stays/the-love-nest` now uses updated public Airbnb facts.
- `/stays/ghent-group-house` is added from the provided public Airbnb URL.
- `/stays/heritage-collection` remains a parent concept until the five unit
  names and URLs are confirmed.
- `/style-lab` remains the house-style comparison page.

## Data integrated

The source model now includes public listing snapshots for:

- Casa Cabane — Airbnb ID `962896812968290131`
- Casa Fabiola — Airbnb ID `51655826`
- Louise Marie — Airbnb ID `563442400500577170`
- Thelma & Louise provisional map — Airbnb ID `52296316`
- The Love Nest — Airbnb ID `1025111265786397251`
- Ghent Group House — Airbnb ID `1559436233376573149`

Every stay page now has a visible source map with listing title, listing ID,
public source status, and links. Facts are labelled as public Airbnb data,
briefing source, prototype copy, owner-approved media, or confirmation needed.

## Image handling

Airbnb-hosted photo URLs were not downloaded and are not displayed by the site.
They are stored as reference-only in `source/airbnb/photo-references.json`.

The website still uses:

- local owner-approved Casa Cabane media
- placeholders for non-approved gallery images

The next asset task is for Maaike, Laudi, or Laurens to provide owner-approved
photo exports for each stay.

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

1. Confirm whether Airbnb listing `52296316` is officially Thelma & Louise.
2. Confirm whether the Ghent 10-person house should be branded inside House of
   Wander and under which name.
3. Share the five Heritage Collection apartment names and URLs.
4. Provide owner-approved image exports for all non-Casa Cabane stays.
5. Decide whether The Love Nest and the Ghent Group House are public collection
   members or co-hosted inventory only.
6. Decide when to request the Airbnb GDPR data export for Amigo/Toon training.
7. Decide when to move from Airbnb handoff to direct booking discovery.

## Safety boundary

The final version uses public Airbnb listing pages and the provided Claude
research files only. It does not rely on private account access or unsafe
scraping.

## Verification completed

- `npm run build` passes locally with Next.js 16.2.6.
- GitHub `main` is pushed and clean.
- Vercel production deployment is ready and promoted.
- Live route checks pass for `/`, `/stays`, all stay detail pages,
  `/style-lab`, and the `/casa-cabane` redirect.
- Browser QA screenshots were captured for desktop, mobile, and the Casa Cabane
  guided journey in `renders/house-of-wander-live-deploy/`.
