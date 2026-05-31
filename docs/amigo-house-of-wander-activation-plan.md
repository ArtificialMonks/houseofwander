# Amigo x House of Wander Activation Plan

Updated: May 31, 2026

## Product Recommendation

Activate Amigo as a visible guide layer before building a real backend. The
website should now show the concept clearly:

- guests get guided through collection, stay details, and booking handoff;
- Maaike & Laudi get a future host/operator concept;
- Airbnb stays the current transaction layer;
- direct booking is framed as the later platform phase.

This keeps the prototype client-ready without implying live automation that does
not exist yet.

## Casa WeZienWel Pilot Decision

The first real Airbnb-Amigo workflow should be tested on Casa WeZienWel, not on
Maaike and Laurens' active host account.

This gives Artificial Monks a safer path to learn from real host communication
while protecting House of Wander's current Airbnb operations. Casa WeZienWel is
the proving ground for export import, message classification, booking context,
draft replies, and Amigo memory before the same workflow is offered to other
hosts.

The first live integration target is a compliant PMS/channel-manager bridge with
official Airbnb connectivity. Free, trial, and open-source options should be
researched, but an open-source PMS is only acceptable as a dashboard or data
model base unless it connects to Airbnb through an approved API route.

## Guest-Facing Amigo Concept

Amigo appears as a floating guide on both the collection page and Casa Cabane.
In this pass, it is a scripted prototype with suggested questions and clear
answers. It can guide guests to:

- Casa Cabane as the first prototype stay;
- quick facts, amenities, reviews, rules, and location;
- the walkthrough experience;
- Airbnb for live dates, price, payment, cancellation, and messaging.

Future live Amigo should be grounded in structured source files, not loose page
copy.

## Backend / Operator Concept For Maaike & Laudi

Future Amigo should become a host cockpit that helps manage:

- guest questions before booking;
- Airbnb inquiries and recurring answers;
- direct booking inquiries from the House of Wander website;
- property facts, amenities, rules, check-in/out, and safety notes;
- handoff status between Airbnb and direct bookings;
- content updates when photos, video, rules, or amenities change.

This requires a real data model, source-of-truth policy, authentication,
message logging, and booking/payment decisions before implementation.

For the Casa WeZienWel pilot, this cockpit should start with:

- imported Airbnb export conversations;
- reservation context for each thread;
- source-aware draft replies;
- host tone and FAQ memory;
- no auto-send;
- no listing, pricing, calendar, payout, or payment mutation;
- full archive storage outside Git with access controls and audit logs.

## Phased Roadmap

### Now / Prototype

- Add the Amigo guide UI as a scripted layer.
- Move key stay and Airbnb data into `source/`.
- Keep Airbnb as the final transaction path.
- Make direct booking visible as a future direction only.
- Keep the live app honest that Amigo is not yet connected to Airbnb.

### Next / Client-Ready

- Add source badges: Airbnb public, host confirmed, prototype copy, needs
  confirmation.
- Add a stronger sticky booking panel on desktop and sticky booking CTA on
  mobile.
- Expand the collection model for every stay.
- Confirm all Casa Cabane facts with Maaike & Laudi.

### Casa WeZienWel / Safe Operator MVP

- Import the official Airbnb export outside Git.
- Parse messages and bookings into a private archive.
- Build a message-and-booking dashboard view for Casa WeZienWel.
- Let Amigo draft replies with citations to source snippets or house docs.
- Require human approval and manual sending.
- Research PMS bridges that can provide official Airbnb message and booking
  access through API/webhooks.

### Later / Direct Booking Platform

- Add availability and pricing source.
- Add direct inquiry or checkout.
- Add payment and cancellation logic.
- Add host inbox and guest messaging.
- Add Amigo with real retrieval, source citations, and escalation to hosts.
- Expand from Casa WeZienWel to House of Wander and selected external hosts only
  after the safety model is proven.

## Concrete UI Changes Activated

- Collection page now has an Amigo system band.
- Casa Cabane now has an Amigo stay-plan band.
- Both pages now include a floating Amigo prototype guide.
- Casa Cabane mobile now has a sticky Airbnb booking shortcut.
- Structured source files now exist under `source/`.
- Asset tracking begins in `assets/manifest.json`.

## Implementation Notes

Current implementation files:

- `app/components/amigo-guide.tsx`
- `app/page.tsx`
- `app/casa-cabane/page.tsx`
- `app/globals.css`
- `source/brand.json`
- `source/nav.json`
- `source/stays/index.json`
- `source/stays/casa-cabane.json`
- `source/airbnb/casa-cabane-snapshot.json`
- `assets/manifest.json`

Not implemented yet:

- live AI;
- chat persistence;
- host login;
- Airbnb sync;
- direct booking;
- payments;
- CMS.

Still explicitly out of scope until approved:

- private Airbnb inbox scraping;
- browser automation on Maaike and Laurens' account;
- automated guest-message sending;
- changing Airbnb listings, pricing, calendar, availability, or house rules;
- storing Airbnb exports, raw transcripts, cookies, tokens, or guest PII in Git.
