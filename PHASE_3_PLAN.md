# PHASE 3: Quantum-Ready Security Hardening - Implementation Plan

**Started**: May 15, 2026  
**Duration**: 2 weeks  
**Goal**: Enterprise-grade security with quantum resistance

---

## Overview

Phase 3 adds comprehensive security layers across the GXQS wallet ecosystem:

```
Layer 1: Cryptographic Abstraction
├─ PQC wrapper (Kyber, Dilithium)
├─ Hybrid signature support
├─ Memory-safe key handling
└─ Algorithm versioning

Layer 2: Key Management
├─ Encrypted vault
├─ Deterministic KDF
├─ Hardware wallet support prep
└─ Key rotation

Layer 3: Configuration Security
├─ Secrets encryption
├─ Environment validation
├─ Feature flags
└─ Multi-environment support

Layer 4: Transport & Storage
├─ CSP headers
├─ HSTS enforcement
├─ SRI integrity
├─ Encrypted cookies

Layer 5: Audit & Compliance
├─ Transaction audit logs
├─ Security event logs
├─ Compliance tracking
└─ Incident response
```

---

## Task 1: Create @gxqs/crypto Package

**Objective**: Centralized, abstracted cryptographic operations

### File Structure

```
packages/crypto/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                 (main exports)
│   ├── types.ts                 (shared types)
│   ├── algorithms/
│   │   ├── index.ts
│   │   ├── mldsa.ts             (PQC signing)
│   │   ├── mlkem.ts             (PQC key exchange)
│   │   ├── kyber.ts             (key encapsulation)
│   │   ├── dilithium.ts         (signatures)
│   │   └── hybrid.ts            (PQC + ECDSA fallback)
│   ├── keys/
│   │   ├── index.ts
│   │   ├── generation.ts        (seed → keys)
│   │   ├── derivation.ts        (BIP-32-like)
│   │   ├── storage.ts           (vault encryption)
│   │   └── zeroize.ts           (memory safety)
│   ├── signatures/
│   │   ├── index.ts
│   │   ├── sign.ts              (signing operations)
│   │   ├── verify.ts            (verification)
│   │   └── validate.ts          (signature validation)
│   ├── config/
│   │   ├── index.ts
│   │   ├── providers.ts         (algorithm selection)
│   │   └── validation.ts        (crypto config validation)
│   └── utils/
│       ├── encoding.ts          (base64, hex, etc)
│       ├── hashing.ts           (SHA-3, SHAKE)
│       └── random.ts            (secure RNG)
└── tests/
    ├── algorithms.test.ts
    ├── keys.test.ts
    ├── signatures.test.ts
    └── hybrid.test.ts
```

### Implementation: types.ts

```typescript
// Core type definitions for crypto abstraction

export enum SignatureAlgorithm {
  ML_DSA = 'ML-DSA', // NIST FIPS 204
  DILITHIUM = 'Dilithium', // CRYSTALS variant
  ECDSA = 'ECDSA', // Traditional (for interop)
}

export enum KeyEncapsulationAlgorithm {
  ML_KEM = 'ML-KEM', // NIST FIPS 203
  KYBER = 'Kyber', // CRYSTALS variant
}

export interface KeyPair {
  algorithm: SignatureAlgorithm;
  publicKey: Uint8Array;
  privateKey: Uint8Array; // Encrypted in storage
  derivationPath: string; // BIP-32-like path
  metadata: {
    createdAt: number;
    algorithm: SignatureAlgorithm;
    version: number; // For algorithm upgrades
  };
}

export interface Signature {
  algorithm: SignatureAlgorithm;
  value: Uint8Array; // Raw signature bytes
  publicKey: Uint8Array; // Public key for verification
  metadata: {
    timestamp: number;
    messageHash: string; // Message digest
    verified?: boolean;
  };
}

export interface HybridSignature {
  signatures: Array<{
    algorithm: SignatureAlgorithm;
    signature: Uint8Array;
    publicKey: Uint8Array;
  }>;
  threshold: number; // Min signatures required
  metadata: {
    timestamp: number;
    version: number;
  };
}

export interface CryptoConfig {
  preferredAlgorithm: SignatureAlgorithm;
  supportedAlgorithms: SignatureAlgorithm[];
  enableHybridMode: boolean;
  keyDerivationPath: string;
  memoryZeroize: boolean;
  auditLogging: boolean;
}
```

