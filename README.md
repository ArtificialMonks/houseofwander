# House of Wander / Casa Cabane Prototype

Local prototype for proving the House of Wander collection gateway and the Casa Cabane guided walkthrough effect.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

- `/` - House of Wander brand gateway with the 3D object.
- `/stays` - Full collection landing page.
- `/stays/casa-cabane` - Casa Cabane guided walkthrough prototype.
- `/stays/the-love-nest` - Public Airbnb-fact prototype page with safe photo placeholders.
- `/style-lab` - Three house-style variations for the team to compare.
- `/casa-cabane` - Compatibility redirect to `/stays/casa-cabane`.

For a cleaner demo without the development indicator:

```bash
npm run build
npm start -- -p 3000
```

## Prototype Scope

- Uses the House of Wander team's Casa Cabane walkthrough as the first interactive stay asset.
- Adds a Three.js House of Wander object on the brand gateway.
- Adds reusable stay pages for the full briefing collection.
- Focuses on local proof-of-feel, not a public launch.
- Airbnb is the default CTA until the team chooses a direct booking or inquiry path.
- `DESIGN.md` is the design source of truth for future UI passes, combining
  House of Wander direction with AI Design Studio and Airbnb workflow lessons.
- `source/` holds structured brand, nav, stay, source-status, and Airbnb
  snapshot data so future stays do not have to start as hard-coded page copy.
- Amigo is currently integrated as a scripted UI chatbot prototype, not a live AI
  agent or backend. It now labels source boundaries and missing confirmations.

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

## Claude Workflow

Claude Code can be used as a design-iteration partner from this same project folder:

```bash
cd "/Users/wezienwel/Library/CloudStorage/Dropbox-We-zien-wel/Thomas Lambrechts/JJ - AI/ArtificialMonks/Projects/houseofwander"
claude
```

`/Users/wezienwel/houseofwander` is only a local shortcut symlink to this Dropbox project folder. Treat the Dropbox path as the canonical location so all project files stay together.

Use `CLAUDE.md` for project-local instructions and `docs/claude-casa-cabane-handoff.md` for a ready-to-paste Claude prompt.

Tutorial reference now captured in the handoff:

- `https://www.youtube.com/watch?v=7uW1SKmx-Ic`
- Workflow: Phase 1 Image, Phase 2 Claude Design, Phase 3 Video + Handoff
- `https://www.youtube.com/watch?v=NvxiSG34mPU`
- Workflow: Claude Code setup, image/source selection, Seedance loop, video prompt drafting, local website build, iteration, GitHub/Vercel later

See `docs/tutorial-learning-notes.md` for the combined Casa Cabane adaptation.
