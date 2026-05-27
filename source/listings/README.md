# House of Wander Listing Source Notes

This folder holds collection-level source material for the House of Wander
knowledge base.

- `house-of-wander-master-knowledge-base.md` is the May 27, 2026 source drop
  from the Claude research pass.
- Structured app data lives in `source/stays/*.json`.
- Public Airbnb snapshots live in `source/airbnb/*.json`.
- Airbnb-hosted photo URLs are reference-only. They are not downloaded or
  displayed by the app until owner-approved image exports are provided.

Safe boundary: do not place private guest conversations, host cookies, Airbnb
session tokens, or exported account archives in Git. Use a private storage
bucket or encrypted vault for conversation corpora.
