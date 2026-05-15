# Responsive Storybook Documentation Plan

## Goal

Provide explicit viewport and interaction coverage for GXQS adaptive components.

## Story Matrix

Viewports:

- xs: 320x640
- sm: 480x800
- md: 768x1024
- lg: 1024x768
- xl: 1440x900
- 2xl: 1920x1080

Modes:

- reduced motion on/off
- low-power simulation on/off
- touch pointer vs fine pointer

## Required Stories

1. `DashboardLayout`
   - mobile drawer open/closed
   - desktop sidebar persistent
2. `MobileNav`
   - bottom nav tap targets
   - command drawer trigger
3. `TelemetryPanel`
   - mobile card list
   - desktop table
4. `WalletPanel`
   - compact stack
   - full width form controls
5. `MiningPanel`
   - compact sparkline density
   - desktop full density
6. `AIAssistantPanel`
   - phone drawer mode
   - tablet floating mode
   - desktop dock mode
7. `ExtensionModesPanel`
   - popup, side panel, full tab cards

## Accessibility Story Checks

- Keyboard-only traversal
- Focus ring visibility
- Screen reader labels for nav and drawer controls
- 200% zoom readability

## Performance Story Checks

- Reduced-motion story disables animations
- Low-power story uses reduced blur intensity
- Chart simplification under compact runtime mode

## Implementation Notes

When Storybook is added, use decorators:

- viewport decorator for breakpoint presets
- global toolbar for reduced-motion and low-power flags
- optional ResizeObserver mock to emulate container mode changes
