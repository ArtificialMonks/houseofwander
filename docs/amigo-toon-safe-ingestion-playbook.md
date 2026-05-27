# Amigo + Toon Safe Airbnb Ingestion Playbook

Date: May 27, 2026

This is the safe route for turning Laurens and Laudi's Airbnb knowledge into
Amigo and Toon without risking the host account.

## Current Boundary

This repo now contains:

- public Airbnb listing facts
- public listing snapshots
- reference-only photo URLs
- a future training schema
- forbidden-action guardrails

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

## Future Technical Options

- GDPR export: safest initial corpus.
- Channel manager API: best ongoing route if House of Wander uses Hospitable,
  Smoobu, Hostaway, or similar.
- Browser automation: only later, only with explicit approval, and only in
  read-only mode unless the team approves a specific action.

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

## Immediate Next Step

Ask Laurens to request the Airbnb account data export. Once the export exists,
build a private parser and redaction pipeline before any model training or RAG
work begins.
