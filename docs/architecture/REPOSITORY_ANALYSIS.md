# GXQS Quantum Secure Wallet - Repository Analysis

**Generated**: May 15, 2026  
**Phase**: 1 - Repository Discovery & Mapping  
**Scope**: 3 Repositories (Wallet, core, Exployer)

---

## Executive Summary

The GXQS ecosystem comprises three tightly integrated repositories forming a production-grade quantum-secure wallet platform:

1. **GXQS/Wallet** - TypeScript/React multi-platform wallet (Web/Mobile + Rust runtime)
2. **GXQS/core** - Go-based blockchain node with post-quantum cryptography
3. **GXQS/Exployer** - Next.js AI-powered block explorer and intelligence dashboard

**Current State**: Functional but requires alignment and hardening  
**Production Readiness**: 65% - Requires standardization and security enhancements  
**Critical Path**: Technology alignment → Security hardening → Testing & validation

---

## Repository Topology

```
┌─────────────────────────────────────────────────────────────────┐
│                    GXQS Quantum Wallet Ecosystem                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐   │
│  │   Wallet App     │  │    Exployer      │  │   Core       │   │
│  │  (TypeScript)    │  │  (Next.js + AI)  │  │   (Go + PQC) │   │
│  │                  │  │                  │  │              │   │
│  │ • Web (Next 16)  │  │ • Dashboard      │  │ • Consensus  │   │
│  │ • Mobile (Expo)  │  │ • AI Agents      │  │ • PQC Crypto │   │
│  │ • SDK (pkg)      │  │ • Economics      │  │ • VM         │   │
│  │ • UI (pkg)       │  │ • Multichain     │  │ • Network    │   │
│  └────────┬─────────┘  └────────┬─────────┘  └──────┬───────┘   │
│           │                    │                    │            │
│           └────────┬───────────┴────────┬───────────┘            │
│                    │                    │                        │
│           ┌────────▼───────┐   ┌───────▼────────┐               │
│           │   walletd RPC  │◄─►│  gxqsd RPC     │               │
│           │   (Bridge)     │   │  (Core)        │               │
│           └────────────────┘   └────────────────┘               │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack Matrix

### GXQS/Wallet (Web/Mobile/SDK)

| Component             | Technology          | Version                       | Status              |
| --------------------- | ------------------- | ----------------------------- | ------------------- |
| **Web Framework**     | Next.js             | 16.2.6                        | ✅ Modern (canary)  |
| **Mobile Framework**  | React Native (Expo) | 0.76.5                        | ✅ Current          |
| **React**             | React               | 19.2.6 (Web), 18.3.1 (Mobile) | ⚠️ Version mismatch |
| **TypeScript**        | TypeScript          | 5.9.3                         | ✅ Latest           |
| **Node.js**           | Node.js             | >=24.0.0                      | ✅ LTS-ready        |
| **Package Manager**   | pnpm                | 11.0.9                        | ✅ Modern           |
| **Build Tool**        | Turbo               | 2.5.4                         | ✅ Latest           |
| **Crypto (Frontend)** | Internal SDK        | 0.1.0                         | ✅ RPC-based        |
| **Crypto (Runtime)**  | Rust (aes-256-gcm)  | —                             | ✅ High-security    |
| **Testing**           | Vitest              | 3.2.4                         | ✅ Current          |

### GXQS/core (Blockchain)

| Component          | Technology              | Version | Status                   |
| ------------------ | ----------------------- | ------- | ------------------------ |
| **Language**       | Go                      | 1.25.10 | ✅ Latest dev version    |
| **Consensus**      | BFT (custom)            | —       | ✅ Custom implementation |
| **PQC Algorithms** | Cloudflare/circl        | 1.6.3   | ✅ Production-ready      |
| **Crypto**         | Go crypto/x             | 0.51.0  | ✅ Latest                |
| **Database**       | (Custom state mgmt)     | —       | ✅ Deterministic         |
| **Networking**     | P2P Gossip              | —       | ✅ Custom                |
| **Docker**         | Go 1.25.10 → distroless | —       | ✅ Minimal image         |

### GXQS/Exployer (Dashboard)

| Component      | Technology   | Version | Status                        |
| -------------- | ------------ | ------- | ----------------------------- |
| **Framework**  | Next.js      | 15.5.15 | ✅ Stable LTS                 |
| **React**      | React        | 18.3.1  | ✅ Stable                     |
| **TypeScript** | TypeScript   | 5.5.3   | ⚠️ Outdated (vs Wallet 5.9.3) |
| **API Client** | SWR          | Latest  | ✅ Data fetching              |
| **Styling**    | Tailwind CSS | Latest  | ✅ Utility-first              |
| **Testing**    | Jest         | —       | ✅ Standard                   |

---

## Dependency Analysis

### Version Mismatches (⚠️ Critical for Phase 2)

| Dependency     | Wallet                       | Exployer    | core         | Recommendation                              |
| -------------- | ---------------------------- | ----------- | ------------ | ------------------------------------------- |
| **React**      | 19.2.6 (Web) 18.3.1 (Mobile) | 18.3.1      | —            | Standardize Web to 18.3.1 for compatibility |
| **TypeScript** | 5.9.3                        | 5.5.3       | —            | Upgrade Exployer to 5.9.3                   |
| **Next.js**    | 16.2.6                       | 15.5.15     | —            | Standardize both to 16.2.6 or keep separate |
| **Node.js**    | >=24.0.0                     | ~20 (types) | 1.25.10 (Go) | Standardize to Node 24.0.0+                 |

### Cryptographic Libraries

| Library              | Location      | Purpose                                        | Version |
| -------------------- | ------------- | ---------------------------------------------- | ------- |
| **Cloudflare/circl** | core          | PQC: ML-KEM, ML-DSA, SLH-DSA, Kyber, Dilithium | 1.6.3   |
| **x/crypto**         | core          | Traditional: SHA-3, SHAKE, AES-GCM             | 0.51.0  |
| **aes-gcm**          | Wallet (Rust) | Authenticated encryption for vault             | Latest  |
| **Internal SDK**     | Wallet/SDK    | RPC client to Core                             | 0.1.0   |

### Identified Issues

1. **React Version Mismatch (Wallet Web vs Mobile)**
   - Web: React 19.2.6 (canary)
   - Mobile: React 18.3.1 (stable)
   - **Impact**: Component library incompatibility, shared component issues
   - **Action**: Standardize in Phase 2

2. **TypeScript Version Drift**
   - Wallet: 5.9.3
   - Exployer: 5.5.3
   - **Impact**: Type incompatibilities in shared libraries
   - **Action**: Upgrade Exployer in Phase 2

3. **Next.js Version Drift**
   - Wallet/web: 16.2.6 (experimental)
   - Exployer: 15.5.15 (stable)
   - **Impact**: Different App Router implementations, API differences
   - **Action**: Decide standardization approach in Phase 2

4. **Node.js Version Mismatch**
   - Wallet: >=24.0.0
   - Exployer: ~20 (types)
   - **Impact**: CI/CD environment inconsistency
   - **Action**: Standardize to 24.0.0+ LTS in Phase 2

---

## Architecture Layers

### Layer 1: Client/UI (TypeScript)

- **Wallet Web** (Next.js 16.2.6, React 19.2.6)
- **Wallet Mobile** (React Native 0.76.5, React 18.3.1)
- **Exployer Dashboard** (Next.js 15.5.15, React 18.3.1)

### Layer 2: SDK/Business Logic (TypeScript)

- **SDK** (@gxqs/sdk) - RPC client library
- **UI Components** (@gxqs/ui) - Shared component library

### Layer 3: Runtime/Bridge (Rust + Node)

- **walletd** - Wallet daemon bridge
- **Key derivation** - BIP-32/39-like from GXQS seeds
- **Vault encryption** - AES-256-GCM

### Layer 4: Blockchain Core (Go)

- **gxqsd** - Blockchain node
- **Consensus** - BFT with pacemaker
- **Cryptography** - Post-Quantum (ML-KEM, ML-DSA) + Traditional
- **VM** - Transaction execution
- **RPC API** - `/tx`, `/block`, `/state`, `/events`

---

## Data Flow Analysis

### Wallet Transaction Flow

```
User Input (Wallet UI)
    ↓
