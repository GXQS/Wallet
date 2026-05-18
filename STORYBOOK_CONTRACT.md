# Storybook Contract

Storybook is an isolated subsystem for UI validation and component documentation.

## Contract

1. Storybook changes must be isolated from non-UI concerns.
2. Storybook commits must not include dependency or workspace policy changes unless explicitly requested.
3. Storybook exists for:
   - mobile-first preview validation
   - breakpoint and responsive validation
   - glassmorphism and theming validation
   - interaction and animation validation
   - accessibility checks
   - component and token documentation

## Explicit Boundaries

Storybook work should not include:

- backend/runtime changes
- infrastructure changes
- unrelated package upgrades
- policy docs and CI rule changes

## Allowed File Zones

- `apps/web/.storybook/**`
- `apps/web/src/components/**/*.stories.tsx`
- `apps/web/src/components/**/*.mdx`
- Storybook-specific docs only when requested

## Exception Rule

`apps/web/package.json` may be edited for Storybook only when explicitly requested.
Otherwise, Storybook runs as a pure UI validation subsystem.
