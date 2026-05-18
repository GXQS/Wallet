# Generated File Handling Policy

## Purpose

This policy keeps atomic commits clean while preserving strict quality checks.

Generated framework artifacts can change outside intentional feature work. They must not block unrelated atomic commits unless the generated content materially changed.

## Classified Generated Files

Current generated-file classes include:

- `apps/web/next-env.d.ts`
- Next.js build manifests:
  - `**/build-manifest.json`
  - `**/app-build-manifest.json`
  - `**/react-loadable-manifest.json`
- Generated caches/output trees:
  - `.next/**`
  - `.turbo/**`
  - `dist/**`
  - `build/**`

Classification metadata is maintained in `.gitattributes`.

## Commit-Time Behavior

Pre-commit runs `pnpm generated:guard` before formatting/linting.

Guard behavior:

1. Detects staged generated files.
2. Drops generated-file changes that are whitespace-only (non-material).
3. Keeps generated-file changes when content materially changed.

This prevents unrelated generated drift from blocking isolated feature commits.

## Enforcement Model

- Pre-commit formatting checks are staged-only.
- Lint and typecheck remain strict and required.
- Repository-wide formatting enforcement remains available via `pnpm format:check` and can be run in CI.

## Contributor Guidance

- Do not manually edit generated framework files unless required by framework/tooling.
- If a generated file is intentionally changed, include rationale in commit message/body.
- Keep generated updates isolated from feature logic when possible.
