# GXQS Cryptographic Security Architecture

**Generated**: May 15, 2026  
**Classification**: Internal  
**Purpose**: Quantum-Ready Wallet Security Model

---

## Cryptographic Stack Overview

### Post-Quantum Cryptography (Core Layer)

The GXQS blockchain implements quantum-resistant cryptography via **Cloudflare/circl**:

```
┌─────────────────────────────────────────────────────────┐
│          GXQS Post-Quantum Cryptography                  │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Signature Schemes:                                      │
│  ├─ ML-DSA (NIST FIPS 204)          [Primary]          │
│  ├─ SLH-DSA (NIST FIPS 205)         [Lattice-based]    │
│  └─ Dilithium (CRYSTALS)             [Lattice-based]    │
│                                                           │
│  Key Encapsulation:                                      │
│  ├─ ML-KEM (NIST FIPS 203)          [KYBER variant]    │
│  └─ Kyber (CRYSTALS)                [Lattice-based]    │
│                                                           │
│  Symmetric Encryption:                                   │
│  └─ AES-256-GCM                     [Authenticated]     │
│                                                           │
│  Hash Functions:                                         │
│  ├─ SHA-3/256, SHA-3/512           [FIPS 202]          │
│  └─ SHAKE256                        [Variable-length]   │
│                                                           │
│  Key Derivation:                                         │
│  └─ SHAKE256 KDF + HMAC-SHA512      [Deterministic]    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Wallet Cryptographic Flow

```
User Seed (64 bytes, user-provided or generated)
    ↓ [SHAKE256]
Master Key Material
    ↓ [Deterministic KDF]
Account-Specific Keys
    ├─ PQC Signing Key (ML-DSA private)
    ├─ PQC Encryption Key (ML-KEM private)
    ├─ Address Generation (Kyber public + hash)
    └─ Session Keys (AES-256 for vault)
    ↓
Vault Storage (AES-256-GCM encrypted)
```

---

## Key Management Architecture

### Seed-to-Key Derivation

| Layer             | Process                                | Algorithm         | Security Level   |
| ----------------- | -------------------------------------- | ----------------- | ---------------- |
| **Input**         | User provides seed OR system generates | —                 | User-dependent   |
| **L1 Entropy**    | Seed hashing                           | SHA-3/512         | 256-bit          |
| **L2 Master**     | KDF master material                    | SHAKE256          | Deterministic    |
| **L3 Account**    | Per-account subkeys                    | HMAC-SHA512 + KDF | Account-isolated |
| **L4 Signing**    | ML-DSA private key derivation          | SHAKE256 + KDF    | PQC-resistant    |
| **L5 Encryption** | ML-KEM private key derivation          | SHAKE256 + KDF    | PQC-resistant    |
| **L6 Storage**    | Vault encryption key                   | AES-256-GCM       | Authenticated    |

### Hardware Wallet Integration Readiness

```
┌─────────────────────────────────────────┐
│   Hardware Wallet Support (Future)      │
├─────────────────────────────────────────┤
│                                          │
│  USB/HID Interface Layer                │
│    ↓ (Protocol TBD)                     │
│  Hardware Wallet                        │
│    ├─ Seed Storage (isolated)           │
│    ├─ ML-DSA Signing (offchain)         │
│    └─ ML-KEM Decapsulation (offchain)   │
│                                          │
│  Firmware: Deterministic signing        │
│  No private key exposure to wallet app  │
│                                          │
└─────────────────────────────────────────┘
```

---

## Transaction Signing Security Model

### Signing Flow

```
1. User Initiates Transaction (Wallet UI)
   ├─ Input validation (amount, recipient, nonce)
   └─ Transaction structure validation

2. Transaction Building (SDK)
   ├─ Encode to transaction bytes
   ├─ Calculate transaction hash
   └─ Prepare signing request

3. Signing Request (walletd Bridge)
   ├─ Retrieve account signing key from vault
   ├─ Verify transaction integrity
   └─ Perform signing operation

4. Signature Generation (gxqs-wallet-core-rs)
   ├─ ML-DSA: FIPS 204 deterministic signing
   ├─ Input: transaction bytes + signing key
   ├─ Output: ML-DSA signature (2420 bytes)
   └─ Zeroize signing key material

