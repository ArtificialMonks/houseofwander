# House of Wander / Casa Cabane - Team Continuation Update

Prepared for: Joey & Jo; House of Wander team: Maaike & Laurens; Artificial Monks support  
Date: May 23, 2026  
Status: Local guided prototype built, higher-quality video installed, and ready for team review

## Executive Summary

We now have a focused local prototype for Casa Cabane inside the Dropbox project folder. The prototype turns Maaike & Laudi's real Casa Cabane walkthrough into a guided, full-screen web experience instead of a normal scroll page or Airbnb-style listing.

The current version is not a full public website yet. It is a proof-of-feel prototype: a polished gateway screen, an immersive walkthrough mode, chapter controls, mobile-friendly navigation, and an Airbnb call to action. It is designed so Joey & Jo can continue project direction and approval, while Maaike & Laurens can review the House of Wander / Casa Cabane side: video, story, property details, permissions, and next content.

## Audience And Continuation Roles

- Joey & Jo: review the prototype direction, decide the next sprint scope, confirm the activation path, and decide when the project is ready for a wider team or public preview.
- House of Wander team - Maaike & Laurens: review the Casa Cabane experience from the property side, confirm video/source quality, approve factual details, provide missing content, and confirm what can be used beyond Airbnb.
- Artificial Monks support: keep the Dropbox project folder organized, integrate approved changes, run build/browser/mobile QA, and prepare clean handoffs for Claude, Codex, or future collaborators.

## Current Project Location

Canonical project folder:

```text
/Users/wezienwel/Library/CloudStorage/Dropbox-We-zien-wel/Thomas Lambrechts/JJ - AI/ArtificialMonks/Projects/houseofwander
```

Shortcut path:

```text
/Users/wezienwel/houseofwander
```

The shortcut is only a symlink to the Dropbox folder. Future Codex and Claude work should use the Dropbox path as the real project home so all files stay together.

## What Is Built Now

- A cinematic Casa Cabane gateway screen with one primary action: Enter walkthrough.
- A full-screen guided walkthrough mode instead of a buried long-scroll section.
- Always-available controls: Exit, Previous, Play/Pause, Next, chapter filmstrip, timecode, and Airbnb CTA.
- Six chapters using the existing walkthrough timing: Arrival, Exterior, Lake, Outdoor, Interior, Stay.
- Optional wheel/trackpad seeking inside the walkthrough while the page itself stays pinned.
- Exit returns the visitor to the top gateway state, so nobody gets trapped at the bottom of the page.
- Mobile-first layout for phone and tablet review.
- Reduced-motion behavior for users who do not want autoplay or animated transitions.
- Video fallback message if the walkthrough file fails to load.

## Important Naming And Copy Decisions

Current working brand spelling in the prototype: House of Wander.

Current founder/reference spelling in active copy and docs: Maaike & Laudi.

Older references to "House of Wonder" and "Laudy" were cleaned from active docs and app copy. Some historical or generated archive material may still contain older wording, but new work should use House of Wander and Maaike & Laudi unless the team decides otherwise.

## How To Run The Prototype

Open a terminal in the Dropbox project folder:

```bash
cd "/Users/wezienwel/Library/CloudStorage/Dropbox-We-zien-wel/Thomas Lambrechts/JJ - AI/ArtificialMonks/Projects/houseofwander"
```

Install dependencies if needed:

```bash
npm install
```

Run a development preview:

```bash
npm run dev
```

Or run a clean production-style local preview:

```bash
npm run build
npm start -- -p 3000
```

If port 3000 is already busy, use:

```bash
npm start -- -p 3001
```

Current verified preview during this work ran at:

```text
http://localhost:3001
```

## Files And Folders To Know

- `app/page.tsx` - main prototype interaction and page structure.
- `app/globals.css` - visual design, responsive layout, and walkthrough overlay styling.
- `app/layout.tsx` - page metadata.
- `public/media/casa-cabane-walkthrough.mp4` - current higher-quality walkthrough video used by the prototype.
- `public/media/casa-cabane-poster.jpg` - current poster image extracted from the updated video.
- `README.md` - project overview and run commands.
- `CLAUDE.md` - local instructions for Claude Code.
- `docs/claude-casa-cabane-handoff.md` - prompt/handoff for Claude design iteration.
- `docs/tutorial-learning-notes.md` - notes from the Claude Design / Seedance tutorial workflow.
- `renders/casa-cabane-guided-qa/20260523-065751-v01/` - browser QA screenshots from the guided prototype.

## Verification Completed

- `npm run build` passes with Next.js 16.2.6.
- Desktop QA completed in browser.
- Mobile QA completed at 390 x 844.
- Tablet QA completed at 768 x 1024.
- Enter walkthrough opens the full-screen journey.
- Previous, Next, and chapter buttons seek correctly.
- Exit returns to the top gateway state.
- The page no longer depends on long scrolling to enter the walkthrough.
- No horizontal overflow was detected on tested mobile/tablet viewports.
- Reduced-motion mode remains usable and starts with Play instead of autoplay.
- Video fallback state is reachable and visible.
- Airbnb CTA keeps the existing Airbnb listing URL and opens in a new tab.

