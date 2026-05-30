---
name: next-houseofwander
description: Decide and orchestrate the next best step for the House of Wander / Casa Cabane prototype by inspecting live repo state, then routing the right design skills through Opus 4.8 subagents. Advisor-default (recommends, does not execute unless asked); on explicit execute/build/ship it fans out parallel Opus 4.8 subagents via Claude Code Workflows, reserving /team for cross-model work only. Use when the operator asks "what's next", "improve/redesign a page", "build/ship this", or "orchestrate the design work" for this codebase.
---

# Next House of Wander

A repo-specific advisor + orchestrator for the **House of Wander / Casa Cabane**
prototype: Next.js 16 (App Router) + React 19 + TypeScript (strict) + raw
three.js 0.184 + vanilla CSS (`app/globals.css`), static/SSG, **no backend by
design**. Modeled on `listo-next`, adapted to a cinematic front-end stack.

Use this skill when the operator asks what to do next, to improve/redesign a
page, to build or ship work, or to orchestrate the available design skills.

## Operating modes

- **ADVISOR (default).** Inspect live state, recommend the single best next
  step + a dependency-ordered plan with evidence gates, and **stop**. Make NO
  repo changes. It is valid to answer `No skill needed`.
- **EXECUTE (only when the operator says execute / build / ship / orchestrate).**
  Run the plan via the orchestration policy below.

## Required behavior

1. **P0 — State scan (always, read-only, parallel reads).** Before recommending
   anything, gather evidence:
   - `git status` + current branch; confirm `.mcp.json` is still the sole MCP
     source of truth and matches intent (currently empty).
   - Versions: Next 16.2.6 / React 19.2.6 / three 0.184 (from `package-lock.json`).
   - Routes present: `/`, `/stays`, `/stays/[slug]` (×3 SSG), `/casa-cabane`
     (redirect). Content from `source/*.json` via `app/lib/stays.ts`.
   - Read `DESIGN.md` + `CLAUDE.md` guardrails.
   - Baseline gates: `npm run build` green, and
     `bash ~/.claude/skills/reduced-motion/detect.sh` returns **ZERO** (inverted
     exit code: exit 1 = clean, exit 0 = references found = FAIL).
   - Confirm real media exists (`public/media/casa-cabane-walkthrough.mp4`,
     poster).
2. **P1 — Advise.** Emit: the chosen next step, a dependency-ordered plan, the
   task-type → skill routing for it (see table), explicit evidence gates, and
   exactly **one safest next command**. Prefer **local project skills first**;
   reach for global skills only when they clearly fit. Stop here unless the
   operator asked to execute.
3. **P2 — Plan-lock (execute only).** Expand the step into a DAG of work units.
   Mark disjoint-file units **parallelizable**; mark any `app/globals.css` edit
   **serialized-single-writer**. Pick the lane (native fan-out vs `/team`).
   Define per-unit acceptance + rollback.
4. **P3 — Fan-out (execute only).** Spawn Opus 4.8 subagents per route/asset on
   **non-overlapping files**, each routed to the correct design skill. Serialize
   all `globals.css` writes through ONE writer (or partition by non-overlapping
   selector blocks and apply sequentially).
5. **P4 — Per-unit self-verify (before merge).** Each subagent type-checks its
   slice (typescript-lsp), re-runs reduced-motion detect on its diff (must stay
   ZERO), and self-checks DESIGN.md compliance.
6. **P5 — Global gate (execute only, serial, hard-blocking).** See gates below.
   Any red → **fix-first**: halt all forward progress and fix before continuing.
7. **P6 — Handoff.** Per CLAUDE.md split, hand build/wiring/mobile-viewport
   verification to **Codex** (`codex-vibes`). Write any new screenshots/renders
   ONLY into a fresh `renders/<YYYYMMDD-HHMMSS>-vNN/` folder (never overwrite).
   Emit a changed-files + verification + next-step summary.

## Orchestration policy

- **Default engine = native Claude Code Workflow / Agent fan-out** with Opus 4.8
  subagents (the harness this skill itself was designed with). It shares repo
  context, returns structured results the parent can hard-gate on, and has no
  process overhead. Use it for audits, per-route TSX edits, copy passes, and the
  3× SSG stay regenerations.
- **Reserve `/team` (OMC process-team) ONLY** when you genuinely need a separate
  persistent process or a *different model*: cross-model UI comparison, a
  `gemini-vibes` second opinion, or the Codex build/verify split. For a single
  static surface, `/team` is over-orchestration — do not default to it.
- **Subagent model:** inherit the session's Opus 4.8 (`claude-opus-4-8`); never
  downgrade. Use official Anthropic model IDs only — never invent bracketed
  `[...]` suffixes. Keep per-task-class semantics (UI / copy / debug) as metadata.
- **No nested invisible subagents:** a dispatched subagent must not silently
  spawn its own; re-delegate through this skill so all work stays visible.

## Skill routing (use EXACT skill names; local skills first)

