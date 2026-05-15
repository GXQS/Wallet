# PHASE 2: Technology Alignment - Migration Guide

**Version**: 1.0  
**Date**: May 15, 2026  
**Status**: Execute immediately after version updates

---

## Breaking Changes Summary

| Component            | Old                            | New      | Impact                      | Migration                           |
| -------------------- | ------------------------------ | -------- | --------------------------- | ----------------------------------- |
| **Node.js**          | Various                        | >=24.0.0 | CI/CD & dev env             | Update .nvmrc, CI configs           |
| **React**            | 18.3.1 (mobile) / 19.1.0 (web) | 18.3.1   | Type definitions, hooks API | Remove React 19 features in web app |
| **TypeScript**       | 5.3.3-5.8.3                    | 5.9.3    | Stricter type checking      | Fix type errors, undefined errors   |
| **Next.js Web**      | 16.2.6                         | 16.2.6   | No change                   | N/A                                 |
| **Next.js Exployer** | 15.5.15                        | 16.2.6   | App Router compatibility    | Update app routes, layout structure |
| **React Types**      | 19.1.x                         | 18.3.x   | API compatibility           | Adjust component type definitions   |

---

## Pre-Migration Checklist

Before running `pnpm install`, verify:

- [ ] Node.js 24.0.0+ installed locally (`node -v`)
- [ ] pnpm 11.0.0+ installed (`pnpm -v`)
- [ ] Current branch is clean (no uncommitted changes)
- [ ] All team members notified of version changes
- [ ] Backup of pnpm-lock.yaml created

---

## Step-by-Step Migration

### Step 1: Update Node.js Locally

```bash
# Using nvm
nvm install 24.0.0
nvm use 24.0.0

# Or using fnm, asdf, etc.
fnm install 24.0.0
fnm use 24.0.0

# Verify
node -v  # Should output v24.0.0+
```

### Step 2: Update pnpm Lock File

```bash
cd /workspaces/Wallet

# Remove old lock files
rm pnpm-lock.yaml

# Regenerate dependencies
pnpm install

# This will take 3-5 minutes and regenerate the lock file
# with all new dependency versions
```

**Expected output**:

```
 WARN  Some packages may have been updated
 WARN  Lock file is not up-to-date
 WARN  Updating pnpm-lock.yaml

 ⠙ Installing 324 new packages
```

### Step 3: Verify Installation

```bash
# Check all workspaces
pnpm --recursive --depth=10 ls

# You should see:
# ✔ Dependencies resolved successfully
# ✔ All packages using correct versions
```

### Step 4: Type-Check All Packages

```bash
pnpm typecheck

# Should output:
# @gxqs/web: ✓ No type errors
# @gxqs/mobile: ✓ No type errors
# @gxqs/sdk: ✓ No type errors
# @gxqs/ui: ✓ No type errors
```

**If errors occur**: See "Troubleshooting" section below.

### Step 5: Lint All Packages

```bash
pnpm lint

# Should output:
# @gxqs/web: ✓ 0 lint errors
# @gxqs/mobile: ✓ 0 lint errors
# @gxqs/sdk: ✓ 0 lint errors
# @gxqs/ui: ✓ 0 lint errors
```

### Step 6: Build All Packages

```bash
pnpm build

# Should output:
# @gxqs/sdk: ✓ Build successful (dist/index.js)
# @gxqs/ui: ✓ Build successful
# @gxqs/web: ✓ Build successful (.next/)
# @gxqs/mobile: ✓ Build successful
```

### Step 7: Run Tests

```bash
pnpm test

# Should output:
# @gxqs/web: ✓ 0 passed
# @gxqs/sdk: ✓ 0 passed
```

### Step 8: Commit Changes

```bash
git add -A
git commit -m "chore: standardize versions to Node 24+, React 18.3.1, TypeScript 5.9.3, Next.js 16.2.6"

# Or with conventional commit:
git commit -m "chore(deps): align versions across monorepo

- Node.js: >=24.0.0
- React: 18.3.1 (all packages)
- TypeScript: 5.9.3 (all packages)
- Next.js Web: 16.2.6 (no change)
- Next.js Exployer: 15.5.15 → 16.2.6"
```

---

## Migration Notes by Package

### Wallet/Web

**Changes**:

- React downgraded from 19.1.0 to 18.3.1
- TypeScript updated to 5.9.3

**Action Required**:

- Review any React 19-specific features (e.g., `use()` hook, `useTransition()`)
- Convert to React 18-compatible patterns
- Run typecheck to fix any type errors

**Common Fixes**:

```typescript
// ❌ React 19 only
const data = use(promise);

// ✅ React 18 pattern (use useEffect + useState)
const [data, setData] = useState(null);
useEffect(() => {
  promise.then(setData);
}, [promise]);
```

### Wallet/Mobile

**Changes**:

- TypeScript updated from 5.3.3 to 5.9.3

**Action Required**:

- No breaking changes expected
- Run typecheck and fix any strictness issues
- Test on real device if possible

### SDK Package

**Changes**:

- TypeScript updated to 5.9.3
- @types/node updated to 22.15.17

**Action Required**:

- Run typecheck
- Fix any type errors with Node.js APIs

