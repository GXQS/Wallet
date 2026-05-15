#!/usr/bin/env bash
set -euo pipefail

# Generated framework files that are allowed only when materially changed.
GENERATED_FILES=(
  "apps/web/next-env.d.ts"
)

for file in "${GENERATED_FILES[@]}"; do
  if ! git diff --cached --name-only -- "$file" | grep -q .; then
    continue
  fi

  # If staged diff is whitespace-only, drop it from staging and working tree.
  if git diff --cached -w --quiet -- "$file"; then
    echo "[generated-guard] Removing non-material generated file change: $file"
    git restore --staged --worktree -- "$file"
  else
    echo "[generated-guard] Keeping material generated file change: $file"
  fi
done
