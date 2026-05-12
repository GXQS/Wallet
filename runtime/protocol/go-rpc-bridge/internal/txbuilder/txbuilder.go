// Package txbuilder constructs and serialises GXQS transactions.
// Transaction construction MUST originate from GXQS/core-compatible protocol
// primitives; this package acts as the canonical bridge implementation.
package txbuilder

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"time"
)

// TxType classifies a GXQS transaction.
type TxType string

const (
	TxTypeTransfer  TxType = "transfer"
	TxTypeStake     TxType = "stake"
	TxTypeUnstake   TxType = "unstake"
	TxTypeValidator TxType = "validator_register"
	TxTypeDeploy    TxType = "deploy"
)

// Transaction represents a fully-formed GXQS protocol transaction.
type Transaction struct {
	Version   uint32    `json:"version"`
	Type      TxType    `json:"type"`
	From      string    `json:"from"`
	To        string    `json:"to"`
	Amount    uint64    `json:"amount"`
	Fee       uint64    `json:"fee"`
	Nonce     uint64    `json:"nonce"`
	Data      []byte    `json:"data,omitempty"`
	Timestamp time.Time `json:"timestamp"`
	Signature string    `json:"signature,omitempty"`
	Hash      string    `json:"hash,omitempty"`
}

// Builder provides a fluent API for constructing GXQS transactions.
type Builder struct {
	tx  Transaction
	err error
}

// New creates a new Builder for the given transaction type.
func New(txType TxType) *Builder {
	return &Builder{tx: Transaction{
		Version:   1,
		Type:      txType,
		Timestamp: time.Now().UTC(),
	}}
}

// From sets the sender address.
func (b *Builder) From(addr string) *Builder {
	if addr == "" {
		b.err = errors.New("from address must not be empty")
	}
	b.tx.From = addr
	return b
}

// To sets the recipient address.
func (b *Builder) To(addr string) *Builder {
	if addr == "" {
		b.err = errors.New("to address must not be empty")
	}
	b.tx.To = addr
	return b
}

// Amount sets the transfer amount in the smallest denomination (aGXQS).
func (b *Builder) Amount(a uint64) *Builder {
	b.tx.Amount = a
	return b
}

// Fee sets the transaction fee.
func (b *Builder) Fee(f uint64) *Builder {
	b.tx.Fee = f
	return b
}

// Nonce sets the sender nonce.
func (b *Builder) Nonce(n uint64) *Builder {
	b.tx.Nonce = n
	return b
}

// Data attaches arbitrary payload data (e.g. contract call data).
func (b *Builder) Data(d []byte) *Builder {
	b.tx.Data = d
	return b
}

// Build finalises the transaction, computes its hash, and returns it.
func (b *Builder) Build() (*Transaction, error) {
	if b.err != nil {
		return nil, b.err
	}
	if b.tx.From == "" {
		return nil, errors.New("from address is required")
	}
	if b.tx.To == "" {
		return nil, errors.New("to address is required")
	}

	raw, err := json.Marshal(struct {
		Version   uint32 `json:"version"`
		Type      TxType `json:"type"`
		From      string `json:"from"`
		To        string `json:"to"`
		Amount    uint64 `json:"amount"`
		Fee       uint64 `json:"fee"`
		Nonce     uint64 `json:"nonce"`
		Timestamp string `json:"timestamp"`
	}{
		Version:   b.tx.Version,
		Type:      b.tx.Type,
		From:      b.tx.From,
		To:        b.tx.To,
		Amount:    b.tx.Amount,
		Fee:       b.tx.Fee,
		Nonce:     b.tx.Nonce,
		Timestamp: b.tx.Timestamp.Format(time.RFC3339Nano),
	})
	if err != nil {
		return nil, fmt.Errorf("marshal tx: %w", err)
	}

	h := sha256.Sum256(raw)
	b.tx.Hash = hex.EncodeToString(h[:])

	tx := b.tx
	return &tx, nil
}

// Bytes serialises the transaction to canonical JSON.
func (tx *Transaction) Bytes() ([]byte, error) {
	return json.Marshal(tx)
}
