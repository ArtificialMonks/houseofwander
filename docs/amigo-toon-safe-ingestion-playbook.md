# Amigo + Toon Safe Airbnb Ingestion Playbook

Date: May 27, 2026
Updated: May 31, 2026

This is the safe route for turning Laurens and Laudi's Airbnb knowledge into
Amigo and Toon without risking the host account.

## May 31 Update - Casa WeZienWel First

The first Airbnb-Amigo functionality should be tested with Casa WeZienWel before
touching Maaike and Laurens' active hosting workflow.

The current decision is:

- Casa WeZienWel is the pilot property for Airbnb message and booking learning.
- Maaike and Laurens' Airbnb host account should not be used for experimental
  scraping, browser automation, auto-sending, or unapproved API tests.
- Amigo starts in draft-only mode: it can suggest replies, but a human sends the
  final message inside Airbnb or an approved PMS.
- Live Airbnb data should come only from an official PMS/channel-manager bridge
  or Airbnb partner path.
- The official Airbnb account export remains the safest first source for
  historical conversation learning.

## Current Boundary

This repo now contains:

- public Airbnb listing facts
- public listing snapshots
- reference-only photo URLs
- a future training schema
- forbidden-action guardrails
- implementation plans for safe Airbnb-Amigo workflows

This repo does not contain:

- private Airbnb guest conversations
- Airbnb login cookies or tokens
- host-account exports
- raw guest PII
- live pricing, calendar, payment, or messaging automation

## Recommended Data Routes

1. Request an Airbnb GDPR data export from the account owner.
2. Store the raw export outside Git in private encrypted storage.
3. Parse a redacted copy into the `source/voice/amigo-toon-training-schema.json`
   structure.
4. Label only the fields needed for Amigo and Toon: intent, tone, tactic,
   language, property, resolution, and outcome.
5. Keep Amigo in draft/source-aware mode until the team approves a live backend.
6. Keep Toon in host-approval mode until operations rules and escalation
   boundaries are tested.
7. For live data, shortlist official Airbnb-connected PMS/channel managers with
   API or webhook access before building any direct integration.

## Future Technical Options

- GDPR export: safest initial corpus.
- PMS or channel-manager API: best ongoing route if House of Wander uses an
  official Airbnb-connected provider such as Hospitable, Smoobu, Hostaway,
  Guesty, Lodgify, OwnerRez, or similar.
- Airbnb Partner Program: possible long-term route for Artificial Monks, but not
  assumed available until approved.
- Open-source PMS: useful as a dashboard or data-model base only; it is not a
  safe Airbnb bridge unless paired with an approved Airbnb API path.
- Browser automation: not a foundation for this project. It may only be
  considered in a separate research sandbox with explicit owner approval and no
  live host-account risk.

## MVP Scope

The first Casa WeZienWel version should focus on:

- messages and bookings only;
- official Airbnb export import for historical context;
- PMS/API bridge research for future live inbox and reservation sync;
- full private archive outside Git;
- Amigo draft replies with source-aware reasoning;
- human approval and manual sending;
- clear logs of which source informed each draft.

Do not add pricing, calendar updates, listing edits, payment handling, direct
booking, or auto-send in the first version.

## Forbidden Actions

- Do not scrape private inbox pages without explicit owner approval.
- Do not send Airbnb messages automatically.
- Do not alter listings, pricing, calendar, availability, house rules, or
  cancellation settings.
- Do not store credentials, cookies, session files, guest PII, or raw private
  transcripts in Git.
- Do not promise refunds, discounts, direct payment, late checkout, or exceptions
  without host approval.
- Do not move payment or guest-host messaging off Airbnb while Airbnb is the
  booking source of truth.
- Do not test risky workflows on Maaike and Laurens' Airbnb account while Casa
  WeZienWel can be used as the safer pilot.

## Immediate Next Step

Use the Casa WeZienWel Airbnb export as the first private corpus. Build a
private parser and redaction pipeline before any model training or RAG work
begins, then compare free, trial, open-source, and official PMS bridge options
for compliant live message and booking access.
