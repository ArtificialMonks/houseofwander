---
name: ui-battle
description: Run a judged two-round UI redesign competition between external models such as Gemini and Claude. Use when the user asks for a UI battle, Gemini vs Claude UI contest, two-round UI redesign competition, models battling over a page/dashboard/component, or Claude/Codex judging UI variants with screenshot evidence.
---

# UI Battle

Run a controlled UI redesign contest. The orchestrator judges; external models edit isolated copies only.

Hard rules:

- Preserve the main implementation until the user approves integration.
- Use one isolated provider worktree for Gemini and one for Claude.
- Route every provider run through `tools/agent-runs/runtime/runs/`.
- Use `AGENT_RUNS_PROMPT_MODE=ui-battle`.
- Verify `pnpm agent-runs:self-test` and `pnpm subagents:verify` before real model work.
- Capture comparable screenshots from the same route, viewport, mock/data state, and interaction state.
- Reject skeleton, loading-only, auth-error, or disconnected screenshots as final evidence.

Contest structure:

```text
tools/agent-runs/runtime/runs/<contest-name>/
  gemini-r1/
  gemini-r2/
  claude-r1/
  claude-r2/
  worktrees/
  reports/
```

Round 1 gives both providers equivalent briefs. Round 2 gives each provider only its own critique and asks it to revise its existing worktree. Final judgment reports scores, evidence, changed files, verification, winner, merge recommendation, and preserved cleanup state.
