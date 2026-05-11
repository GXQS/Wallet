// Package api registers and serves all JSON-RPC handlers for walletd.
package api

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"github.com/gxqs/wallet/runtime/protocol/go-rpc-bridge/internal/address"
	"github.com/gxqs/wallet/runtime/protocol/go-rpc-bridge/internal/txbuilder"
)

// RegisterHandlers mounts all RPC routes onto mux.
func RegisterHandlers(mux *http.ServeMux, logger *slog.Logger) {
	h := &handler{log: logger}
	mux.HandleFunc("POST /rpc/v1/address/generate", h.generateAddress)
	mux.HandleFunc("POST /rpc/v1/address/validate", h.validateAddress)
	mux.HandleFunc("POST /rpc/v1/tx/build", h.buildTransaction)
	mux.HandleFunc("GET /rpc/v1/version", h.version)
}

type handler struct {
	log *slog.Logger
}

// Response is the canonical JSON-RPC response envelope.
type Response[T any] struct {
	OK        bool   `json:"ok"`
	Data      T      `json:"data,omitempty"`
	Error     string `json:"error,omitempty"`
	Timestamp string `json:"timestamp"`
}

func writeJSON[T any](w http.ResponseWriter, code int, data T, errMsg string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	resp := Response[T]{
		OK:        errMsg == "",
		Data:      data,
		Error:     errMsg,
		Timestamp: time.Now().UTC().Format(time.RFC3339),
	}
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		// At this point headers are already sent; just log.
		slog.Error("response encode failed", "error", err)
	}
}

// --- /rpc/v1/address/generate ---

type generateAddressReq struct {
	PublicKey []byte `json:"public_key"`
}

type generateAddressResp struct {
	Address string `json:"address"`
	Hex     string `json:"hex"`
}

func (h *handler) generateAddress(w http.ResponseWriter, r *http.Request) {
	var req generateAddressReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, generateAddressResp{}, "invalid request body: "+err.Error())
		return
	}
	addr, err := address.FromPublicKey(req.PublicKey)
	if err != nil {
		writeJSON(w, http.StatusUnprocessableEntity, generateAddressResp{}, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, generateAddressResp{
		Address: addr.String(),
		Hex:     addr.Hex(),
	}, "")
}

// --- /rpc/v1/address/validate ---

type validateAddressReq struct {
	Address string `json:"address"`
}

type validateAddressResp struct {
	Valid bool `json:"valid"`
}

func (h *handler) validateAddress(w http.ResponseWriter, r *http.Request) {
	var req validateAddressReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, validateAddressResp{}, "invalid request body: "+err.Error())
		return
	}
	err := address.Validate(req.Address)
	writeJSON(w, http.StatusOK, validateAddressResp{Valid: err == nil}, "")
}

// --- /rpc/v1/tx/build ---

type buildTxReq struct {
	Type   txbuilder.TxType `json:"type"`
	From   string           `json:"from"`
	To     string           `json:"to"`
	Amount uint64           `json:"amount"`
	Fee    uint64           `json:"fee"`
	Nonce  uint64           `json:"nonce"`
}

func (h *handler) buildTransaction(w http.ResponseWriter, r *http.Request) {
	var req buildTxReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, (*txbuilder.Transaction)(nil), "invalid request body: "+err.Error())
		return
	}

	tx, err := txbuilder.New(req.Type).
		From(req.From).
		To(req.To).
		Amount(req.Amount).
		Fee(req.Fee).
		Nonce(req.Nonce).
		Build()
	if err != nil {
		writeJSON(w, http.StatusUnprocessableEntity, (*txbuilder.Transaction)(nil), err.Error())
		return
	}
	writeJSON(w, http.StatusOK, tx, "")
}

// --- /rpc/v1/version ---

type versionResp struct {
	Version string `json:"version"`
	Runtime string `json:"runtime"`
}

func (h *handler) version(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, versionResp{
		Version: "0.1.0",
		Runtime: fmt.Sprintf("walletd/%s", "0.1.0"),
	}, "")
}
