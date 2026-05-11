// Package main is the GXQS Runtime Supervisor.
//
// The supervisor manages the full lifecycle of all GXQS platform daemons:
//   - walletd   – wallet JSON-RPC bridge
//   - minerd    – compute/mining daemon
//   - validatord – validator controller
//   - telemetryd – telemetry aggregation agent
//   - deployerd  – deployment orchestration agent
//
// Each daemon runs in a supervised subprocess with:
//   - configurable restart backoff
//   - structured health checks
//   - heartbeat monitoring
//   - graceful shutdown
//
// The supervisor itself exposes a management HTTP API on :9000.
package main

import (
	"context"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

	"github.com/gxqs/wallet/runtime/gxqs-runtime/internal/watchdog"
)

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}))
	slog.SetDefault(logger)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	supervisor := watchdog.NewSupervisor(logger)

	// Register all platform daemons.
	supervisor.Register(watchdog.DaemonSpec{
		Name:        "walletd",
		Command:     []string{"walletd"},
		RestartMax:  5,
		HealthURL:   "http://localhost:8545/healthz",
		Description: "GXQS wallet JSON-RPC bridge",
	})
	supervisor.Register(watchdog.DaemonSpec{
		Name:        "telemetryd",
		Command:     []string{"telemetryd"},
		RestartMax:  10,
		HealthURL:   "http://localhost:9001/healthz",
		Description: "GXQS telemetry aggregation agent",
	})

	go func() {
		if err := supervisor.Run(ctx); err != nil {
			slog.Error("supervisor exited with error", "error", err)
			cancel()
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	select {
	case sig := <-quit:
		slog.Info("received shutdown signal", "signal", sig)
	case <-ctx.Done():
		slog.Info("context cancelled")
	}

	supervisor.Shutdown()
	slog.Info("GXQS runtime supervisor stopped")
}
