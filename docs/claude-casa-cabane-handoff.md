# Claude Handoff - Casa Cabane Video Prototype

Use this prompt inside Claude Code from the project folder:

```text
You are working inside the House of Wander prototype repository (run from the repo root of your local clone).

Context:
- This is a local House of Wander prototype for Casa Cabane in Stekene.
- The goal is to prove a premium video walkthrough website using Maaike & Laudi's real Casa Cabane video.
- The current prototype works locally as a guided fullscreen chapter experience.
- Tutorial reference: https://www.youtube.com/watch?v=7uW1SKmx-Ic
- Tutorial workflow to adapt: Phase 1 Image, Phase 2 Claude Design, Phase 3 Video + Handoff.
- Tutorial reference: https://www.youtube.com/watch?v=NvxiSG34mPU
- Tutorial workflow to adapt: Claude Code setup, image generation/source selection, Seedance loop, Claude-written video prompts, website build, design iteration, GitHub/Vercel later.
- Do not turn this into a full booking site yet.
- Do not add Vercel/GitHub deployment yet.
- Do not use paid AI generation or Seedance output unless the user explicitly asks for that in this session.

Read first:
- CLAUDE.md
- README.md
- app/page.tsx
- app/globals.css

Task:
Create one high-taste design iteration inspired by the Claude Design + Seedance/Higgsfield tutorial style, but keep the real walkthrough video as the hero asset. Focus on making the page feel more premium, cinematic, and intentional.

Adapt the tutorial like this:
- Phase 1 Image: use the existing Casa Cabane poster/video frames as the image source of truth.
- Phase 2 Claude Design: improve the landing-page composition, typography, spacing, and guided narrative.
- Phase 3 Video + Handoff: refine the scroll-linked video/chapter behavior and leave implementation notes for Codex.
- Nate Herk loop workflow: if proposing generated loops later, specify first frame equals last frame, no audio, slow natural camera/motion, and no morphing or fake objects.
- Claude Code workflow: draft prompts and implement local design changes first; GitHub/Vercel deployment remains a later approval step.

Specific needs:
- Preserve the existing video asset and Airbnb CTA.
- Keep the walkthrough as the first prototype surface.
- Improve the feeling of guided arrival, exterior reveal, lake stillness, outdoor rhythm, interior transition, and final CTA.
- Treat generated loops/transitions as later optional ideas, not v1 requirements.
- Capture the Casa Cabane equivalent of the tutorial flow: real frame source, optional loop prompt, local website iteration, then handoff to Codex verification.
- Keep desktop and mobile usable.
- Avoid fake claims, fake amenities, or invented footage.
- Keep changes scoped mostly to app/page.tsx and app/globals.css unless a README note is needed.
- Add no backend, no CMS, no booking system, no deployment.

Verification:
- Run npm run build.
- If you start a server, use npm start -- -p 3000 after building.
- Summarize changed files, what was verified, and what still needs human review.
```

## Suggested Claude Session Flow

1. Open a terminal in the project:

```bash
cd <your-local-clone>/houseofwander
claude
```

2. Paste the prompt above.
3. Let Claude propose or implement one scoped visual iteration.
4. Bring the result back to Codex for browser verification and mobile QA.

## Coordination Note

Avoid running Codex and Claude as simultaneous editors on the same files. If both are open, give one agent a clear write scope and keep the other in review/verification mode.

## Tutorial Resources Noted

- Chase AI tutorial: `https://www.youtube.com/watch?v=7uW1SKmx-Ic`
- Claude Design: `https://claude.ai/design`
- Higgsfield reference from tutorial: `https://higgsfield.ai/?fpr=chase25`
- Chase AI community/prompt source from tutorial: `https://www.skool.com/chase-ai-community`
- Chase AI agency/course link from tutorial: `https://www.skool.com/chase-ai`
- Chase AI site: `https://www.chaseai.io`
- Nate Herk tutorial: `https://www.youtube.com/watch?v=NvxiSG34mPU`
- Kie.ai reference from tutorial: `https://kie.ai`
- Nate Herk resources: `https://www.skool.com/ai-automation-s...`
- Nate Herk podcast application: `https://podcast.nateherk.com/apply`
- Nate Herk work-with-me link: `https://uppitai.com/`
