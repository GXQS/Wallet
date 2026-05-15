# Storybook for GXQS Wallet Web

This directory configures the official GXQS design system laboratory for mobile-first, responsive, glassmorphism, accessibility, animation, and documentation validation.

## Key Files

- `main.ts`: Storybook configuration (stories, addons, framework)
- `preview.ts`: Global parameters (backgrounds, viewports, themes, decorators)
- `manager.js`: Custom Storybook UI theme (GXQS branding)
- `tsconfig.json`: TypeScript config for Storybook

## Usage

1. **Install Storybook dependencies:**
   ```sh
   pnpm add -D @storybook/nextjs @storybook/addon-links @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-a11y @storybook/addon-mdx-gfm @storybook/addon-styling
   ```
2. **Run Storybook (Codespaces-ready):**
   ```sh
   pnpm --filter @gxqs/web storybook
   ```
   This binds Storybook to `0.0.0.0:6006` for forwarded-port access.
3. **Build Storybook static docs:**
   ```sh
   pnpm --filter @gxqs/web build-storybook
   ```

## Codespaces Port Forwarding

- Forward port `6006` in Codespaces Ports panel.
- Open the forwarded URL to access the Storybook UI.
- Keep visibility private unless collaboration requires public access.

## Responsive Viewports

Storybook is preconfigured with GXQS breakpoints:

- XS: 320px
- SM: 480px
- MD: 768px
- LG: 1024px
- XL: 1440px
- 2XL: 1920px

## Included Validation Areas

- Mobile-first previews and responsive breakpoint testing.
- Dark and light theme switching via toolbar.
- Glass surface rendering checks.
- Accessibility checks with `@storybook/addon-a11y`.
- Interaction testing with `@storybook/addon-interactions`.
- Design token documentation with MDX docs.

## Developer Workflow Integration

- During feature work: run `pnpm --filter @gxqs/web storybook`.
- Before merge: run `pnpm --filter @gxqs/web build-storybook`.
- Ensure `pnpm --filter @gxqs/web lint` and `pnpm --filter @gxqs/web typecheck` pass.