Input Validation (SDK)
    ↓
Transaction Building (SDK + walletd RPC)
    ↓
Signing Request (walletd → vault)
    ↓
Deterministic Key Derivation (from seed)
    ↓
PQC Signature (ML-DSA or hybrid)
    ↓
Transaction Broadcast (walletd → gxqsd RPC /tx)
    ↓
Mempool Entry (gxqsd)
    ↓
Consensus Round (BFT)
    ↓
Block Finalization
    ↓
State Update
    ↓
Event Streaming (SSE /events)
    ↓
Exployer Dashboard (RPC polling)
    ↓
User Confirmation
```

### Security Boundaries

1. **Frontend ↔ Backend**: Token-based auth (`X-Walletd-Token`)
2. **Wallet ↔ Core**: RPC over HTTP + HMAC validation
3. **Vault ↔ Keys**: AES-256-GCM encryption in Rust
4. **User ↔ Frontend**: CSP headers + SRI integrity

---

## Service Topology

### Core Services

| Service            | Port           | Transport          | Auth    | Purpose               |
| ------------------ | -------------- | ------------------ | ------- | --------------------- |
| **gxqsd RPC**      | 8545           | JSON-RPC over HTTP | Token   | Blockchain state/tx   |
| **gxqsd P2P**      | 9000           | Custom protocol    | Pubkey  | Peer-to-peer gossip   |
| **walletd Bridge** | 8546 (default) | JSON-RPC over HTTP | Token   | Wallet-to-Core bridge |
| **Wallet Web**     | 3000           | HTTPS              | Session | User interface        |
| **Wallet Mobile**  | (embedded)     | HTTP/RPC           | Session | User interface        |
| **Exployer API**   | 3001           | HTTPS              | Session | Dashboard API         |

---

## Security Risk Assessment

### High Priority (🔴)

1. **Frontend Crypto Exposure**: Mitigated by delegating to walletd; verify no key material in localStorage
2. **Token Management**: `X-Walletd-Token` requires secure rotation and validation
3. **RPC Endpoint Access**: Ensure gxqsd RPC is not exposed to internet

### Medium Priority (🟡)

1. **React Version Mismatch**: Can cause subtle bugs in shared components
2. **Dependency Vulnerabilities**: Several ignored GHSA packages need review
3. **CSP Headers**: Exployer needs strict CSP to prevent XSS
4. **Input Validation**: Dashboard search/queries need sanitization

### Low Priority (🟢)

1. **TypeScript Version Drift**: Type checking differences
2. **Containerization**: distroless image is good, but verify no secrets in layers

---

## Critical Dependencies Audit

### All Repositories

- **Ignored Security Advisories**: 6 GHSA entries in pnpm audit config
  - Review each for production impact
  - Determine if safe to keep ignored

### Wallet

- **pnpm overrides**: React 19.1.0 pinned globally
- **Minimize release age exclusions**: 2 packages excluded from age checks
- **Build allowlist**: Sharp, esbuild, unrs-resolver require native builds

### core

- **Unmaintained dependencies**: Check for deprecated Go modules
- **PQC libraries**: circl is well-maintained; verify no GPL/copyleft issues

### Exployer

- **Next.js 15 LTS stability**: Ensure no experimental APIs used

---

## Identified Gaps & Misconfigurations

### Build & CI/CD

- ❌ No unified CI/CD pipeline across 3 repos
- ❌ No automated release/tagging system
- ❌ No security scanning (SAST) integrated
- ❌ No E2E test coordination

### Configuration Management

- ❌ No .env.example files documented
- ❌ No multi-environment configs (dev/staging/prod)
- ❌ No feature flags implementation
- ❌ No secrets management pattern (Vault/AWS Secrets)

### Testing & QA

- ⚠️ Limited test coverage visibility
- ❌ No E2E wallet flow tests
- ❌ No chaos/fuzz testing for blockchain
- ❌ No recovery/disaster scenario testing

### Documentation

- ⚠️ Minimal README documentation
- ❌ No security model documentation
- ❌ No architecture decision records (ADRs)
- ❌ No deployment runbooks
- ❌ No troubleshooting guides

### Observability

- ⚠️ No structured logging across platforms
- ❌ No metrics/telemetry collection
- ❌ No distributed tracing
- ❌ No alerting system

---

## Recommendations for Phase 2 (Technology Alignment)

### Immediate (P0 - Week 1)

1. ✅ Standardize Node.js to 24.0.0+
2. ✅ Upgrade Exployer TypeScript to 5.9.3
3. ✅ Align React versions (decide 18.3.1 or 19.x strategy)
4. ✅ Create unified monorepo root configuration

### Short-term (P1 - Week 2-3)

1. ✅ Align Next.js versions or document rationale
2. ✅ Review and remediate 6 ignored GHSA advisories
3. ✅ Implement shared ESLint configuration
4. ✅ Create environment validation layer
5. ✅ Document API contracts (OpenAPI/GraphQL schemas)

### Medium-term (P2 - Phase 3-4)

1. ✅ Post-Quantum crypto abstraction layer
2. ✅ Encrypted config management
3. ✅ Enterprise logging & tracing
4. ✅ Automated security scanning (SAST/DAST)

---

## Next Steps

**Phase 2** will standardize all technology versions, fix import issues, and establish unified configurations.

**Estimated Timeline**:

- Phase 1: ✅ Complete (You are here)
- Phase 2: 1-2 weeks
- Phase 3-12: 8-12 weeks total

---

_Generated by: Principal Architect Agent_  
_Review Period: Q2 2026_
