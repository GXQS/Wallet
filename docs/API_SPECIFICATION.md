# GXQS API & Integration Specification

**Generated**: May 15, 2026  
**Scope**: Wallet, Core, Exployer Integration  
**Version**: 1.0 (Phase 1 Blueprint)

---

## Service API Map

```
┌─────────────────────────────────────────────────────────────────┐
│                      API TOPOLOGY MAP                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Frontend Apps (Browser/Mobile)                                 │
│  ├─ /api/wallet/...        ← walletd RPC endpoints             │
│  ├─ /api/chain/...         ← gxqsd RPC endpoints               │
│  └─ /api/explorer/...      ← Exployer Dashboard endpoints      │
│                                                                   │
│  Wallet RPC Bridge (walletd)                                    │
│  ├─ POST /wallet/init      (Initialize wallet)                 │
│  ├─ POST /wallet/sign      (Sign transaction)                  │
│  ├─ GET  /wallet/balance   (Get account balance)               │
│  ├─ GET  /wallet/history   (Transaction history)               │
│  └─ POST /wallet/export    (Export keys/backup)                │
│                                                                   │
│  Blockchain Node RPC (gxqsd)                                    │
│  ├─ POST /tx               (Broadcast transaction)              │
│  ├─ GET  /block/:height    (Get block)                         │
│  ├─ GET  /state/:addr      (Get account state)                 │
│  ├─ GET  /events (SSE)     (Stream chain events)               │
│  └─ GET  /health           (Health check)                       │
│                                                                   │
│  Explorer Dashboard (Exployer)                                  │
│  ├─ GET  /api/blocks       (Block history)                     │
│  ├─ GET  /api/transactions (Transaction list)                  │
│  ├─ GET  /api/addresses/:addr (Address details)                │
│  ├─ POST /api/ai/analyze   (AI anomaly detection)              │
│  └─ GET  /api/health       (Dashboard health)                  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Wallet API Specification

### 1. Wallet Initialization

```
POST /wallet/init
Content-Type: application/json

Request:
{
  "name": "My Wallet",
  "seedPhrase": "array of 12-24 words (BIP-39 mnemonic)",
  "password": "vault encryption password",
  "derivationPath": "m/44'/60'/0'/0/0"  // Optional
}

Response:
{
  "walletId": "uuid",
  "address": "gxqs1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
  "publicKey": "base64-encoded-ml-dsa-pubkey",
  "derivationPath": "m/44'/60'/0'/0/0",
  "status": "active"
}

Errors:
- 400: Invalid seed phrase
- 409: Wallet already initialized
- 500: Vault storage error
```

### 2. Sign Transaction

```
POST /wallet/sign
Content-Type: application/json
Authorization: Bearer <session_token>

Request:
{
  "walletId": "uuid",
  "transaction": {
    "to": "gxqs1recipient...",
    "amount": "1000000000000000000",  // In smallest unit
    "nonce": 42,
    "gasLimit": 21000,
    "chainId": "gxqs-mainnet-1"
  }
}

Response:
{
  "signedTx": {
    "from": "gxqs1sender...",
    "to": "gxqs1recipient...",
    "amount": "1000000000000000000",
    "nonce": 42,
    "signature": "base64-ml-dsa-signature",
    "publicKey": "base64-ml-dsa-pubkey",
    "chainId": "gxqs-mainnet-1",
    "hash": "0x..."
  },
  "txHash": "0x...",
  "estimatedGasCost": "2100000000000000"
}

Errors:
- 401: Unauthorized
- 422: Invalid transaction
- 500: Signing failed
```

### 3. Get Balance

```
GET /wallet/balance?walletId=<uuid>
Authorization: Bearer <session_token>

Response:
{
  "walletId": "uuid",
  "address": "gxqs1...",
  "balance": "5000000000000000000",  // In smallest unit
  "balanceFormatted": "5.0 GXQS",
  "nonce": 42,
  "confirmed": true
}
```

### 4. Transaction History

```
GET /wallet/history?walletId=<uuid>&limit=50&offset=0
Authorization: Bearer <session_token>

Response:
{
  "transactions": [
    {
      "hash": "0x...",
      "from": "gxqs1...",
      "to": "gxqs1...",
      "amount": "1000000000000000000",
      "nonce": 1,
      "status": "confirmed",  // pending, confirmed, failed
      "timestamp": 1715794800,
      "block": 12345,
      "gasUsed": 21000,
      "gasCost": "2100000000000000"
    }
  ],
  "total": 125,
  "limit": 50,
  "offset": 0
}
```

### 5. Export Wallet

```
POST /wallet/export
Content-Type: application/json
Authorization: Bearer <session_token>