| Task type | Chain | Parallelizable |
|---|---|---|
| Advise / next-step (default) | `next-houseofwander` → `writing-plans`; `brainstorming` only if intent is ambiguous | No (read-only scan reads may parallel) |
| Polish an EXISTING page (`app/page.tsx`, `stay-experience.tsx`) | `redesign-existing-projects` (audit-first, vanilla-CSS-safe) → `design-taste-frontend` for anti-slop → `verification-before-completion` | Audits parallel; **CSS writes serialized single-writer** |
| New premium surface / hero from scratch | `design-taste-frontend` → `minimalist-ui` for warm-editorial detail layers | Yes across disjoint route files; No within `globals.css` |
| Detail / decision layer (Airbnb-handoff facts, sticky rail) | `minimalist-ui` → `business-copywriter` (no dashes, no invented facts) | Yes if facts pre-locked from `source/*.json` |
| Copy / headlines / CTA / brand voice | `business-copywriter`; `branching-questionnaire` when the user wants to pick between variants | Yes (independent text artifacts) |
| Model-vs-model UI competition | `ui-battle` / `ui-subagents` + `visual-verdict` + `playwright`/`agent-browser` — **DEGRADED: Agent Runs dashboard is NOT present in this repo.** Falls back to a single-model native compare unless the harness is stood up | Yes via `/team` (the one place process-team earns its cost) |
| Build / wiring / mobile verification | `commit-fix` → `codex-vibes` (Codex is the mandated verifier) → `playwright`/`agent-browser` for viewports; reduced-motion detect | Viewport runs parallel; build is a serial gate |
| Debug regression / broken behavior | `systematic-debugging` → typescript-lsp → `code-review` | No (root-cause is sequential) |
| Google media generation (`veo-build` / `nano-banana-use`) | **HARD-GATED — default REFUSE.** Blocked by the no-fake-footage + no-paid-AI-without-approval rules; needs explicit approval + GCP creds + a `.mcp.json` entry first. Recommend real Casa Cabane media instead | N/A until approved |
| Pre-commit / ship | `verification-before-completion` → `code-review` → `commit-fix` (commit only if asked; branch off `main` first) | No (serial hard gate) |
| Bold/data-heavy editorial (rare, off-brand) | `industrial-brutalist-ui` — use sparingly; flag the DESIGN.md tone conflict before applying | No (needs tone sign-off) |

## Verification gates (evidence required — never claim done without proof)

- **BUILD GREEN:** `npm run build` exits 0, all routes compile under Next 16.2.6
  Turbopack. Hard block.
- **REDUCED-MOTION ZERO:** `bash ~/.claude/skills/reduced-motion/detect.sh`
  reports zero references (exit 1) on the whole repo and on every subagent diff.
  Any introduction = motion-policy regression → invoke the `reduced-motion`
  skill to collapse to the full-animated path, then re-gate. **Never add
  `prefers-reduced-motion` / `useReducedMotion` / `motion-reduce:`.**
- **WIRING-VALIDATION:** `app/lib/stays.ts` resolves casa-cabane / casa-fabiola /
  louise-marie → 3 generated SSG pages; every referenced `public/media` path
  exists (incl. the 63 MB walkthrough mp4 + poster); no dead imports;
  `/casa-cabane` still redirects; no horizontal overflow at 390 px.
- **DESIGN.md COMPLIANCE:** scarce **single** gold accent per section; palette
  stays ink/paper/gold/clay/moss; NO Airbnb logo / Rausch-red / exact-UI clone;
  Airbnb-handoff booking only (no fake checkout/price/availability); no invented
  amenities/reviews/policies; warmer + more cinematic than Airbnb.
- **MEDIA INTEGRITY:** only real Casa Cabane media; no generated/invented footage
  without explicit approval; source media never replaced/deleted; new exports go
  to a fresh `renders/<ts>-vNN/`.
- **MCP SOURCE-OF-TRUTH:** root `.mcp.json` stays the sole MCP source and stays
  empty unless the user approves a server.
- **TYPE/LSP CLEAN:** TypeScript strict passes on changed files (zero new errors).
- **CODEX SIGN-OFF:** build/wiring/mobile verified by Codex per the CLAUDE.md
  agent split before declaring done.

## Reviewer / wiring-validator role (pinned)

Per CLAUDE.md, **Codex is the final code-quality reviewer, fixer for actionable
issues, and wiring/integration validator.** This role is fixed: no individual
run reassigns it. Every substantial change needs a wiring-validation phase
proving page route → component tree → three.js mount → media/asset path →
`globals.css` token surface → build output are connected as intended (the
front-end analogue of a full-stack wiring proof — there is no backend here).

## Fix-first discipline

Any actionable failure (build break, type error, broken asset wiring, visual
regression, motion-policy hit) **halts planning** and is fixed before scope
expands. Do not defer, document-for-later, or work around.

## Risks & fallbacks (front-load these)

- **CSS collision** (top risk): parallel writers on the 2.5k-line
  `globals.css` clobber each other → cap to ONE serialized writer or partition by
  non-overlapping selector blocks applied sequentially.
- **Motion regression** from vendored components / AI defaults → run detect.sh as
  a pre-merge gate per diff and repo-wide; strip on any hit.
- **Missing Agent Runs dashboard** → degrade `ui-battle`/`ui-subagents` to a
  single-model native pass + `visual-verdict`/`playwright` screenshot compare;
  tell the user the harness must be built for true model-vs-model.
- **Missing Gemini/GCP keys or empty `.mcp.json`** → do NOT silently skip; refuse
  the generation/cross-model lane, recommend real media, and ask the user to
  approve + add the server/key to root `.mcp.json` first.
- **Build failure** → fix-first; ensure three.js stays client-only (`"use
  client"` / no SSR); re-run until green before any commit.
- **Codex unavailable** → fall back to `playwright`/`agent-browser` +
  `verification-before-completion`, and flag that Codex sign-off is still pending.
- **`renders/` overwrite** → always `mkdir` a new timestamped folder before
  writing; if unsure, abort the write rather than risk overwriting prior outputs.
- **Ambiguous execute request** → drop back to advisor-default and emit the plan
  + gates rather than spawning workers on an unclear spec.

## Guardrail summary (hard constraints, always on)

- Motion is **always on** — never add reduced-motion handling.
- No backend / DB / CMS / analytics / paid AI generation without explicit approval.
- MCP servers only from root `.mcp.json` (single source of truth).
- Real Casa Cabane media only; preserve source media and prior render outputs.
- Do not execute unless the operator explicitly asks.