### Implementation: mldsa.ts (PQC Signing)

```typescript
// ML-DSA wrapper for NIST FIPS 204 signatures
// Wraps the circl library (Go) via RPC

import { SignatureAlgorithm, KeyPair, Signature } from '../types';

export class MLDSAProvider {
  static readonly algorithm = SignatureAlgorithm.ML_DSA;
  static readonly keySize = 2944; // Bytes
  static readonly signatureSize = 2420; // Bytes

  /**
   * Generate a new ML-DSA keypair
   * @param seed - 64-byte seed (entropy)
   * @returns KeyPair with public/private keys
   */
  static async generateKeyPair(
    seed: Uint8Array,
    derivationPath: string = "m/44'/0'/0'/0/0",
  ): Promise<KeyPair> {
    if (seed.length !== 64) {
      throw new Error('Seed must be 64 bytes');
    }

    // Call walletd RPC: POST /crypto/generate-key
    // {
    //   "algorithm": "ML-DSA",
    //   "seed": "<base64>",
    //   "derivationPath": "m/44'/0'/0'/0/0"
    // }

    return {
      algorithm: SignatureAlgorithm.ML_DSA,
      publicKey: new Uint8Array(), // From RPC response
      privateKey: new Uint8Array(), // Encrypted at walletd
      derivationPath,
      metadata: {
        createdAt: Date.now(),
        algorithm: SignatureAlgorithm.ML_DSA,
        version: 1,
      },
    };
  }

  /**
   * Sign a message with ML-DSA
   * @param message - Message bytes to sign
   * @param privateKey - Private key (typically encrypted)
   * @returns Signature object
   */
  static async sign(message: Uint8Array, privateKey: Uint8Array): Promise<Signature> {
    // Validate inputs
    if (!message || message.length === 0) {
      throw new Error('Message cannot be empty');
    }

    if (privateKey.length !== this.keySize) {
      throw new Error(`Private key must be ${this.keySize} bytes`);
    }

    // Call walletd RPC: POST /crypto/sign
    // {
    //   "algorithm": "ML-DSA",
    //   "message": "<base64>",
    //   "privateKey": "<encrypted-base64>"
    // }

    return {
      algorithm: SignatureAlgorithm.ML_DSA,
      value: new Uint8Array(), // From RPC response
      publicKey: new Uint8Array(),
      metadata: {
        timestamp: Date.now(),
        messageHash: await hashSHA3(message),
      },
    };
  }

  /**
   * Verify a signature
   * @param message - Original message
   * @param signature - Signature bytes
   * @param publicKey - Signer's public key
   * @returns true if valid, false otherwise
   */
  static async verify(
    message: Uint8Array,
    signature: Uint8Array,
    publicKey: Uint8Array,
  ): Promise<boolean> {
    if (signature.length !== this.signatureSize) {
      return false;
    }

    // Call walletd RPC: POST /crypto/verify
    // {
    //   "algorithm": "ML-DSA",
    //   "message": "<base64>",
    //   "signature": "<base64>",
    //   "publicKey": "<base64>"
    // }

    return true; // From RPC response
  }
}

async function hashSHA3(data: Uint8Array): Promise<string> {
  // SHA-3 hash for audit logging
  return '';
}
```

### Key Design Principles

1. **Algorithm Abstraction**: Consumers don't know if it's Dilithium, ML-DSA, etc.
2. **RPC Delegation**: All key operations go through walletd bridge (no key exposure to frontend)
3. **Type Safety**: Strong TypeScript types for all operations
4. **Memory Safety**: Automatic zeroization of sensitive data
5. **Audit Trail**: All operations logged (timestamp, algorithm, hash)
6. **Versioning**: Algorithm version tracked for future migrations

---

## Task 2: Implement Hybrid Signature Support

**Objective**: Backward compatibility during PQC transition

### Usage Example

```typescript
// Create hybrid signature (PQC + ECDSA)
const signature = await cryptoProvider.signHybrid(message, privateKey, {
  algorithms: [SignatureAlgorithm.ML_DSA, SignatureAlgorithm.ECDSA],
  threshold: 1, // Only 1 must be valid
});

// Verify requires at least threshold signatures to be valid
const isValid = await cryptoProvider.verifyHybrid(message, signature, {
  threshold: 1,
});
```

