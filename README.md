# House of Wander / Casa Cabane Prototype

Local prototype for proving the House of Wander collection gateway and the Casa Cabane guided walkthrough effect.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

- `/` - House of Wander brand gateway with the 3D object.
- `/stays` - Priority collection landing page.
- `/stays/casa-cabane` - Casa Cabane guided walkthrough prototype.
- `/stays/casa-fabiola` - Ghent apartment page with public Airbnb facts and main photo.
- `/stays/louise-marie` - Ostend apartment page with public Airbnb facts and main photo.
- `/casa-cabane` - Compatibility redirect to `/stays/casa-cabane`.

For a cleaner demo without the development indicator:

```bash
npm run build
npm start -- -p 3000
```

## Prototype Scope

- Uses the House of Wander team's Casa Cabane walkthrough as the first interactive stay asset.
- Adds a Three.js House of Wander object on the brand gateway.
- Adds reusable stay pages for the three priority stays: Casa Cabane, Casa
  Fabiola, and Louise Marie.
- Focuses on local proof-of-feel, not a public launch.
- Airbnb is the default CTA until the team chooses a direct booking or inquiry path.
- `DESIGN.md` is the design source of truth for future UI passes, combining
  House of Wander direction with AI Design Studio and Airbnb workflow lessons.
- `source/` holds structured brand, nav, stay, source-status, and Airbnb
  snapshot data so future stays do not have to start as hard-coded page copy.
- Amigo is currently integrated as a scripted UI chatbot prototype, not a live AI
  agent or backend. It now labels source boundaries and missing confirmations.
- The site now displays local project-media main photos for Casa Cabane, Casa
  Fabiola, and Louise Marie. Broader Airbnb-hosted galleries remain
  reference-only until owner-approved exports exist.
- Private Airbnb conversations are not stored in Git. Future Amigo/Toon training
  should start from an Airbnb GDPR export or an approved channel-manager route.

## Media

- App video: `public/media/casa-cabane-walkthrough.mp4`
- App poster: `public/media/casa-cabane-poster.jpg`
- Versioned video render: `renders/casa-cabane-web-video/20260523-042046-v01/casa-cabane-web-video.mp4`
- Versioned poster render: `renders/casa-cabane-poster/20260523-042046-v01/casa-cabane-poster.jpg`

The committed walkthrough video is a deploy-safe web encode. The high-quality
local master should stay in Dropbox as
`public/media/casa-cabane-walkthrough-master-local.mp4` and is intentionally
ignored by Git. When the master changes, regenerate the deploy encode at
`public/media/casa-cabane-walkthrough.mp4` before publishing. Add Git LFS or a
hosted media/CDN path before making this public-ready at full quality.

## Verified

- Production build passes with `npm run build`.
- Local production preview runs at `http://localhost:3000`.
- Desktop, phone, and tablet viewports were checked with the real walkthrough video.

## Knowledge Base

- Master listing reference:
  `docs/knowledge-base/house-of-wander-master-knowledge-base.md`
- Cross-check source:
  `docs/knowledge-base/our-collection-listings-crosscheck.md`
- Final delivery handoff:
  `docs/house-of-wander-final-delivery-2026-05-27.md`
- Safe Amigo/Toon ingestion:
  `docs/amigo-toon-safe-ingestion-playbook.md`

## Claude Workflow

Claude Code can be used as a design-iteration partner from the repo root:

```bash
cd <your-local-clone>/houseofwander
claude
```

The repo is machine-agnostic: clone it anywhere (or work in a Dropbox-synced
copy) and run from that root. Do not hardcode a specific machine's absolute
path into code, docs, or handoffs.

Use `CLAUDE.md` for project-local instructions and `docs/claude-casa-cabane-handoff.md` for a ready-to-paste Claude prompt.

### AI Design Studio skills

The design skill set from `ArtificialMonks/ai-design-studio` is vendored into
`.claude/skills/` so Claude Code can use it directly in this repo (design skills
`design-taste-frontend`, `minimalist-ui`, `industrial-brutalist-ui`,
`redesign-existing-projects`, plus `ui-subagents` / `ui-battle`, and the
approval-gated paid generation skills `nano-banana-use`, `veo-build`,
`google-genai-sdk-python`). See `DESIGN.md` section 2 for when to use which.
Re-pull or update the external skills with:

```bash
npm run install-skills
```

Note: `nano-banana-use` and `veo-build` call **paid Google Vertex AI** and must
not be run without explicit approval, per `CLAUDE.md` and `DESIGN.md` guardrails.

Tutorial reference now captured in the handoff:

- `https://www.youtube.com/watch?v=7uW1SKmx-Ic`
- Workflow: Phase 1 Image, Phase 2 Claude Design, Phase 3 Video + Handoff
- `https://www.youtube.com/watch?v=NvxiSG34mPU`
- Workflow: Claude Code setup, image/source selection, Seedance loop, video prompt drafting, local website build, iteration, GitHub/Vercel later

See `docs/tutorial-learning-notes.md` for the combined Casa Cabane adaptation.