5. Signature Verification (gxqsd Core)
   ├─ Verify sender address matches pubkey
   ├─ Verify signature against transaction hash
   ├─ Check nonce for replay protection
   └─ Update account nonce (atomic)

6. Transaction Broadcast
   └─ Signed transaction → mempool → consensus
```

### Security Properties

| Property               | Mechanism               | Guarantee                   |
| ---------------------- | ----------------------- | --------------------------- |
| **Authenticity**       | ML-DSA signatures       | Sender proven               |
| **Non-repudiation**    | Public key cryptography | Signer cannot deny          |
| **Integrity**          | Hash verification       | Transaction unchanged       |
| **Replay Protection**  | Nonce counter           | Each tx unique              |
| **Quantum Resistance** | Lattice-based PQC       | Safe from quantum computers |

---

## Address Generation & Validation

### Address Derivation

```
Account Seed (64 bytes)
    ↓ [SHAKE256 KDF]
Account Master Key
    ├─ [Derive ML-DSA pubkey]
    ├─ [Derive ML-KEM pubkey]
    └─ [Derive Address Hash]
    ↓
Address = base58check(prefix + hash(ML-DSA_pub + ML-KEM_pub))
```

### Address Validation

| Check         | Method                               | Purpose            |
| ------------- | ------------------------------------ | ------------------ |
| **Format**    | Base58check decode + checksum        | Typo detection     |
| **Prefix**    | Network identifier (mainnet/testnet) | Network validation |
| **Length**    | 34-40 bytes (variable)               | Format validation  |
| **Ownership** | Challenge-response signing           | Prove key material |

---

## Vault Encryption Architecture

### Encrypted Storage (Rust Runtime)

```
┌─────────────────────────────────────────┐
│        Encrypted Vault Storage          │
├─────────────────────────────────────────┤
│                                          │
│  File: ~/.gxqs/vault.encrypted          │
│                                          │
│  Structure:                             │
│  ├─ Version (1 byte)                   │
│  ├─ Nonce (12 bytes, random)           │
│  ├─ Ciphertext (AES-256-GCM)           │
│  │  └─ Seeds, Keys, Metadata           │
│  └─ Authentication Tag (16 bytes)      │
│                                          │
│  Encryption:                            │
│  ├─ Algorithm: AES-256-GCM              │
│  ├─ Key Derivation: PBKDF2              │
│  │  └─ Iterations: 600,000 (OWASP)    │
│  └─ AAD: Wallet metadata                │
│                                          │
└─────────────────────────────────────────┘
```

### Key Material Isolation

1. **User Password**
   - Never transmitted
   - Never stored (derived per-session)
   - Used for vault encryption only

2. **Private Keys**
   - Stored encrypted in vault
   - Never exposed to JavaScript frontend
   - Only used in Rust runtime for signing

3. **Session Keys**
   - Generated per-session
   - Time-limited (configurable)
   - Zeroized on logout

---

## Frontend Security Constraints

### What Frontend Can Do ✅

- Display addresses
- View transaction history
- Display account balance
- Construct transaction payloads
- Validate inputs
- Manage session state

### What Frontend Cannot Do ❌

- Access private keys directly
- Perform cryptographic operations on keys
- Store unencrypted keys
- Make signing decisions without user approval
- Bypass walletd bridge authentication

### Attack Vectors Mitigated

| Vector                | Mitigation                  | Implementation               |
| --------------------- | --------------------------- | ---------------------------- |
| **XSS**               | CSP headers + SRI integrity | Next.js security middleware  |
| **CSRF**              | SameSite cookies + tokens   | walletd session validation   |
| **Key Exfiltration**  | No keys in localStorage     | Rust vault isolation         |
| **Man-in-the-Middle** | HTTPS + certificate pinning | TLS 1.3 + HPKP               |
| **Timing Attacks**    | Constant-time comparisons   | circl library implementation |

---

## Transaction Validation & Replay Protection

### Nonce-Based Replay Prevention

```
Transaction:
{
  "from": "address_A",
  "to": "address_B",
  "amount": 1000,
  "nonce": 42,          ← Must match account state
  "chainId": "gxqs-1",  ← Must match current chain
  "signature": "...",
  "timestamp": 1234567890
}

