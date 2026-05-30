---
name: ui-subagents
description: Route Claude and Gemini external subagent runs through this repo's Agent Runs dashboard. Use when launching, monitoring, testing, comparing, or debugging visible external subagents; when the user asks to run a subagent through the UI; or when verifying terminal, stderr, events, metadata, metrics, prompts, and output artifacts.
---

# UI Subagents

Use this skill to make external Gemini or Claude subagent runs visible in the local Agent Runs dashboard at `http://127.0.0.1:8765/`. Do not launch hidden scratch runs when the user expects to follow the agent in the UI.

Route runs through `tools/agent-runs/runtime/runs/`, launch the dashboard with `pnpm agent-runs`, and verify the harness with `pnpm subagents:verify`.

Use:

- `bash scripts/agents/gemini-agent.sh --restrict-access dispatch-yolo readonly-review "$TASK_PROMPT" "$RUN_DIR"`
- `bash scripts/agents/gemini-agent.sh --full-access dispatch-yolo worktree "$TASK_PROMPT" "$RUN_DIR"`
- `bash scripts/agents/claude-agent.sh --restrict-access dispatch-yolo readonly-review "$TASK_PROMPT" "$RUN_DIR"`
- `bash scripts/agents/claude-agent.sh --full-access dispatch-yolo worktree "$TASK_PROMPT" "$RUN_DIR"`

Set prompt mode explicitly:

- `AGENT_RUNS_PROMPT_MODE=readonly-review` for no-edit reviews.
- `AGENT_RUNS_PROMPT_MODE=worktree` for isolated implementation.
- `AGENT_RUNS_PROMPT_MODE=ui-battle` for UI contests.

After completion, inspect the Agent Runs dashboard tabs: Terminal, Stderr, Events, Metadata, TPS, Raw Prompt, Enhanced Prompt, and Output. Report provider, model, run directory, branch, worktree, exit status, dashboard URL, and cleanup.
