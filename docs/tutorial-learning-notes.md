# Tutorial Learning Notes - Casa Cabane Prototype

These notes summarize the two tutorial workflows and translate them into a safe local plan for Casa Cabane.

## Sources Reviewed

- Chase AI: `https://www.youtube.com/watch?v=7uW1SKmx-Ic`
- Nate Herk: `https://www.youtube.com/watch?v=NvxiSG34mPU`

Captions and metadata were pulled into:

```bash
renders/tutorial-research/20260523-054200-v01/
```

## What The Tutorials Teach

### 1. Start With A Strong Image Source

Both workflows begin before code. The visual source drives the whole page: hero composition, mood, motion, copy tone, and layout.

For Casa Cabane, the visual source should be real:

- Maaike & Laudi's walkthrough video
- The existing poster image
- Selected still frames from arrival, exterior, lake, outdoor, interior, and CTA moments

Do not invent a fictional property image for v1.

### 2. Use Claude Design Thinking Before Coding Too Much

The Chase AI workflow uses Claude Design to mock up the landing page before final implementation. The useful idea is not the exact tool; it is the order:

1. Define the visual mood.
2. Compose the landing page around that mood.
3. Only then implement motion/video behavior.

For Casa Cabane, Claude should focus on:

- Cinematic composition
- Calm luxury pacing
- Typography hierarchy
- Chapter storytelling
- Mobile-first portrait video behavior

### 3. Loops Need Discipline

The Nate Herk workflow is especially useful for looping background video:

- First frame and last frame should match.
- Audio should be off.
- Motion should be slow and subtle.
- The prompt should prevent weird morphing, extra objects, unstable buildings, or game-like movement.
- Creative generation works best when a human reviews and iterates.

For Casa Cabane, generated loops are later optional polish. V1 should keep the real walkthrough as the main proof.

### 4. Claude Code Is Good For Prompting And Iteration

The second tutorial uses Claude Code to draft video prompts, bring assets into the codebase, build the page, and iterate locally.

For our setup:

- Claude can draft design prompts and propose visual directions.
- Claude can implement one scoped page iteration.
- Codex should verify build, mobile layout, browser behavior, and fallback states.

### 5. Local First, Deployment Later

The tutorial ends with GitHub and Vercel deployment. That is useful later, but Casa Cabane is still in prototype validation.

Current rule:

- Local proof first.
- No GitHub/Vercel/public deployment until the walkthrough effect is approved.

## Casa Cabane Adapted Workflow

1. Select real frames from the walkthrough video.
2. Ask Claude to define the visual system from those real frames.
3. Improve the existing local page around the real video.
4. Test the scroll-linked chapter experience on desktop and mobile.
5. Decide whether any optional generated loops are actually needed.
6. If yes, create a separate prompt pack for Seedance/Higgsfield/Kie.ai-style loops.
7. Only after local approval, prepare GitHub/Vercel deployment.

## Future Loop Prompt Template

Use only after explicit approval for generated video work:

```text
Create a seamless short background loop based on this real Casa Cabane frame.
The first and last frame must match. Keep movement extremely slow and natural:
soft tree movement, subtle lake shimmer, gentle daylight atmosphere.
No audio. No new furniture. No people. No distorted architecture.
No object morphing. No fantasy elements. Preserve the real retreat feeling.
The result should feel like a premium quiet travel website background, not a dramatic trailer.
```

## Next Best Claude Task

Ask Claude for one local design iteration:

- Keep the existing walkthrough video.
- Strengthen the hero and chapter rhythm.
- Make the page feel more like a guided retreat experience.
- Keep desktop, mobile, reduced motion, and fallback states intact.
- Run `npm run build` before handing back.