Request:
{
  "walletId": "uuid",
  "includePrivateKey": false,  // Security: warn user if true
  "format": "json"  // json, mnemonic, keystore
}

Response:
{
  "walletId": "uuid",
  "address": "gxqs1...",
  "publicKey": "base64-pubkey",
  "derivationPath": "m/44'/60'/0'/0/0",
  "seedPhrase": "word1 word2 ... word24"  // Only if includePrivateKey=true
  // privateKey omitted for security
}
```

---

## Blockchain Core RPC Specification

### 1. Broadcast Transaction

```
POST /tx
Content-Type: application/json

Request:
{
  "from": "gxqs1sender...",
  "to": "gxqs1recipient...",
  "amount": "1000000000000000000",
  "nonce": 42,
  "signature": "base64-ml-dsa-signature",
  "publicKey": "base64-ml-dsa-pubkey",
  "chainId": "gxqs-mainnet-1",
  "hash": "0xabcd1234..."
}

Response:
{
  "txHash": "0x...",
  "status": "pending",
  "block": null,
  "timestamp": 1715794800
}

Errors:
- 400: Invalid transaction structure
- 409: Transaction already known
- 422: Nonce invalid/too low
- 429: Mempool full
- 500: Processing error
```

### 2. Get Block

```
GET /block/12345
  OR
GET /block/latest

Response:
{
  "height": 12345,
  "hash": "0x...",
  "parentHash": "0x...",
  "timestamp": 1715794800,
  "proposer": "gxqs1...",
  "transactions": [
    {
      "hash": "0x...",
      "from": "gxqs1...",
      "to": "gxqs1...",
      "amount": "1000000000000000000",
      "status": "confirmed"
    }
  ],
  "transactionCount": 150,
  "gasUsed": 3150000,
  "gasLimit": 30000000,
  "stateRoot": "0x...",
  "consensusData": {
    "round": 123,
    "qcHeight": 12344
  }
}
```

### 3. Get Account State

```
GET /state/gxqs1address...

Response:
{
  "address": "gxqs1...",
  "balance": "5000000000000000000",
  "nonce": 42,
  "codeHash": "0x..."  // Smart contract code if present
}
```

### 4. Stream Chain Events (Server-Sent Events)

```
GET /events?startBlock=12340&filters=block,transaction

Response: (streaming)
event: block
data: {
  "height": 12345,
  "hash": "0x...",
  "timestamp": 1715794800,
  "transactionCount": 150
}

event: transaction
data: {
  "hash": "0x...",
  "from": "gxqs1...",
  "to": "gxqs1...",
  "status": "confirmed",
  "block": 12345
}
```

### 5. Health Check

```
GET /health

Response:
{
  "status": "healthy",
  "version": "1.0.0",
  "network": "gxqs-mainnet-1",
  "height": 12345,
  "synced": true,
  "peers": 50,
  "timestamp": 1715794800
}
```

---

## Authentication & Authorization

### Wallet API Authentication

```
1. Session Creation:
   POST /auth/login
   Body: { "walletId": "uuid", "password": "..." }
   Response: { "token": "jwt", "expiresIn": 3600 }

2. Token Usage:
   GET /wallet/balance
   Header: Authorization: Bearer <jwt_token>

3. Token Structure:
   {
     "sub": "wallet_id",
     "aud": "wallet-api",
     "exp": 1715798400,
     "iat": 1715794800,
     "scopes": ["wallet.read", "wallet.sign"]
   }

4. Token Refresh:
   POST /auth/refresh
   Body: { "refreshToken": "..." }
   Response: { "token": "new_jwt", "expiresIn": 3600 }

5. Logout:
   POST /auth/logout
   Headers: Authorization: Bearer <jwt_token>
   Response: { "status": "success" }
```

### Core RPC Authentication

```
Public Endpoints: No auth required
- GET /block/:height
- GET /state/:addr
- GET /health

Controlled Endpoints: Token required
- POST /tx (rate-limited per token)
- GET /events (subscriptions limited)

