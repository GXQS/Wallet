# Change Boundary Policy

This policy defines non-overlapping change boundaries for atomic development.

## Boundary Types

1. Dependencies
2. UI and component implementation
3. Documentation
4. CI/hook/workflow configuration

Each boundary must be committed independently.

## Boundary Matrix

- Dependency boundary: lockfiles, package manifests, dependency version updates only.
- UI boundary: source/UI behavior files only.
- Documentation boundary: markdown/spec/readme files only.
- CI boundary: hooks, workflows, lint/validation scripts only.

## Enforcement

- Do not stage files from multiple boundaries in one commit.
- If mixed files are present, unstage and split by boundary.
- Pre-push checks must validate lint and typecheck before pushing.

## Required Review Signal

Each commit should be reviewable as one intent:

- one objective
- one risk area
- one validation path

If reviewers cannot summarize the change intent in one sentence, the boundary is too wide.