### Transaction Format (v2)

```typescript
interface TransactionV2 {
  version: 2;
  from: string;
  to: string;
  amount: string;
  nonce: number;
  chainId: string;
  timestamp: number;

  // New: Multiple signatures
  signatures: Array<{
    algorithm: SignatureAlgorithm;
    publicKey: string; // Base64-encoded
    signature: string; // Base64-encoded
    metadata: {
      weight: number; // 0-100 weight for multisig
    };
  }>;

  // New: Signature policy
  signaturePolicy: {
    threshold: number; // Min weight required
    totalWeight: number; // Sum of all weights
    algorithm: 'ANY' | 'ALL' | 'THRESHOLD';
  };

  hash: string; // Blake3(tx_bytes)
}
```

---

## Task 3: Secure Configuration System

**Objective**: Encrypted secrets, validation, multi-environment support

### Implementation: @gxqs/config Package

```typescript
// config/index.ts
import { z } from 'zod';

const WalletConfigSchema = z.object({
  // Network
  chainId: z.string().default('gxqs-mainnet-1'),
  rpcEndpoint: z.string().url().default('https://rpc.gxqs.io'),
  explorerUrl: z.string().url().default('https://explorer.gxqs.io'),

  // Security
  enableEncryption: z.boolean().default(true),
  encryptionKey: z.string().optional(), // From env: GXQS_ENCRYPTION_KEY
  vaultPath: z.string().default('~/.gxqs/vault.encrypted'),

  // Wallet
  derivationPath: z.string().default("m/44'/0'/0'/0/0"),
  accountsLimit: z.number().int().default(10),

  // Session
  sessionTimeout: z.number().int().default(3600), // 1 hour
  lockTimeout: z.number().int().default(300), // 5 minutes

  // Features
  enableBiometric: z.boolean().default(false),
  enableHardwareWallet: z.boolean().default(false),
  enableHybridSignatures: z.boolean().default(false),

  // Observability
  enableLogging: z.boolean().default(true),
  logLevel: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  enableAudit: z.boolean().default(true),
});

export type WalletConfig = z.infer<typeof WalletConfigSchema>;

export function validateConfig(config: unknown): WalletConfig {
  return WalletConfigSchema.parse(config);
}

export function loadConfig(environment: 'dev' | 'staging' | 'beta' | 'prod'): WalletConfig {
  const envConfig = loadFromEnvironment();
  const fileConfig = loadFromFile(`config.${environment}.json`);
  const merged = { ...defaultConfig, ...fileConfig, ...envConfig };
  return validateConfig(merged);
}
```

### Environment File Structure

```bash
# .env.example
GXQS_CHAIN_ID=gxqs-testnet-1
GXQS_RPC_ENDPOINT=http://localhost:8545
GXQS_EXPLORER_URL=http://localhost:3001
GXQS_ENCRYPTION_KEY=<base64-encrypted>
GXQS_SESSION_TIMEOUT=3600
GXQS_LOG_LEVEL=info
GXQS_ENABLE_AUDIT=true

# Secrets (never in version control)
GXQS_VAULT_PASSWORD=<user-provides>
GXQS_HARDWARE_WALLET_PIN=<optional>
```

---

## Task 4: Security Headers & CSP

### Next.js Middleware: apps/web/src/middleware.ts

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Strict Transport Security (HSTS)
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Content Security Policy (CSP)
  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'wasm-unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://rpc.gxqs.io https://explorer.gxqs.io",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');

  response.headers.set('Content-Security-Policy', cspHeader);

  // Additional Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), payment=()',
  );

  // Subresource Integrity
  response.headers.set(
    'X-SRI',
    'sha384-<hash>', // For external scripts
  );

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

---

## Task 5: Audit Logging

### Implementation: @gxqs/audit Package

