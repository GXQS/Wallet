# Contributor Workflow

## Atomic Commit Discipline

Use small, scoped commits that change one concern at a time.

Rules:

1. Stage only files related to the current unit of work.
2. Run local validation before commit (`lint`, `typecheck`, and targeted build/test when relevant).
3. Avoid mixing generated-file churn with feature logic unless required.

## Pre-commit Pipeline

Lefthook runs this order:

1. `pnpm generated:guard`
2. `pnpm format:staged`
3. `pnpm format:check:staged`
4. `pnpm lint`
5. `pnpm typecheck`

This ensures staged files are auto-formatted, strictly checked, and validated.

## Formatting Commands

- Format staged files: `pnpm format:staged`
- Strict check on staged files: `pnpm format:check:staged`
- Format full repo: `pnpm format`
- Strict check full repo: `pnpm format:check`

## Generated File Policy

See `docs/GENERATED_FILE_POLICY.md`.
