// Package watchdog provides supervised process management for GXQS platform daemons.
package watchdog

import (
	"context"
	"fmt"
	"log/slog"
	"math"
	"net/http"
	"os"
	"os/exec"
	"sync"
	"time"
)

// DaemonSpec describes a supervised daemon process.
type DaemonSpec struct {
	Name        string
	Command     []string
	RestartMax  int
	HealthURL   string
	Description string
}

// DaemonState holds the runtime state of a supervised daemon.
type DaemonState struct {
	Spec        DaemonSpec
	PID         int
	Restarts    int
	Status      string
	LastStarted time.Time
	LastHealthy time.Time
}

// Supervisor manages the lifecycle of multiple daemon processes.
type Supervisor struct {
	mu      sync.RWMutex
	daemons map[string]*DaemonState
	log     *slog.Logger
	done    chan struct{}
}

// NewSupervisor creates a new Supervisor instance.
func NewSupervisor(logger *slog.Logger) *Supervisor {
	return &Supervisor{
		daemons: make(map[string]*DaemonState),
		log:     logger,
		done:    make(chan struct{}),
	}
}

// Register adds a daemon to the supervisor's registry.
// Daemons must be registered before calling Run.
func (s *Supervisor) Register(spec DaemonSpec) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.daemons[spec.Name] = &DaemonState{
		Spec:   spec,
		Status: "registered",
	}
	s.log.Info("daemon registered", "name", spec.Name, "description", spec.Description)
}

// Run starts all registered daemons and supervises them until ctx is cancelled.
func (s *Supervisor) Run(ctx context.Context) error {
	s.mu.RLock()
	names := make([]string, 0, len(s.daemons))
	for name := range s.daemons {
		names = append(names, name)
	}
	s.mu.RUnlock()

	var wg sync.WaitGroup
	for _, name := range names {
		wg.Add(1)
		go func(n string) {
			defer wg.Done()
			s.supervise(ctx, n)
		}(name)
	}

	wg.Wait()
	return nil
}

// supervise runs a single daemon with exponential-backoff restart policy.
func (s *Supervisor) supervise(ctx context.Context, name string) {
	s.mu.RLock()
	state := s.daemons[name]
	s.mu.RUnlock()

	for {
		select {
		case <-ctx.Done():
			return
		default:
		}

		if state.Spec.RestartMax > 0 && state.Restarts >= state.Spec.RestartMax {
			s.log.Error("daemon exceeded max restarts, giving up",
				"name", name, "restarts", state.Restarts)
			s.updateStatus(name, "failed")
			return
		}

		// Exponential backoff: 2^restarts seconds, capped at 60 s.
		if state.Restarts > 0 {
			backoff := time.Duration(math.Min(math.Pow(2, float64(state.Restarts)), 60)) * time.Second
			s.log.Info("daemon restarting with backoff",
				"name", name, "backoff", backoff, "restarts", state.Restarts)
			select {
			case <-ctx.Done():
				return
			case <-time.After(backoff):
			}
		}

		if err := s.startDaemon(ctx, state); err != nil {
			s.log.Error("daemon exited with error", "name", name, "error", err)
		} else {
			s.log.Info("daemon exited cleanly", "name", name)
		}

		s.mu.Lock()
		state.Restarts++
		s.mu.Unlock()
	}
}

// startDaemon launches the daemon process and blocks until it exits.
func (s *Supervisor) startDaemon(ctx context.Context, state *DaemonState) error {
	if len(state.Spec.Command) == 0 {
		return fmt.Errorf("empty command for daemon %s", state.Spec.Name)
	}

	// If the binary is not yet deployed, wait and retry rather than crashing.
	if _, err := exec.LookPath(state.Spec.Command[0]); err != nil {
		s.log.Warn("daemon binary not found, waiting for deployment",
			"name", state.Spec.Name, "binary", state.Spec.Command[0])
		s.updateStatus(state.Spec.Name, "unavailable")
		select {
		case <-ctx.Done():
		case <-time.After(30 * time.Second):
		}
		return nil
	}

	cmd := exec.CommandContext(ctx, state.Spec.Command[0], state.Spec.Command[1:]...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Start(); err != nil {
		return fmt.Errorf("start failed: %w", err)
	}

	s.mu.Lock()
	state.PID = cmd.Process.Pid
	state.Status = "running"
	state.LastStarted = time.Now()
	s.mu.Unlock()

	s.log.Info("daemon started", "name", state.Spec.Name, "pid", cmd.Process.Pid)

	if state.Spec.HealthURL != "" {
		go s.healthLoop(ctx, state)
	}

	return cmd.Wait()
}

// healthLoop polls the daemon's HTTP health endpoint on a fixed interval.
func (s *Supervisor) healthLoop(ctx context.Context, state *DaemonState) {
	ticker := time.NewTicker(10 * time.Second)
	defer ticker.Stop()

	client := &http.Client{Timeout: 5 * time.Second}

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			resp, err := client.Get(state.Spec.HealthURL) //nolint:noctx
			if err != nil {
				s.log.Warn("daemon health check failed",
					"name", state.Spec.Name, "error", err)
				continue
			}
			resp.Body.Close()
			if resp.StatusCode == http.StatusOK {
				s.mu.Lock()
				state.LastHealthy = time.Now()
				s.mu.Unlock()
			}
		}
	}
}

func (s *Supervisor) updateStatus(name, status string) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if d, ok := s.daemons[name]; ok {
		d.Status = status
	}
}

// States returns a point-in-time snapshot of all daemon states.
func (s *Supervisor) States() []DaemonState {
	s.mu.RLock()
	defer s.mu.RUnlock()
	out := make([]DaemonState, 0, len(s.daemons))
	for _, d := range s.daemons {
		out = append(out, *d)
	}
	return out
}

// Shutdown signals the supervisor that no further operations should proceed.
func (s *Supervisor) Shutdown() {
	close(s.done)
}
