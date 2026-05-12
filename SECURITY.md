# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 0.1.x   | ✅ Active |

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Please report security issues by emailing **security@gxqs.io** with:

- A description of the vulnerability and its potential impact
- Steps to reproduce or a proof-of-concept
- Affected component(s) (walletd, Rust vault, policy engine, web dashboard, etc.)

We will acknowledge receipt within **48 hours** and aim to deliver a fix within **14 days** for critical issues.

## Scope

In scope for security reports:

- `runtime/protocol/go-rpc-bridge` — walletd key management and signing
- `runtime/crypto/gxqs-wallet-core-rs` — AES-256-GCM vault, key derivation
- `runtime/gxqs-runtime` — supervisor process isolation
- `apps/web` — XSS, CSP bypass, sensitive data exposure
- CI/CD pipeline — supply-chain attacks, secret exposure

Out of scope:

- Theoretical attacks without a practical exploit path
- Issues in development-only tooling (Makefile, bootstrap scripts)
- Denial-of-service against local development environments

## Security Architecture

- **Private keys never leave `walletd`** — UI and runtime surfaces are explicitly untrusted
- **AES-256-GCM vault** with `zeroize`-on-drop — secret key memory is zeroed on deallocation
- **Process isolation** — mining and validator runtimes run under restricted OS credentials
- **Strict CSP** on the web dashboard — `script-src` is scoped to nonces in production
- **Docker** final image built `FROM scratch` — minimal attack surface (UID 65534, read-only root FS)

## Disclosure Policy

We follow [Coordinated Vulnerability Disclosure](https://en.wikipedia.org/wiki/Coordinated_vulnerability_disclosure). After a fix is released, reporters are credited in the release notes unless they prefer to remain anonymous.
