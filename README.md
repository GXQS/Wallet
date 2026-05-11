# GXQS Distributed Compute Operating Platform

> Unified control plane for wallet, mining, validation, and deployment.

GXQS is **not** a wallet app. It is an enterprise blockchain operating platform that combines:

- 🔐 **Universal Identity Layer** – one cryptographic root controlling wallet signing, mining authentication, validator authorization, and enterprise deployment permissions
- ⚡ **Runtime Supervisor** – Kubernetes-style daemon orchestration (walletd, minerd, validatord, telemetryd, deployerd)
- 🦀 **Rust Crypto Core** – memory-safe vault, WASM-capable, hardware-wallet ready
- 🐹 **Go Protocol Bridge** – walletd JSON-RPC server, GXQS address derivation, transaction builder
- 🌐 **Web Dashboard** – Next.js + Tailwind + Zustand enterprise monitoring UI
- 📋 **Policy Engine** – YAML-driven enterprise policy enforcement (compute limits, validator rules, fleet policies)
- 🐳 **Production Infrastructure** – Docker, Kubernetes (Kustomize), Terraform, Prometheus, Grafana

---

## Architecture

```
GXQS/core (Protocol Authority)
    ↓
Go RPC / Consensus
    ↓
┌──────────────────────────────────────────────────────────┐
│                Wallet.git Control Plane                   │
├─────────────────────┬────────────────────────────────────┤
│ Go Protocol Bridge  │ Rust Crypto Core                   │
│ - walletd           │ - Encrypted vault (zeroize-on-drop)│
│ - Address derive    │ - SHA-256 → RIPEMD-160 addresses   │
│ - Tx builder        │ - WASM bindings                    │
│ - Signer            │ - Hardware wallet abstraction      │
└─────────────────────┴────────────────────────────────────┘
                    ↓
         GXQS Universal Identity Layer
                    ↓
    ┌───────────────┼──────────────────┐
    ▼               ▼                  ▼
Desktop (Tauri)  Mobile (RN+Rust)  Browser (WASM+WebGPU)
```

### Non-Negotiable Security Rules

- ❌ **Never** expose private keys to renderer/UI processes
- ❌ **Never** allow mining runtimes direct vault access
- ❌ **Never** duplicate signing logic in frontend layers
- ✅ All signing originates from GXQS/core-compatible protocol primitives
- ✅ All IPC channels require authentication, scoped permissions, and replay protection
- ✅ UI processes are treated as **untrusted surfaces**

---

## Repository Structure

```
wallet/
├── runtime/
│   ├── gxqs-runtime/          # Runtime supervisor (walletd, minerd, validatord…)
│   ├── protocol/
│   │   └── go-rpc-bridge/     # Go JSON-RPC bridge (walletd)
│   └── policy-engine/         # Enterprise policy enforcement
├── crypto/
│   └── gxqs-wallet-core-rs/   # Rust crypto core (vault, address, WASM)
├── apps/
│   └── web/                   # Next.js dashboard
├── packages/
│   ├── sdk/                   # TypeScript SDK (@gxqs/sdk)
│   └── ui/                    # Shared UI components (@gxqs/ui)
├── infra/
│   ├── docker/                # Dockerfiles + Docker Compose
│   ├── kubernetes/            # Kustomize manifests
│   └── observability/         # Prometheus + Grafana configs
└── .github/workflows/         # CI (Go, Rust, TypeScript, WASM)
```

---

## Quick Start

### Prerequisites

- Go 1.24+
- Rust 1.94+ (`rustup install 1.94.1`)
- Node.js 24+
- pnpm 11+

### Development

```bash
# Install TypeScript dependencies
pnpm install

# Start web dashboard
pnpm --filter @gxqs/web dev

# Run all tests
pnpm test
cd runtime/protocol/go-rpc-bridge && go test ./...
cd runtime/crypto/gxqs-wallet-core-rs && cargo test

# Type-check all packages
pnpm typecheck

# Lint all packages
pnpm lint
```

### Run walletd locally

```bash
cd runtime/protocol/go-rpc-bridge
go run ./cmd/walletd

# Verify
curl http://localhost:8545/healthz
curl http://localhost:8545/rpc/v1/version
```

### Docker Compose (full stack)

```bash
cd infra/docker
docker compose up -d
```

---

## CI/CD

All pull requests must pass:

| Gate             | Tool                                          |
| ---------------- | --------------------------------------------- |
| TypeScript check | `tsc --noEmit`                                |
| Go vet           | `go vet`                                      |
| Rust clippy      | `cargo clippy`                                |
| Rust fmt         | `cargo fmt`                                   |
| npm audit        | `pnpm audit`                                  |
| cargo audit      | `cargo audit`                                 |
| WASM build       | `cargo build --target wasm32-unknown-unknown` |
| Prettier format  | `prettier --check`                            |

CI runs on **Ubuntu**, **Windows**, and **macOS** for all language stacks.

---

## Security Model

| Process    | Vault Access | Network Access | UI Access |
| ---------- | :----------: | :------------: | :-------: |
| walletd    |    ✅ R/W    | Internal only  |    ❌     |
| minerd     |      ❌      | Pool RPC only  |    ❌     |
| validatord |      ❌      | Consensus RPC  |    ❌     |
| telemetryd |      ❌      | Telemetry sink |    ❌     |
| Web UI     |      ❌      |  walletd IPC   |    ✅     |
| Browser    |      ❌      | Pool RPC only  |    ✅     |

---

## License

MIT © GXQS Platform Team
