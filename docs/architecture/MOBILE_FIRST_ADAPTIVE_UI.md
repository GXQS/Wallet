# GXQS Mobile-First Adaptive UI Architecture

## Scope

This document defines the adaptive UI system implemented in `apps/web`.

## Responsive Design Tokens

Defined in:

- `apps/web/tailwind.config.js`
- `apps/web/src/app/globals.css`

Token model:

- Breakpoints: `xs` 320, `sm` 480, `md` 768, `lg` 1024, `xl` 1440, `2xl` 1920
- Fluid spacing and typography via `clamp()`
- Adaptive radius and density variables

## Adaptive Layout Engine

Engine primitives:

- `.adaptive-grid` for `repeat(auto-fit, minmax(320px, 1fr))`
- `.adaptive-cards` for card-level auto fit
- `.cq-panel` container query boundaries
- `@container` rules for compact panel behavior

Behavior:

- Panels collapse on small containers
- Widgets reorder using auto-fit grids
- Telemetry tables become mobile card lists
- Charts reduce density in compact mode

## Runtime Adaptation Layer

Hooks:

- `useAdaptiveRuntime`:
  - reads `prefers-reduced-motion`
  - checks `navigator.deviceMemory`
  - checks `navigator.hardwareConcurrency`
  - emits `compactCharts` and low-power mode
- `useContainerMode` (ResizeObserver):
  - mode classification: phone/tablet/desktop

## Navigation System

- Mobile: bottom nav + command drawer + quick action button
- Desktop: persistent sidebar + topbar shortcuts
- Drawer-based sidebar for mobile collapse

## AI Adaptive UX

`AIAssistantPanel` supports:

- desktop dock mode
- tablet floating mode
- phone drawer mode

## Extension Responsive Modes

`ExtensionModesPanel` documents adaptive behavior for:

1. popup mode
2. side panel mode
3. full tab mode

## Accessibility and Performance

- `aria-label`, `role=dialog`, `aria-modal` on drawer interactions
- global reduced-motion safety override
- low-power class lowers glass blur and animation intensity
- mobile chart simplification for battery safety

## Compatibility

No protocol/runtime wallet behavior was changed.
This is UI layer adaptation only.