Validation on Core:
1. Retrieve current nonce for sender
2. Verify tx.nonce == current_nonce
3. Atomic increment nonce
4. Verify chainId matches current chain
```

### Chain ID Binding

```
Each transaction includes:
- chainId = blake3(genesis_hash + consensus_params + timestamp)
- Prevents transactions from being replayed across forks
- Verified by consensus before inclusion
```

---

## Hybrid Cryptography Support (Future)

### Phase 3 Implementation

```
Transaction v2:
{
  "signatures": [
    {
      "algorithm": "ML-DSA",
      "pubkey": "...",
      "signature": "..."
    },
    {
      "algorithm": "ECDSA",
      "pubkey": "...",
      "signature": "..."
    }
  ],
  "threshold": 1  ← At least 1 must be valid
}

Benefits:
- Gradual migration path (not quantum-jump)
- Backward compatibility during transition
- Multi-signature capabilities
- Algorithm flexibility per account
```

---

## Security Audit Checklist

### Code Review Points

- [ ] All private keys zeroized after use (`sodium_memzero` equivalent)
- [ ] Deterministic random number generation via KDF, not `rand`
- [ ] No hardcoded keys/passwords
- [ ] All cryptographic operations from `circl` library (no custom crypto)
- [ ] Signature verification always performed before state mutation
- [ ] Nonce incremented atomically with transaction
- [ ] Transaction hash includes all mutable fields
- [ ] Address validation always performed before receiving funds

### Runtime Security

- [ ] Vault file permissions: 0600 (user read/write only)
- [ ] Environment variables not exposed in logs
- [ ] No debug symbols in production binaries
- [ ] Core built as distroless image
- [ ] Core runs as non-root user
- [ ] RPC endpoints require authentication
- [ ] Network interface binding validated

### Testing Requirements

- [ ] Unit tests for all signature algorithms
- [ ] Integration tests for wallet → core flow
- [ ] Replay attack tests (same tx, different blocks)
- [ ] Fork scenario tests (different chainId)
- [ ] Key derivation determinism tests
- [ ] Fuzz testing on address parsing
- [ ] Timing attack resistance tests (constant-time verification)

---

## Incident Response Plan

### Key Compromise Scenario

1. **Immediate**: Mark account as compromised in client
2. **Short-term**: Generate new seed from backup
3. **Recovery**: Rebuild derived keys from new seed
4. **Notification**: Alert user of all transactions from old key
5. **Audit**: Query blockchain for fraudulent transactions

### Vault Corruption

1. **Detection**: Authentication tag verification failure
2. **Recovery**: Restore from backup
3. **Fallback**: Rebuild from paper seed

---

## Compliance & Standards

- **NIST Standards**:
  - FIPS 202 (SHA-3)
  - FIPS 203 (ML-KEM)
  - FIPS 204 (ML-DSA)
  - FIPS 205 (SLH-DSA)

- **OWASP Guidelines**:
  - Password hashing: PBKDF2 with 600,000 iterations
  - Key derivation: HKDF over SHAKE256
  - Random number generation: Cryptographically secure

- **Industry Standards**:
  - BIP-32: Hierarchical deterministic wallets
  - BIP-39: Mnemonic seed words
  - Base58Check: Address encoding

---

## Quantum Threat Assessment

### Current Vulnerabilities

| Algorithm | Status        | Timeline    | Action              |
| --------- | ------------- | ----------- | ------------------- |
| **ECDSA** | ⚠️ Vulnerable | 15-20 years | Phase out gradually |
| **RSA**   | ⚠️ Vulnerable | 15-20 years | Already unused      |
| **SHA-2** | ✅ Safe       | 30+ years   | Continue for now    |

### Protective Measures

1. **Hybrid Signatures**: Support both PQC + classical
2. **Harvest-Now-Decrypt-Later Resistance**: Use ML-DSA for all new accounts
3. **Regular Audits**: Annual cryptographic review
4. **Upgrade Path**: Versioned transactions support algorithm changes

---

_Security Architecture Review_: Q2 2026  
_Next Audit_: Q4 2026 (post-launch)  
_Responsible Team_: Cryptography + Security Engineering
