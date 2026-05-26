# Casa Cabane Prototype - Claude Instructions

This project is the local House of Wander prototype for Casa Cabane in Stekene.

## Current Goal

Prove a premium walkthrough website experience using Maaike & Laudi's real Casa Cabane video as the main spatial asset. Keep the prototype focused: one polished video-test page, not a full booking platform yet.

## Project Path

Canonical working path:

```bash
/Users/wezienwel/Library/CloudStorage/Dropbox-We-zien-wel/Thomas Lambrechts/JJ - AI/ArtificialMonks/Projects/houseofwander
```

Shortcut path:

```bash
/Users/wezienwel/houseofwander
```

The shortcut is a symlink to the Dropbox folder. Prefer the canonical Dropbox path in terminals, handoffs, and future agent instructions so all files stay together.

## Stack

- Next.js
- TypeScript
- CSS in `app/globals.css`
- Local media in `public/media/`

## Source Assets

- Video: `public/media/casa-cabane-walkthrough.mp4`
- Poster: `public/media/casa-cabane-poster.jpg`
- Versioned video render: `renders/casa-cabane-web-video/20260523-042046-v01/casa-cabane-web-video.mp4`
- Versioned poster render: `renders/casa-cabane-poster/20260523-042046-v01/casa-cabane-poster.jpg`

Do not replace or delete source media unless the user explicitly provides a better original file and asks for the asset to be updated.

## Collaboration Rules

- Read `README.md`, this file, `DESIGN.md`, `app/page.tsx`, and
  `app/globals.css` before editing.
- Keep edits scoped to the prototype unless the user asks for a wider site.
- Do not add public deployment, booking backend, CMS, analytics, or paid AI generation without explicit approval.
- Seedance/Claude tutorial inspiration should be treated as visual direction for transitions, mood loops, pacing, and premium composition. Do not invent fake generated footage.
- Tutorial reference: `https://www.youtube.com/watch?v=7uW1SKmx-Ic` by Chase AI, "Claude Design + Seedance 2.0 = INSANE Animated Websites". Use its workflow structure as inspiration, not as a requirement to use external paid tools.
- Tutorial reference: `https://www.youtube.com/watch?v=NvxiSG34mPU` by Nate Herk, "Seedance 2.0 + Claude Code Creates $10k Websites in Minutes". Use its workflow structure for looping background video, Claude Code prompting, local iteration, and later GitHub/Vercel deployment planning.
- Preserve previous render/export outputs. New screenshots, renders, or exports should go into a new timestamped folder under `renders/`.
- Run `npm run build` before handing work back.
- Leave a clear summary of changed files, verification, and next recommended step.

## Tutorial Workflow Adapted For This Prototype

The Chase AI tutorial frames the process as:

1. Phase 1: Image - establish the core visual direction and hero mood.
2. Phase 2: Claude Design - translate the visual direction into a refined landing-page composition.
3. Phase 3: Video + Handoff - add motion/video behavior, then package the result for implementation.

For Casa Cabane, adapt it like this:

- Phase 1: Use the real walkthrough poster/video frames as the visual source of truth instead of generating a fictional property image.
- Phase 2: Use Claude Design thinking for layout, pacing, typography, interaction, and premium composition.
- Phase 3: Use the existing Casa Cabane video for scroll/chapter motion. Only propose Seedance/Higgsfield-style generated loops as optional enhancements for later approval.

The Nate Herk tutorial adds a practical Claude Code pipeline:

1. Set up Claude Code in VS Code or terminal inside the project.
2. Create or choose an image source.
3. Turn the image into a seamless looping video by matching the first and last frame.
4. Ask Claude Code to write or refine concise video prompts.
5. Bring the finished video asset into the site.
6. Build the website locally with Claude Code.
7. Iterate in localhost until the design feels right.
8. Deploy through GitHub and Vercel only after local approval.

For Casa Cabane, this means:

- Use real Casa Cabane frames as the image source before considering Kie.ai, Higgsfield, Seedance, or any other generation tool.
- Any future loop prompt should prioritize slow natural movement, stable architecture, no audio, no object morphing, and a seamless first/last frame.
- Keep Claude Code focused on design iteration and prompt drafting; Codex should verify the build, browser behavior, and mobile layout.
- GitHub/Vercel is a later activation step, not part of the current local prototype unless the user explicitly asks.

## Useful Commands

```bash
npm install
npm run dev
npm run build
npm start -- -p 3000
```

For a clean demo, prefer:

```bash
npm run build
npm start -- -p 3000
```

Then open:

```bash
http://localhost:3000
```

## Recommended Agent Split

Claude is best used here for:

- Design iteration prompts and high-taste UI direction.
- Improving scroll/chapter composition.
- Refining copy and spatial storytelling.
- Exploring Seedance-style transition ideas without requiring paid generation.

Codex is best used here for:

- Integrating final changes safely.
- Running build checks.
- Browser/mobile verification.
- Keeping the local project and Artificial Monks handoff organized.