Rate Limiting:
- Public: 100 req/min per IP
- Authenticated: 1000 req/min per token
```

---

## Error Codes

| Code | Name                 | Meaning                       | Retry                     |
| ---- | -------------------- | ----------------------------- | ------------------------- |
| 400  | Bad Request          | Invalid input                 | No                        |
| 401  | Unauthorized         | Missing/invalid auth          | After auth                |
| 403  | Forbidden            | Insufficient permissions      | No                        |
| 404  | Not Found            | Resource doesn't exist        | No                        |
| 409  | Conflict             | Resource state conflict       | No                        |
| 422  | Unprocessable Entity | Transaction validation failed | No (fix input)            |
| 429  | Too Many Requests    | Rate limit exceeded           | Yes (backoff)             |
| 500  | Internal Error       | Server error                  | Yes (exponential backoff) |
| 503  | Service Unavailable  | Temporary outage              | Yes (wait)                |

---

## Integration Flows

### Flow 1: User Creates Wallet & Sends Transaction

```
1. User opens Wallet Web App (Next.js)
2. Calls walletd: POST /wallet/init
3. walletd generates seed, derives keys
4. Stores in encrypted vault
5. Frontend displays address & seed backup
6. User enters recipient address & amount
7. Frontend calls walletd: POST /wallet/sign
8. walletd builds & signs transaction
9. Frontend calls gxqsd: POST /tx
10. gxqsd broadcasts to peers
11. Transaction enters mempool
12. Consensus includes in block
13. Frontend polls GET /block/latest
14. Displays confirmation to user
```

### Flow 2: Dashboard Monitors Blockchain Activity

```
1. Exployer opens (Next.js)
2. Calls gxqsd: GET /events (SSE stream)
3. Listens for block + transaction events
4. Stores in Exployer DB
5. Runs AI agents (anomaly detection, etc.)
6. User queries: GET /api/blocks
7. Frontend displays filtered block list
8. User searches address: GET /api/addresses/:addr
9. Exployer queries gxqsd: GET /state/:addr
10. Combines with transaction history
11. Displays address dashboard
```

### Flow 3: Multi-wallet Account Management

```
1. User logs into Wallet Web
2. Can manage multiple wallets:
   - Wallet A (personal)
   - Wallet B (business)
   - Wallet C (cold storage - watch-only)
3. For each, walletd maintains separate vault
4. User switches wallets → updates session
5. All balances fetched from gxqsd per wallet
6. Transactions signed per wallet
```

---

## Backward Compatibility

### API Versioning Strategy

```
URLs: /v1/wallet/..., /v2/wallet/...

Migration Path:
1. v1: Current (ML-DSA only)
2. v2: Hybrid signatures (ML-DSA + ECDSA)
3. v3: Multi-sig support
4. v4: Account abstraction

Deprecation:
- v1 supported for 18 months after v2 launch
- Clear migration guides provided
- Sunset notice 6 months before removal
```

### Breaking Changes Checklist

Before any breaking change:

- [ ] Deprecation notice published 6 months prior
- [ ] Migration guide documented
- [ ] Both old + new versions supported simultaneously
- [ ] Automated migration tools provided
- [ ] User notification system in place

---

## Performance & SLA

| Metric               | Target         | Production SLA |
| -------------------- | -------------- | -------------- |
| **Sign Transaction** | <500ms         | 99.9%          |
| **Get Balance**      | <100ms         | 99.95%         |
| **Broadcast Tx**     | <1s            | 99.9%          |
| **Block Production** | ~5s            | 99.5%          |
| **Get Block**        | <100ms         | 99.95%         |
| **Stream Events**    | <100ms latency | 99.5%          |
| **API Availability** | 99.95% uptime  | Per endpoint   |

---

## Security Headers & CORS

### Response Headers

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; script-src 'self' 'wasm-unsafe-eval'
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### CORS Policy

```
Allowed Origins:
- https://wallet.gxqs.io (production)
- http://localhost:3000 (development)
- http://localhost:19006 (Expo)

Allowed Methods: GET, POST, OPTIONS
Allowed Headers: Content-Type, Authorization
Credentials: Include (for session cookies)
Max Age: 86400s
```

---

## Testing Requirements

### Integration Test Matrix

| Scenario                     | Wallet | Core | Exployer | Status |
| ---------------------------- | ------ | ---- | -------- | ------ |
| Init wallet + check balance  | ✅     | ✅   | —        | Needed |
| Sign & broadcast transaction | ✅     | ✅   | —        | Needed |
| Query transaction history    | ✅     | ✅   | ✅       | Needed |
| Stream events                | —      | ✅   | ✅       | Needed |
| Multi-wallet management      | ✅     | —    | —        | Needed |
| Replay attack prevention     | ✅     | ✅   | —        | Needed |
| Nonce synchronization        | ✅     | ✅   | —        | Needed |

---

_API Specification v1.0_  
_Last Updated_: May 15, 2026  
_Status_: Blueprint (Phase 1)
