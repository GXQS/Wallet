#!/usr/bin/env bash
# bootstrap.sh – GXQS Platform one-shot developer bootstrap (Linux / macOS)
#
# Usage: bash scripts/bootstrap.sh
set -euo pipefail

CYAN='\033[36m'
BOLD='\033[1m'
RESET='\033[0m'
OK='\033[32m✔\033[0m'
WARN='\033[33m⚠\033[0m'
ERR='\033[31m✖\033[0m'

info()  { echo -e "${CYAN}→${RESET} $*"; }
ok()    { echo -e "${OK} $*"; }
warn()  { echo -e "${WARN} $*"; }
die()   { echo -e "${ERR} $*" >&2; exit 1; }

echo ""
echo -e "${BOLD}${CYAN}GXQS Distributed Compute Operating Platform – Bootstrap${RESET}"
echo ""

# ─── Prerequisites ────────────────────────────────────────────────────────────

check_version() {
  local cmd="$1" required="$2"
  if ! command -v "$cmd" &>/dev/null; then
    warn "$cmd not found – some build targets may fail."
    return 1
  fi
  ok "$cmd found: $(${cmd} --version 2>&1 | head -1)"
}

info "Checking prerequisites..."
check_version go      "1.24" || true
check_version rustc   "1.94" || true
check_version cargo   "1.94" || true
check_version node    "24"   || true
check_version pnpm    "11"   || true
check_version docker  ""     || true

# ─── Go workspace ─────────────────────────────────────────────────────────────

if command -v go &>/dev/null; then
  info "Syncing Go workspace..."
  go work sync
  ok "Go workspace synced"
fi

# ─── Cargo dependencies ───────────────────────────────────────────────────────

if command -v cargo &>/dev/null; then
  info "Fetching Cargo dependencies..."
  cargo fetch --manifest-path runtime/crypto/Cargo.toml
  ok "Cargo dependencies fetched"

  info "Installing cargo-audit..."
  cargo install cargo-audit --locked --quiet 2>/dev/null || warn "cargo-audit install skipped (already present)"
fi

# ─── govulncheck ──────────────────────────────────────────────────────────────

if command -v go &>/dev/null; then
  info "Installing govulncheck..."
  go install golang.org/x/vuln/cmd/govulncheck@latest 2>/dev/null || warn "govulncheck install skipped"
fi

# ─── Node / pnpm dependencies ─────────────────────────────────────────────────

if command -v pnpm &>/dev/null; then
  info "Installing Node dependencies (frozen lockfile)..."
  pnpm install --frozen-lockfile
  ok "Node dependencies installed"
else
  die "pnpm is required. Install via: npm install -g pnpm@11"
fi

# ─── Lefthook (git hooks) ─────────────────────────────────────────────────────

if command -v pnpm &>/dev/null; then
  info "Installing git hooks via lefthook..."
  pnpm prepare
  ok "Git hooks installed"
fi

echo ""
ok "Bootstrap complete. Run 'make help' to see available targets."
echo ""
