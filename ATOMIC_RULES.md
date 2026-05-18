# Atomic Rules

This repository enforces strict atomic separation for all automated and manual changes.

## Hard Rules

1. One purpose per run.
2. One purpose per commit.
3. One conventional commit message per purpose.
4. Push immediately after each atomic commit.

## Disallowed Combinations

Never combine any of the following in the same commit:

- dependency upgrades
- UI generation or visual component changes
- documentation updates
- workflow or CI configuration changes

## Required End-of-Run Checklist

Every run must end with:

1. `git status`
2. explicit file list for the atomic scope
3. one conventional commit
4. immediate push to `origin/main`

## Commit Scope Guidance

- `docs(...)`: documentation-only files
- `ci(...)`: pipeline/hook/workflow changes only
- `chore(...)`: repository maintenance that is not docs/UI/deps
- `feat(...)` / `fix(...)`: product code changes only

If a change touches multiple categories, split it into sequential commits.
