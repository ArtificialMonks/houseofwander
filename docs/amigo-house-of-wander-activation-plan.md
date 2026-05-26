# Amigo x House of Wander Activation Plan

## Product Recommendation

Activate Amigo as a visible guide layer before building a real backend. The
website should now show the concept clearly:

- guests get guided through collection, stay details, and booking handoff;
- Maaike & Laudi get a future host/operator concept;
- Airbnb stays the current transaction layer;
- direct booking is framed as the later platform phase.

This keeps the prototype client-ready without implying live automation that does
not exist yet.

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

## Phased Roadmap

### Now / Prototype

- Add the Amigo guide UI as a scripted layer.
- Move key stay and Airbnb data into `source/`.
- Keep Airbnb as the final transaction path.
- Make direct booking visible as a future direction only.

### Next / Client-Ready

- Add source badges: Airbnb public, host confirmed, prototype copy, needs
  confirmation.
- Add a stronger sticky booking panel on desktop and sticky booking CTA on
  mobile.
- Expand the collection model for every stay.
- Confirm all Casa Cabane facts with Maaike & Laudi.

### Later / Direct Booking Platform

- Add availability and pricing source.
- Add direct inquiry or checkout.
- Add payment and cancellation logic.
- Add host inbox and guest messaging.
- Add Amigo with real retrieval, source citations, and escalation to hosts.

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

