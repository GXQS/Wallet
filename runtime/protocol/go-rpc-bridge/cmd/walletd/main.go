// Package main is the entry point for the GXQS wallet daemon (walletd).
// walletd exposes a JSON-RPC and gRPC server that provides wallet, signing,
// transaction-building, and address-generation services. It forms the
// protocol-authoritative bridge between GXQS/core and all presentation layers.
package main

import (
	"context"
	"fmt"
	"log/slog"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gxqs/wallet/runtime/protocol/go-rpc-bridge/api"
	"github.com/gxqs/wallet/runtime/protocol/go-rpc-bridge/internal/config"
	"github.com/gxqs/wallet/runtime/protocol/go-rpc-bridge/pkg/healthcheck"
)

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}))
	slog.SetDefault(logger)

	cfg, err := config.Load()
	if err != nil {
		slog.Error("failed to load configuration", "error", err)
		os.Exit(1)
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Start JSON-RPC server.
	mux := http.NewServeMux()
	api.RegisterHandlers(mux, logger)
	healthcheck.RegisterHandlers(mux)

	srv := &http.Server{
		Addr:              fmt.Sprintf(":%d", cfg.RPCPort),
		Handler:           mux,
		ReadHeaderTimeout: 10 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       120 * time.Second,
	}

	ln, err := net.Listen("tcp", srv.Addr)
	if err != nil {
		slog.Error("failed to listen", "addr", srv.Addr, "error", err)
		os.Exit(1)
	}

	go func() {
		slog.Info("walletd started", "addr", srv.Addr, "version", "0.1.0")
		if err := srv.Serve(ln); err != nil && err != http.ErrServerClosed {
			slog.Error("walletd server error", "error", err)
			cancel()
		}
	}()

	// Wait for OS signal or context cancellation.
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)

	select {
	case sig := <-quit:
		slog.Info("received shutdown signal", "signal", sig)
	case <-ctx.Done():
		slog.Info("context cancelled, shutting down")
	}

	// Graceful shutdown with timeout.
	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer shutdownCancel()

	if err := srv.Shutdown(shutdownCtx); err != nil {
		slog.Error("graceful shutdown failed", "error", err)
		os.Exit(1)
	}

	slog.Info("walletd stopped cleanly")
}
