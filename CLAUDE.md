# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This project is the local House of Wander prototype, with Casa Cabane in Stekene as the flagship guided stay.

## Current Goal

Prove a premium walkthrough website experience using Maaike & Laudi's real Casa Cabane video as the main spatial asset. Keep the prototype focused on proof-of-feel — a guided collection + stay walkthrough, not a full booking platform yet.

## Commands

```bash
npm install            # Install dependencies
npm run dev            # Dev server (Next.js + Turbopack) on http://localhost:3000
npm run build          # Production build — ALWAYS run before handing work back
npm start -- -p 3000   # Serve the production build (cleaner demo, no dev indicator)
npm run install-skills # Re-pull/update the vendored AI Design Studio skills (see below)
```

There is no test runner, linter, or typecheck script configured. `npm run build` runs `next build`, which type-checks the whole project (TypeScript `strict` is on) and fails on type errors — treat a green build as the verification gate.

For a clean demo, prefer `npm run build` then `npm start -- -p 3000`, then open `http://localhost:3000`.

## Architecture

Next.js (App Router) + TypeScript, single app, no database or backend. Pages are statically generated; all displayed content comes from JSON in `source/` and media in `public/media/`.

**Content-as-source-of-truth.** UI components are generic renderers; the actual stay copy, facts, chapters, and Amigo answers live in JSON. To change site content, edit `source/` JSON — not the components.

- `source/stays/<slug>.json` — one file per stay, conforming to the `StaySource` type **exported from `app/components/stay-experience.tsx`** (`slug`, `name`, `tagline`, `description`, `media[]`, optional `chapters[]`/`videoSrc`/`posterSrc`/`runtimeSeconds`, plus source-labelled detail blocks: `quickFacts[]`, `trustSignals[]`, `listingHighlights[]`, `stayStory[]`, `amenityGroups[]`, `reviewScores[]`, `reviewMentions[]`, `bookingSteps[]`, `houseNotes[]`, `amigoStayPlan[]`, `amigoPrompts[]`, and a `styleVariant` of `editorial-warm` | `coastal-light` | `boutique-night`). This type is the contract: extend the type and the JSON together. Detail items carry a `source` field rendered via the `SOURCE_LABELS` map in `stay-experience.tsx` (`airbnb-public`, `host-confirmed`, `prototype-copy`, `briefing-doc`, `needs-confirmation`, `project-media`, `owner-approved`).
- `source/stays/index.json` — the collection: stay cards, `productionLanes`, `amigoSystem`, `styleVariants`, and the collection-page `amigoPrompts`.
- `source/nav.json`, `source/brand.json` — nav and brand tokens.
- `source/airbnb/*-snapshot.json` — source-labelled public Airbnb facts (reference data, kept separate from host-confirmed facts).
- `source/voice/`, `source/listings/` — Amigo/Toon training schema and listing knowledge base.

**Data flow.** `app/lib/stays.ts` imports the three per-stay JSON files and exposes `stays`, `staysBySlug`, and `getStayBySlug(slug)`. The dynamic route `app/stays/[slug]/page.tsx` uses `generateStaticParams()` (from `stays`) + `generateMetadata()` and renders `<StayExperience stay={stay} />`. Unknown slugs `notFound()`.

**Routes** (see `README.md` for the user-facing list):
- `/` (`app/page.tsx`) — brand gateway, a client component with a Three.js object and the Amigo guide.
- `/stays` (`app/stays/page.tsx`) — priority collection landing page.
- `/stays/[slug]` — per-stay guided walkthrough via `StayExperience`.
- `/casa-cabane` — server redirect to `/stays/casa-cabane` (compatibility only).

**Key components:**
- `app/components/stay-experience.tsx` — the large `"use client"` cinematic walkthrough (poster gateway → fullscreen video journey with chapters/timecode/controls → Airbnb-informed detail layer). Owns the `StaySource` type. This is the most-edited file in the repo.
- `app/components/amigo-guide.tsx` — scripted UI chatbot prototype (not a live AI agent or backend). It must keep labelling source boundaries and never imply live availability, pricing, payment, or Airbnb sync.

**Styling.** All CSS lives in `app/globals.css` (plain CSS, no Tailwind/CSS-modules). `app/layout.tsx` imports it globally.

**Imports** use relative paths (no `@/` alias). JSON is imported directly (`resolveJsonModule` is on).

## Design source of truth

