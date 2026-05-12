.DEFAULT_GOAL := help
SHELL         := /bin/bash
PNPM          ?= pnpm
GO            ?= go
CARGO         ?= cargo

# ─── Colour helpers ──────────────────────────────────────────────────────────
BOLD  := \033[1m
RESET := \033[0m
CYAN  := \033[36m

.PHONY: help
help: ## Show this help message
	@echo ""
	@echo "  $(BOLD)$(CYAN)GXQS Distributed Compute Operating Platform$(RESET)"
	@echo ""
	@grep -E '^[a-zA-Z_/-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  $(CYAN)%-28s$(RESET) %s\n", $$1, $$2}'
	@echo ""

# ─── Bootstrap ───────────────────────────────────────────────────────────────

.PHONY: bootstrap
bootstrap: ## Install all toolchain prerequisites and project dependencies
	@echo "$(CYAN)→ Installing Node dependencies...$(RESET)"
	$(PNPM) install --frozen-lockfile
	@echo "$(CYAN)→ Syncing Go workspace...$(RESET)"
	$(GO) work sync
	@echo "$(CYAN)→ Fetching Go dependencies...$(RESET)"
	$(GO) work download
	@echo "$(CYAN)→ Fetching Cargo dependencies...$(RESET)"
	$(CARGO) fetch --manifest-path runtime/crypto/Cargo.toml
	@echo "$(CYAN)✔ Bootstrap complete$(RESET)"

# ─── Build ────────────────────────────────────────────────────────────────────

.PHONY: build
build: build/ts build/go build/rust ## Build all components

.PHONY: build/ts
build/ts: ## Build TypeScript packages and apps
	$(PNPM) build

.PHONY: build/go
build/go: ## Build all Go modules
	$(GO) build ./runtime/protocol/go-rpc-bridge/...
	$(GO) build ./runtime/gxqs-runtime/...
	$(GO) build ./runtime/policy-engine/...

.PHONY: build/rust
build/rust: ## Build Rust crypto core
	$(CARGO) build --manifest-path runtime/crypto/gxqs-wallet-core-rs/Cargo.toml --release

.PHONY: build/wasm
build/wasm: ## Build Rust WASM target for browser
	$(CARGO) build --manifest-path runtime/crypto/gxqs-wallet-core-rs/Cargo.toml \
		--target wasm32-unknown-unknown --release --features wasm

# ─── Test ─────────────────────────────────────────────────────────────────────

.PHONY: test
test: test/ts test/go test/rust ## Run all tests

.PHONY: test/ts
test/ts: ## Run TypeScript tests
	$(PNPM) test

.PHONY: test/go
test/go: ## Run Go tests (race + short)
	$(GO) test -race -short -count=1 -timeout=120s ./runtime/protocol/go-rpc-bridge/...
	$(GO) test -race -short -count=1 -timeout=120s ./runtime/gxqs-runtime/...
	$(GO) test -race -short -count=1 -timeout=120s ./runtime/policy-engine/...

.PHONY: test/rust
test/rust: ## Run Rust tests
	$(CARGO) test --manifest-path runtime/crypto/gxqs-wallet-core-rs/Cargo.toml --all-features

# ─── Lint ─────────────────────────────────────────────────────────────────────

.PHONY: lint
lint: lint/ts lint/go lint/rust ## Run all linters

.PHONY: lint/ts
lint/ts: ## Lint TypeScript packages
	$(PNPM) lint

.PHONY: lint/go
lint/go: ## Run go vet on all Go modules
	$(GO) vet ./runtime/protocol/go-rpc-bridge/...
	$(GO) vet ./runtime/gxqs-runtime/...
	$(GO) vet ./runtime/policy-engine/...

.PHONY: lint/rust
lint/rust: ## Run cargo clippy on Rust crypto core
	$(CARGO) clippy --manifest-path runtime/crypto/gxqs-wallet-core-rs/Cargo.toml \
		--all-targets --all-features -- -D warnings

# ─── Format ───────────────────────────────────────────────────────────────────

.PHONY: fmt
fmt: fmt/ts fmt/go fmt/rust ## Format all source files

.PHONY: fmt/ts
fmt/ts: ## Format TypeScript/JSON/CSS with Prettier
	$(PNPM) format

.PHONY: fmt/go
fmt/go: ## Format Go source files
	gofmt -w runtime/protocol/go-rpc-bridge runtime/gxqs-runtime runtime/policy-engine

.PHONY: fmt/rust
fmt/rust: ## Format Rust source files
	$(CARGO) fmt --manifest-path runtime/crypto/gxqs-wallet-core-rs/Cargo.toml

# ─── Typecheck ────────────────────────────────────────────────────────────────

.PHONY: typecheck
typecheck: ## Run TypeScript type checking
	$(PNPM) typecheck

# ─── Audit ────────────────────────────────────────────────────────────────────

.PHONY: audit
audit: audit/ts audit/rust ## Run security audits

.PHONY: audit/ts
audit/ts: ## Audit npm dependencies
	$(PNPM) audit --audit-level=moderate

.PHONY: audit/rust
audit/rust: ## Audit Cargo dependencies
	$(CARGO) audit --manifest-path runtime/crypto/gxqs-wallet-core-rs/Cargo.toml

# ─── Dev ──────────────────────────────────────────────────────────────────────

.PHONY: dev
dev: ## Start all development servers in parallel
	$(PNPM) dev

.PHONY: dev/web
dev/web: ## Start web dashboard dev server
	cd apps/web && $(PNPM) dev

.PHONY: dev/walletd
dev/walletd: ## Run walletd in development mode
	$(GO) run ./runtime/protocol/go-rpc-bridge/cmd/walletd

.PHONY: dev/supervisor
dev/supervisor: ## Run the runtime supervisor
	$(GO) run ./runtime/gxqs-runtime/cmd/supervisor

# ─── Infrastructure ───────────────────────────────────────────────────────────

.PHONY: docker/build
docker/build: ## Build walletd Docker image
	docker build -f infra/docker/Dockerfile.walletd -t gxqs/walletd:dev .

.PHONY: docker/up
docker/up: ## Start full Docker Compose stack
	docker compose -f infra/docker/docker-compose.yml up -d

.PHONY: docker/down
docker/down: ## Stop Docker Compose stack
	docker compose -f infra/docker/docker-compose.yml down

.PHONY: k8s/apply
k8s/apply: ## Apply Kubernetes manifests
	kubectl apply -k infra/kubernetes/base

.PHONY: k8s/delete
k8s/delete: ## Delete Kubernetes manifests
	kubectl delete -k infra/kubernetes/base

# ─── Clean ────────────────────────────────────────────────────────────────────

.PHONY: clean
clean: ## Remove build artefacts
	$(PNPM) clean || true
	$(CARGO) clean --manifest-path runtime/crypto/gxqs-wallet-core-rs/Cargo.toml || true
	find runtime -name '*.test' -delete || true
	@echo "$(CYAN)✔ Clean complete$(RESET)"
