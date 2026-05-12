// Package config loads and validates walletd runtime configuration.
package config

import (
	"fmt"
	"os"
	"strconv"
)

// Config holds all runtime configuration for walletd.
type Config struct {
	RPCPort   int
	Network   string
	LogLevel  string
	VaultPath string
	CoreRPC   string
}

// Load reads configuration from environment variables with sane defaults.
func Load() (*Config, error) {
	cfg := &Config{
		RPCPort:   8545,
		Network:   "mainnet",
		LogLevel:  "info",
		VaultPath: "./vault.enc",
		CoreRPC:   "http://localhost:9090",
	}

	if v := os.Getenv("WALLETD_RPC_PORT"); v != "" {
		p, err := strconv.Atoi(v)
		if err != nil {
			return nil, fmt.Errorf("invalid WALLETD_RPC_PORT %q: %w", v, err)
		}
		if p < 1 || p > 65535 {
			return nil, fmt.Errorf("WALLETD_RPC_PORT %d out of valid range 1-65535", p)
		}
		cfg.RPCPort = p
	}

	if v := os.Getenv("GXQS_NETWORK"); v != "" {
		cfg.Network = v
	}
	if v := os.Getenv("WALLETD_LOG_LEVEL"); v != "" {
		cfg.LogLevel = v
	}
	if v := os.Getenv("WALLETD_VAULT_PATH"); v != "" {
		cfg.VaultPath = v
	}
	if v := os.Getenv("GXQS_CORE_RPC"); v != "" {
		cfg.CoreRPC = v
	}

	return cfg, nil
}