`DESIGN.md` is the authoritative design spec (product feel, color palette, type, layout, components, responsive rules, guardrails). Read `README.md`, this file, `DESIGN.md`, `app/page.tsx`, and `app/globals.css` before any UI change.

## AI Design Studio skills

The design skill set from `ArtificialMonks/ai-design-studio` is vendored into `.claude/skills/` and discoverable by Claude Code in this repo. Invoke by **skill name** (not folder name):

- `design-taste-frontend` (`taste-skill`) — default for premium, anti-slop pages.
- `minimalist-ui` (`minimalist-skill`) — clean warm editorial surfaces; good for the detail/decision layer.
- `industrial-brutalist-ui` (`brutalist-skill`) — bold/raw; off-brand here, use sparingly.
- `redesign-existing-projects` (`redesign-skill`) — audit + upgrade existing pages without breaking them.
- `ui-subagents`, `ui-battle` — model-vs-model design workflows (need the studio's Agent Runs harness, not present here — reference only).
- **Gated (paid Vertex AI, do NOT run without explicit approval):** `nano-banana-use`, `veo-build`, `google-genai-sdk-python`.

`npm run install-skills` re-pulls the external skills from their public source repos. See `DESIGN.md` §2 for the full routing table.

## Media rules

- App video: `public/media/casa-cabane-walkthrough.mp4`; poster: `public/media/casa-cabane-poster.jpg`.
- Per-stay main photos: `public/media/<Stay Name>/...avif` (referenced from `source/stays/*.json`).
- Versioned renders live under `renders/` (gitignored): e.g. `renders/casa-cabane-web-video/20260523-042046-v01/`.
- The committed `.mp4` is a deploy-safe web encode. The HQ master stays in Dropbox as `public/media/casa-cabane-walkthrough-master-local.mp4` and is gitignored; regenerate the deploy encode when the master changes.
- Do NOT replace or delete source media unless the user provides a better original and explicitly asks to update the asset.
- Preserve previous render/export outputs. New screenshots, renders, or exports go into a new timestamped folder under `renders/`.
- Broader Airbnb galleries stay reference-only until owner-approved exports exist. Keep private Airbnb conversations out of Git; Amigo/Toon training starts from a GDPR export or approved channel-manager route, never logged-in scraping.

## Collaboration rules

- Keep edits scoped to the prototype unless the user asks for a wider site.
- Do not add public deployment, booking backend, CMS, analytics, or paid AI generation without explicit approval.
- Airbnb is the default booking CTA until the team chooses a direct booking or inquiry path. Never imply live price, availability, cancellation, payment, or host messaging unless that data is live and verified.
- MCP servers are configured ONLY in the root `.mcp.json` (single source of truth). It is currently empty.
- Run `npm run build` before handing work back, and leave a clear summary of changed files, verification, and the next recommended step.

## Working path note

This repo lives at multiple paths across machines (a Dropbox-synced copy at `…/ArtificialMonks/Projects/houseofwander` with a `~/houseofwander` symlink, and local clones such as the current working directory). Always operate on the repository root of the directory Claude Code was launched in; do not hardcode another machine's absolute path into code, docs, or handoffs.

## Tutorial workflow (visual direction only)

Two tutorials inform the workflow as *inspiration*, not a requirement to use external paid tools:
- Chase AI — "Claude Design + Seedance 2.0" (`https://www.youtube.com/watch?v=7uW1SKmx-Ic`): Phase 1 Image → Phase 2 Claude Design → Phase 3 Video + Handoff.
- Nate Herk — "Seedance 2.0 + Claude Code" (`https://www.youtube.com/watch?v=NvxiSG34mPU`): Claude Code setup → image/source → seamless loop (matched first/last frame) → prompt drafting → bring asset in → build locally → iterate → GitHub/Vercel only after approval.

For Casa Cabane: use real walkthrough frames as the visual source of truth before any generation tool; any future loop prompt should favor slow natural movement, stable architecture, no audio, no object morphing, and a seamless first/last frame. Treat Seedance/Higgsfield-style generated loops as optional, approval-gated enhancements — do not invent fake generated footage. See `docs/tutorial-learning-notes.md`.

## Recommended agent split

- **Claude** — design iteration and high-taste UI direction, scroll/chapter composition, copy and spatial storytelling, exploring transition ideas without paid generation.
- **Codex** — integrating final changes safely, build checks, browser/mobile verification, keeping the project and Artificial Monks handoff organized.
