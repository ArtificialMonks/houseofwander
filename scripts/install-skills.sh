#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# install-skills.sh — install the AI Design Studio skill set into this project's
# .claude/skills/ directory so Claude Code can use them to design this site.
#
# Mirrors the approach in ArtificialMonks/ai-design-studio:
#   - External skills are cloned from their public source repos.
#   - Project-local workflow skills (ui-subagents, ui-battle) are committed in
#     this repo and only verified here.
#
# The skills are committed (vendored) so a fresh clone already has them. Run this
# only when you want to re-pull or update the external skills.
#
# Usage:  npm run install-skills      (or)   bash scripts/install-skills.sh
# ------------------------------------------------------------------------------
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CLAUDE_SKILLS_DIR="$REPO_ROOT/.claude/skills"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

mkdir -p "$CLAUDE_SKILLS_DIR"

# ---- External taste/design skills (Leonxlnx/taste-skill) ---------------------
echo "→ Cloning Leonxlnx/taste-skill"
git clone --depth 1 --quiet https://github.com/Leonxlnx/taste-skill.git "$TMP_DIR/taste-skill"

TASTE_VARIANTS=("taste-skill" "minimalist-skill" "brutalist-skill" "redesign-skill")
for variant in "${TASTE_VARIANTS[@]}"; do
  SRC="$TMP_DIR/taste-skill/skills/$variant"
  DEST="$CLAUDE_SKILLS_DIR/$variant"
  if [[ -d "$SRC" ]]; then
    echo "  ✓ Installing $variant"
    rm -rf "$DEST"
    cp -a "$SRC" "$DEST"
  else
    echo "  ✗ Source directory not found: $SRC" >&2
  fi
done

# ---- External Google GenAI skills (cnemri/google-genai-skills) ---------------
# NOTE: nano-banana-use and veo-build call PAID Google Vertex AI. They are
# installed for reference only and must NOT be run without explicit approval.
echo ""
echo "→ Cloning cnemri/google-genai-skills"
git clone --depth 1 --quiet https://github.com/cnemri/google-genai-skills.git "$TMP_DIR/google-genai-skills"

GENAI_SKILLS=("nano-banana-use" "veo-build" "google-genai-sdk-python")
for skill in "${GENAI_SKILLS[@]}"; do
  SRC="$TMP_DIR/google-genai-skills/skills/$skill"
  DEST="$CLAUDE_SKILLS_DIR/$skill"
  if [[ -d "$SRC" ]]; then
    echo "  ✓ Installing $skill"
    rm -rf "$DEST"
    cp -a "$SRC" "$DEST"
  else
    echo "  ✗ Source directory not found: $SRC" >&2
  fi
done

# ---- Project-local workflow skills (committed in this repo) ------------------
echo ""
echo "→ Verifying project-local workflow skills"
for skill in ui-subagents ui-battle; do
  if [[ -f "$CLAUDE_SKILLS_DIR/$skill/SKILL.md" ]]; then
    echo "  ✓ $skill present"
  else
    echo "  ✗ Missing $CLAUDE_SKILLS_DIR/$skill/SKILL.md" >&2
    exit 1
  fi
done

echo ""
echo "✓ All design skills installed under .claude/skills/"
echo ""
echo "Skills present:"
ls -1 "$CLAUDE_SKILLS_DIR"