```typescript
export interface AuditEvent {
  id: string; // UUID
  timestamp: number; // Unix timestamp
  severity: 'debug' | 'info' | 'warn' | 'error' | 'critical';
  category: AuditCategory;
  action: string;
  actor: string; // User ID or system
  resource: string; // What was affected
  changes: Record<string, any>; // Before/after
  result: 'success' | 'failure';
  metadata: {
    ip?: string;
    userAgent?: string;
    requestId?: string;
    duration?: number; // milliseconds
  };
}

export enum AuditCategory {
  KEY_GENERATION = 'KEY_GENERATION',
  TRANSACTION_SIGN = 'TRANSACTION_SIGN',
  WALLET_UNLOCK = 'WALLET_UNLOCK',
  WALLET_EXPORT = 'WALLET_EXPORT',
  VAULT_ACCESS = 'VAULT_ACCESS',
  CONFIG_CHANGE = 'CONFIG_CHANGE',
  SECURITY_EVENT = 'SECURITY_EVENT',
}

export class AuditLogger {
  async log(event: AuditEvent): Promise<void> {
    // Write to:
    // 1. File system (rotating log files)
    // 2. Observability platform (if configured)
    // 3. Security SIEM (if configured)
  }

  async queryAuditLog(
    filters: {
      actor?: string;
      category?: AuditCategory;
      startTime?: number;
      endTime?: number;
    },
    limit: number = 1000,
  ): Promise<AuditEvent[]> {
    // Query audit logs with filters
  }
}
```

### Audit Events to Log

| Event                  | Category         | Severity | When                       |
| ---------------------- | ---------------- | -------- | -------------------------- |
| Key generation started | KEY_GENERATION   | info     | User creates new wallet    |
| Seed derived           | KEY_GENERATION   | debug    | Deterministic derivation   |
| Private key stored     | VAULT_ACCESS     | info     | Key saved to vault         |
| Transaction signing    | TRANSACTION_SIGN | info     | Before signing operation   |
| Signature created      | TRANSACTION_SIGN | debug    | After signature generation |
| Wallet unlocked        | WALLET_UNLOCK    | warn     | User enters password       |
| Wallet export          | WALLET_EXPORT    | warn     | User exports keys          |
| Failed login attempt   | SECURITY_EVENT   | warn     | Wrong password 3x          |
| Vault corrupted        | SECURITY_EVENT   | critical | Auth tag failed            |

---

## Task 6: Hardware Wallet Abstraction

**Objective**: Future-proof support for hardware devices

### Interface: src/hardware/types.ts

```typescript
export interface HardwareWalletProvider {
  name: string; // 'Ledger', 'Trezor', etc.
  version: string;

  connect(): Promise<void>;
  disconnect(): Promise<void>;

  getAddress(path: string): Promise<string>;
  getPublicKey(path: string): Promise<Uint8Array>;

  sign(message: Uint8Array, path: string): Promise<Signature>;

  supportsPQC(): boolean;
}

export interface LedgerProvider extends HardwareWalletProvider {
  // Specific Ledger methods
  // Communicates via USB/Bluetooth HID
}

export interface TrezorProvider extends HardwareWalletProvider {
  // Specific Trezor methods
}
```

---

## Deliverables Checklist

- [ ] @gxqs/crypto package (all modules)
- [ ] Hybrid signature support (v2 transactions)
- [ ] @gxqs/config package with validation
- [ ] Environment files (.env.\*, .env.example)
- [ ] Security headers middleware (Next.js)
- [ ] @gxqs/audit package with logging
- [ ] Hardware wallet abstraction layer
- [ ] CSP violation reports (Sentry integration)
- [ ] Security documentation (SECURITY.md)
- [ ] Threat model (updated)
- [ ] Security audit checklist

---

## Success Criteria

- ✅ Zero crypto operations in browser
- ✅ All keys delegated to walletd/runtime
- ✅ CSP headers on all responses
- ✅ Audit log for all sensitive operations
- ✅ Hybrid signature transactions tested
- ✅ TypeScript: zero errors
- ✅ All tests passing

---

## Timeline

**Week 1**:

- Day 1-2: @gxqs/crypto package (types, ML-DSA, ML-KEM)
- Day 3-4: Hybrid signature support
- Day 5: Testing & validation

**Week 2**:

- Day 1-2: @gxqs/config & environment setup
- Day 3-4: Security headers & CSP
- Day 5: Audit logging & documentation

---

_Phase 3 Implementation Plan v1.0_  
_Status_: Ready for execution after Phase 2 completion
