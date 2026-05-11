#Requires -Version 5.1
<#
.SYNOPSIS
    GXQS Platform one-shot developer bootstrap for Windows.
.DESCRIPTION
    Verifies prerequisites, syncs Go workspace, fetches Cargo dependencies,
    and installs Node dependencies via pnpm.
.EXAMPLE
    .\scripts\bootstrap.ps1
#>
[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Write-Step  { param($msg) Write-Host "-> $msg" -ForegroundColor Cyan }
function Write-Ok    { param($msg) Write-Host "OK $msg"  -ForegroundColor Green }
function Write-Warn  { param($msg) Write-Host "!! $msg"  -ForegroundColor Yellow }

Write-Host ""
Write-Host "GXQS Distributed Compute Operating Platform - Bootstrap" -ForegroundColor Cyan -NoNewline
Write-Host ""
Write-Host ""

# ─── Prerequisites ─────────────────────────────────────────────────────────────

function Test-Command {
    param([string]$Name)
    $exists = [bool](Get-Command $Name -ErrorAction SilentlyContinue)
    if ($exists) {
        $ver = & $Name --version 2>&1 | Select-Object -First 1
        Write-Ok "$Name found: $ver"
    } else {
        Write-Warn "$Name not found - some build targets may fail."
    }
    return $exists
}

Write-Step "Checking prerequisites..."
$hasGo     = Test-Command 'go'
$hasCargo  = Test-Command 'cargo'
$hasNode   = Test-Command 'node'
$hasPnpm   = Test-Command 'pnpm'
Test-Command 'docker' | Out-Null

# ─── Go workspace ──────────────────────────────────────────────────────────────

if ($hasGo) {
    Write-Step "Syncing Go workspace..."
    & go work sync
    if ($LASTEXITCODE -eq 0) { Write-Ok "Go workspace synced" }
}

# ─── Cargo dependencies ────────────────────────────────────────────────────────

if ($hasCargo) {
    Write-Step "Fetching Cargo dependencies..."
    & cargo fetch --manifest-path runtime/crypto/Cargo.toml
    if ($LASTEXITCODE -eq 0) { Write-Ok "Cargo dependencies fetched" }

    Write-Step "Installing cargo-audit..."
    try {
        & cargo install cargo-audit --locked --quiet 2>$null
        Write-Ok "cargo-audit installed"
    } catch {
        Write-Warn "cargo-audit install skipped (already present)"
    }
}

# ─── govulncheck ───────────────────────────────────────────────────────────────

if ($hasGo) {
    Write-Step "Installing govulncheck..."
    try {
        & go install golang.org/x/vuln/cmd/govulncheck@latest 2>$null
        Write-Ok "govulncheck installed"
    } catch {
        Write-Warn "govulncheck install skipped"
    }
}

# ─── Node / pnpm dependencies ──────────────────────────────────────────────────

if (-not $hasPnpm) {
    Write-Error "pnpm is required. Install via: npm install -g pnpm@11"
}

Write-Step "Installing Node dependencies (frozen lockfile)..."
& pnpm install --frozen-lockfile
if ($LASTEXITCODE -ne 0) {
    Write-Error "pnpm install failed"
}
Write-Ok "Node dependencies installed"

# ─── Lefthook (git hooks) ──────────────────────────────────────────────────────

Write-Step "Installing git hooks via lefthook..."
& pnpm prepare
if ($LASTEXITCODE -eq 0) { Write-Ok "Git hooks installed" }

Write-Host ""
Write-Ok "Bootstrap complete. Run 'make help' or 'pnpm --help' to see available targets."
Write-Host ""
