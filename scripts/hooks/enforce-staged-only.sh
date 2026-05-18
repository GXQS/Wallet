#!/usr/bin/env bash
set -euo pipefail

# Block commits when tracked files have unstaged changes.
if ! git diff --quiet -- .; then
  echo "[staged-only] Commit blocked: tracked files contain unstaged changes."
  echo "[staged-only] Stage or stash tracked edits before committing."
  git status --short
  exit 1
fi