### UI Components

**Changes**:

- React peer dependency pinned to 18.3.1
- TypeScript updated to 5.9.3
- @types/react downgraded to 18.3.3

**Action Required**:

- Update component types
- Ensure React 18 compatibility

### Exployer

**Changes**:

- Next.js upgraded from 15.5.15 to 16.2.6
- TypeScript upgraded from 5.5.3 to 5.9.3
- ESLint upgraded from 8.x to 9.x
- Node.js engine added: >=24.0.0

**Action Required** (⚠️ Largest migration):

1. Update App Router usage
   - Next.js 16 has new routing capabilities
   - Review `app/` directory structure
2. Fix deprecations

   ```typescript
   // ❌ Next.js 15 pattern
   import { useRouter } from 'next/router';

   // ✅ Next.js 16 pattern
   import { useRouter } from 'next/navigation';
   ```

3. Run typecheck and fix errors
4. Test dashboard functionality
5. Verify API integrations still work

---

## Troubleshooting

### Problem: TypeScript Errors After Update

**Symptom**:

```
error TS2322: Type 'X' is not assignable to type 'Y'
error TS18046: 'X' is possibly null or undefined
```

**Solution**:

```bash
# Run typecheck with --noEmit to see all errors
pnpm typecheck

# Fix errors by:
# 1. Adding missing type assertions
# 2. Using optional chaining (?.)
# 3. Nullish coalescing (??)
# 4. Type guards or if-checks

// Example fix:
- const value = obj.prop;
+ const value = obj?.prop ?? 'default';
```

### Problem: React Hook Type Errors

**Symptom**:

```
error TS2322: Type 'Promise<T>' is not assignable to 'T'
```

**Solution**: React 19's `use()` hook doesn't exist in React 18.

```typescript
// ❌ React 19 only
const data = use(promise);

// ✅ React 18 alternative
import { Suspense } from 'react';

const DataComponent = ({ promise }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    promise.then(setData);
  }, [promise]);
  return <div>{data}</div>;
};
```

### Problem: ESLint Version Conflict

**Symptom**:

```
Error: Could not find config file
Error: Plugin X requires ESLint 8.x but got 9.x
```

**Solution**:

```bash
# Remove eslint cache
rm -rf .eslintcache
rm -rf node_modules/.cache

# Reinstall with correct plugins
pnpm install

# Verify ESLint version
pnpm eslint --version  # Should be 9.x
```

### Problem: Lock File Conflicts

**Symptom**:

```
WARN  Conflicting pnpm-lock.yaml detected
```

**Solution**:

```bash
# Remove lock file and regenerate
rm pnpm-lock.yaml
pnpm install

# Or resolve conflicts manually:
git checkout --ours pnpm-lock.yaml
pnpm install --force
```

### Problem: Next.js Build Failure

**Symptom**:

```
error - Error: Route "/app/page" does not have required "default" export
```

**Solution**: Update app structure for Next.js 16.

```typescript
// ❌ Old pattern
export default function Page() {
  return <div>...</div>;
}

// ✅ Required in Next.js 16
'use client';

export default function Page() {
  return <div>...</div>;
}
```

---

## Rollback Plan (Emergency Only)

If critical issues arise that cannot be fixed quickly:

```bash
# Revert all changes
git reset --hard HEAD~1

# Reinstall old versions
rm pnpm-lock.yaml
pnpm install

# Notify team
```

⚠️ **Avoid rollback if possible** - instead, create hotfix branches for issues.

---

## Verification Commands

Run these to verify migration is successful:

```bash
# 1. Check Node version
node -v                    # Should be 24.0.0+

# 2. Check all package versions
pnpm ls --depth=0

# 3. Verify no type errors
pnpm typecheck

# 4. Verify no lint errors
pnpm lint

# 5. Build all packages
pnpm build

# 6. Run tests
pnpm test

# 7. Check lock file is clean
git diff pnpm-lock.yaml | head -50  # Should be regenerated but no conflicts
```

---

## Post-Migration

### Update CI/CD

Update `.github/workflows/` to use Node.js 24:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '24'
    cache: 'pnpm'
```

### Update .nvmrc

```bash
echo "24.0.0" > .nvmrc
```

### Update Docker (if applicable)

```dockerfile
FROM node:24.0.0-alpine
```

### Update Documentation

- Update CONTRIBUTING.md
- Update README setup instructions
- Update Docker Compose if needed

---

## Timeline

**Recommended execution**:

1. **Day 1 Morning**: Communication & PR creation
2. **Day 1 Afternoon**: Local testing & fixes
3. **Day 2 Morning**: Merge to main (after approval)
4. **Day 2 Afternoon**: CI/CD validation
5. **Day 3**: Team rollout & verification

---

## Support

If you encounter issues:

1. Check this guide's "Troubleshooting" section
2. Run `pnpm install --force` to clear caches
3. Delete `node_modules` and reinstall: `rm -rf node_modules && pnpm install`
4. Check GitHub Actions logs for CI-specific issues
5. Ask in team Slack/Discord with error logs

---

_Migration Guide v1.0_  
_Status_: Ready for execution  
_Contact_: DevOps Lead (@devops-channel)