## Current Limitations

- The current video is much higher quality, but it is also large at about 580 MB. Before public deployment, it may need a web-optimized export for faster loading.
- The page is local only. There is no public deployment, GitHub handoff, Vercel setup, analytics, CMS, or booking backend yet.
- The content is still prototype copy, not final marketing or house-information copy.
- The walkthrough uses a single real video file. No Seedance/Higgsfield/Kie.ai loops are used in this version.
- The House of Wander collection landing page is not built yet.
- Amico/AI guidance is not implemented yet. That belongs to a later phase after the Casa Cabane experience direction is approved.

## Better Casa Cabane Video: Current Status And Next Move

The better-quality Casa Cabane video has now been installed as:

```text
public/media/casa-cabane-walkthrough.mp4
```

The new file was verified as 1080 x 1920 portrait, 60 fps, 254.4 seconds, H.264, around 580 MB. A new poster was extracted from the updated video and saved as:

```text
public/media/casa-cabane-poster.jpg
```

Recommended handling:

1. Keep the current installed video as the source for local review.
2. Preserve the previous poster backup in the video-replacement QA render folder.
3. QA the new file for:
   - orientation and crop on desktop, phone, and tablet
   - load time
   - first frame / poster match
   - chapter timing accuracy
   - mobile readability behind captions
4. Before public deployment, create a smaller web-optimized MP4 if the 580 MB file feels too heavy.
5. Reconfirm whether the installed file is the final approved source or still an intermediate export.

## What The Team Needs To Decide

- Confirm the final public brand hierarchy: House of Wander, Casa Cabane, or another exact structure.
- Confirm whether Airbnb remains the only CTA for v1.
- Confirm whether the prototype may use the walkthrough video internally only, externally, or publicly.
- Confirm whether Airbnb photos, review snippets, host names, and listing facts may be reused outside Airbnb.
- Confirm who approves final copy and visual direction: Joey & Jo, Maaike & Laurens, or a smaller approval group.
- Confirm whether the site should be English only, Dutch only, or bilingual.
- Confirm whether Casa Cabane should launch as a standalone page first or as the first property inside a wider House of Wander collection.
- Confirm whether direct inquiry or direct booking is a later goal.

## Next Work Plan

### Phase 1 - Casa Cabane Prototype Polish

- Optimize the current higher-quality Casa Cabane video for web loading if needed.
- Re-check chapter timings after any further media replacement or compression.
- Keep the updated poster image aligned with the installed source video.
- Refine gateway headline and chapter captions with team-approved wording.
- Keep mobile-first QA as the primary review standard.

### Phase 2 - Full Casa Cabane Property Detail Layer

- Add all practical stay details from Airbnb and host-provided materials.
- Add capacity, amenities, rules, location context, arrival/check-in info, and guest review proof.
- Decide how much information appears inside the guided flow versus below it.
- Keep the guided experience elegant and avoid turning it into a dashboard.

### Phase 3 - House of Wander Collection Landing

- Create a first collection landing page where visitors see all accommodations.
- Let visitors zoom into Casa Cabane as the first detailed prototype.
- Define a repeatable content model so future properties can be added without redesigning everything.

### Phase 4 - Optional Amico Guidance

- Explore Amico as a guided helper through properties, practical details, and decisions.
- Keep it useful and light, not a chatbot layer that distracts from the stay.
- Prototype only after the Casa Cabane page proves the main guided experience.

### Phase 5 - Public Preview / Deployment

- Only after local approval, connect GitHub and Vercel.
- Run production build and visual QA again.
- Decide whether the preview is private, passworded, or public.

## Recommended Agent Split

Claude is useful for:

- High-taste design iteration.
- Copy refinement and spatial storytelling.
- Prompting for future mood loops or transition ideas.
- Exploring visual references from the tutorials without forcing paid AI generation.

Codex is useful for:

- Integrating final code changes.
- Replacing and validating media assets.
- Running build checks.
- Browser/mobile QA.
- Keeping the Dropbox project folder organized.
- Preparing team handoffs and technical continuation notes.

## Immediate To-Do List

- Joey & Jo: confirm final brand spelling and public naming structure.
- Joey & Jo: decide whether the next build step is Casa Cabane detail content, the House of Wander collection landing, or public-preview preparation.
- Joey & Jo: confirm whether Airbnb remains the v1 CTA.
- House of Wander team - Maaike & Laurens: confirm whether the installed higher-quality Casa Cabane walkthrough is the final approved source or whether an even cleaner export exists.
- House of Wander team - Maaike & Laurens: confirm usage permission for video, photos, review snippets, host names, and Airbnb listing facts.
- House of Wander team - Maaike & Laurens: provide or approve practical property details for the next Casa Cabane content layer.
- Codex: rerun desktop, mobile, tablet, reduced-motion, and fallback QA after any further media replacement or compression.
- Claude or design lead: refine the visual direction after the better video is in place.

## Current Recommendation

Do not expand into a full platform yet. Keep the next sprint focused on Casa Cabane, mobile-first walkthrough quality, video loading/performance, and the core guided feeling. Once that feels right, use Casa Cabane as the blueprint for the full House of Wander collection and the later Amico-guided experience.
