// Package healthcheck registers standard /healthz and /readyz endpoints.
package healthcheck

import (
	"encoding/json"
	"net/http"
	"time"
)

type healthResponse struct {
	Status    string `json:"status"`
	Timestamp string `json:"timestamp"`
}

// RegisterHandlers mounts /healthz and /readyz onto mux.
func RegisterHandlers(mux *http.ServeMux) {
	mux.HandleFunc("GET /healthz", liveness)
	mux.HandleFunc("GET /readyz", readiness)
}

func liveness(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(healthResponse{ //nolint:errcheck
		Status:    "alive",
		Timestamp: time.Now().UTC().Format(time.RFC3339),
	})
}

func readiness(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(healthResponse{ //nolint:errcheck
		Status:    "ready",
		Timestamp: time.Now().UTC().Format(time.RFC3339),
	})
}
