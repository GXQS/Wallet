# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-05-11

### Added

- Initial monorepo architecture for **GXQS Distributed Compute Operating Platform**
- Rust crypto vault core with AES-256-GCM envelope encryption + WASM bindings
- Go walletd JSON-RPC bridge + runtime supervisor (walletd, minerd, validatord, telemetryd, deployerd)
- GXQS address derivation: compressed public key → SHA-256 → RIPEMD-160 → `gxqs1…`
- Tauri desktop runtime + browser WASM mining support
- Next.js 16 enterprise dashboard with Exployer glow system (`#00ffe1` / `#ff00d4`)
- Policy engine with YAML-driven enterprise fleet controls
- TypeScript SDK (`@gxqs/sdk`) with typed RPC client + structured error handling
- Shared UI component library (`@gxqs/ui`) — `Card`, `Badge`, `StatusDot`
- React Native + Expo mobile app scaffold (`apps/mobile`)
- pnpm workspaces + Turborepo for incremental cross-language builds
- Go workspace (`go.work`) linking all three Go modules
- Bootstrap scripts + Makefile for fast one-command deployment
- CI/CD matrix (Ubuntu × Windows × macOS) with Dependabot auto-merge aligned with GXQS/core & Exployer
- Docker multi-stage builds + Kubernetes Kustomize manifests
- OpenAPI spec for walletd covering address, transaction, and health endpoints
- Smart wallet onboarding panel for walletd-mediated placeholder flow:
  - one-click wallet provisioning request UI (walletd generates key material)
  - email confirmation + Google login UI state placeholders
  - seed phrase / private key / keystore import request via opaque walletd session identifiers
  - testnet/mainnet toggle + RPC profile configuration
  - wallet export actions for public metadata only
- Typed integration bridge placeholders for future `core.git` wallet daemon sync and `Exployer.git` explorer sync
- Cyber-futuristic dashboard enhancements: GPU overview, network topology, mining chart, and system health refinements

### Security

- Strict process isolation: private keys never leave the `walletd` process boundary
- AES-256-GCM authenticated encryption for vault key storage (via RustCrypto `aes-gcm`)
- Memory zeroization on drop (`zeroize` crate) for all `SecretKey` instances
- CSP + `X-Frame-Options: DENY` + `X-Content-Type-Options` headers on all web routes
- `readOnlyRootFilesystem` + non-root `seccompProfile` in Kubernetes manifests

### Fixed

- Prettier blocker in `apps/web/next-env.d.ts` to keep `pnpm format:check` green across CI
- Removed stale frontend runtime state (`walletdConnected`) to reduce dead code in the web store

**Initial Release** — Strong foundation for production use. Private key operations are isolated
to `walletd`; all other platform processes (mining, telemetry, UI) operate with no vault access.

[Unreleased]: https://github.com/GXQS/Wallet/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/GXQS/Wallet/releases/tag/v0.1.0
