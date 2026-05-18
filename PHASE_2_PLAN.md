# PHASE 2: Technology Alignment - Execution Plan

**Started**: May 15, 2026  
**Duration**: 2 weeks  
**Goal**: Standardize all technology versions and configurations

---

## Decision Matrix

### React Version Strategy

**Options**:

- A: Downgrade Web to 18.3.1 (match Mobile/Exployer)
- B: Upgrade Mobile/Exployer to 19.x (match Web)
- C: Keep separate but ensure interoperability

**DECISION**: **Option A - Standardize to React 18.3.1**

- Reason: More stable, proven in production, mobile compatibility
- Web app benefits: Recent Next.js 16 has great 18.x support
- Cost: Minor features from React 19 postponed to v2
- Migration: Web app components stay compatible, just pinned to 18.3.1

### Next.js Version Strategy

**Options**:

- A: Downgrade Web to 15.5.15 (match Exployer)
- B: Upgrade Exployer to 16.2.6 (match Web)
- C: Keep separate, coordinate through SDK

**DECISION**: **Option B - Upgrade Exployer to Next.js 16.2.6**

- Reason: Web is production-critical, Exployer is UI-only
- Web version: 16.2.6 is near-production, has good typescript support
- Exployer gains: Faster builds, better performance
- Cost: Migration of Exployer App Router (minor)

### Node.js Version

**DECISION**: **24.0.0 LTS (minimum)**

- All projects require >=24.0.0
- Aligns with Wallet requirements
- Good feature parity across Exployer/core (where applicable)

### TypeScript Version

**DECISION**: **5.9.3 (Exployer upgrade required)**

- Wallet: Already at 5.9.3 ✅
- Exployer: Upgrade from 5.5.3 → 5.9.3
- Type safety improvements

---

## Implementation Tasks

### Task 1: Node.js Version Standardization

**Files to Update**:

- [x] /workspaces/Wallet/package.json
- [ ] /workspaces/Wallet/apps/web/package.json (if specified)
- [ ] /workspaces/Wallet/apps/mobile/package.json (if specified)
- [ ] /tmp/gxqs-repos/Exployer/package.json
- [ ] GitHub Actions CI configs

**Changes**:

```json
"engines": {
  "node": ">=24.0.0",
  "pnpm": ">=11.0.0"
}
```

### Task 2: React Version Standardization

**Decision**: Downgrade Web to React 18.3.1

**Files to Update**:

- [ ] /workspaces/Wallet/package.json (pnpm overrides)
- [ ] /workspaces/Wallet/apps/web/package.json
- [ ] /tmp/gxqs-repos/Exployer/package.json

**Changes**:

```json
// Remove or downgrade pnpm.overrides.react
"pnpm": {
  "overrides": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  }
}
```

### Task 3: Next.js Version Alignment

**Decision**: Upgrade Exployer to 16.2.6

**Files to Update**:

- [ ] /tmp/gxqs-repos/Exployer/package.json

**Changes**:

```json
{
  "next": "^16.2.6",
  "typescript": "^5.9.3"
}
```

### Task 4: TypeScript Upgrade (Exployer)

**Changes**:

```json
{
  "typescript": "^5.9.3"
}
```

### Task 5: Create Shared Configurations

**Files to Create**:

- [ ] /workspaces/Wallet/.eslintrc.base.cjs (shared eslint)
- [ ] /workspaces/Wallet/.prettierrc.base.json (shared prettier)
- [ ] /workspaces/Wallet/tsconfig.shared.json (already exists as base)

### Task 6: Fix Import Paths & Type Errors

**Steps**:

1. Run `pnpm install` in Wallet
2. Run TypeScript check: `pnpm typecheck`
3. Fix any broken imports
4. Verify all package exports
5. Test SDK integration

### Task 7: Verify Dependencies

**Steps**:

1. Audit for new vulnerabilities
2. Review ignored GHSA advisories
3. Check for conflicts

### Task 8: Test Alignment

**Steps**:

1. Full build across all packages
2. Type checking passes
3. Linting passes
4. Tests pass
5. E2E smoke tests pass

---

## Status Tracking

Starting implementation now...
