// Package txbuilder constructs GXQS transactions backed by Core protocol types.
package txbuilder

import (
	"encoding/json"
	"errors"
	"fmt"
	"time"

	coretypes "github.com/gxqs/core/types"
	"github.com/gxqs/wallet/runtime/protocol/go-rpc-bridge/internal/address"
)

// TxType classifies a GXQS transaction request shape.
type TxType string

const (
	TxTypeTransfer  TxType = "transfer"
	TxTypeStake     TxType = "stake"
	TxTypeUnstake   TxType = "unstake"
	TxTypeValidator TxType = "validator_register"
	TxTypeDeploy    TxType = "deploy"
)

// Transaction is the HTTP RPC transaction representation.
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

	core coretypes.Transaction `json:"-"`
}

// Builder provides a fluent API for constructing Core-backed transactions.
type Builder struct {
	tx  Transaction
	err error
}

// New creates a new Builder for the given transaction type.
func New(txType TxType) *Builder {
	if !isSupportedTxType(txType) {
		return &Builder{err: fmt.Errorf("unsupported transaction type: %q", txType)}
	}
	now := time.Now().UTC()
	return &Builder{tx: Transaction{
		Version:   1,
		Type:      txType,
		Timestamp: now,
		core: coretypes.Transaction{
			ChainID:   1,
			Timestamp: now.UnixMilli(),
			GasLimit:  gasLimitForType(txType),
		},
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

// Amount sets the transfer amount in the smallest denomination.
func (b *Builder) Amount(a uint64) *Builder {
	b.tx.Amount = a
	b.tx.core.Value = a
	return b
}

// Fee sets the transaction gas price.
func (b *Builder) Fee(f uint64) *Builder {
	b.tx.Fee = f
	b.tx.core.GasPrice = f
	return b
}

// Nonce sets the sender nonce.
func (b *Builder) Nonce(n uint64) *Builder {
	b.tx.Nonce = n
	b.tx.core.Nonce = n
	return b
}

// Data attaches arbitrary payload data (e.g. contract call data).
func (b *Builder) Data(d []byte) *Builder {
	b.tx.Data = d
	b.tx.core.Data = d
	return b
}

// Build finalises the transaction and returns the HTTP transaction DTO.
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

	fromAddr, err := address.Parse(b.tx.From)
	if err != nil {
		return nil, fmt.Errorf("invalid from address: %w", err)
	}
	toAddr, err := address.Parse(b.tx.To)
	if err != nil {
		return nil, fmt.Errorf("invalid to address: %w", err)
	}

	b.tx.core.From = coretypes.AddressFromBytes(fromAddr[:])
	b.tx.core.To = coretypes.AddressFromBytes(toAddr[:])
	b.tx.Hash = b.tx.core.ID().Hex()
	tx := b.tx
	return &tx, nil
}

// Bytes serialises the transaction to canonical JSON.
func (tx *Transaction) Bytes() ([]byte, error) {
	return json.Marshal(tx)
}

// ID returns the underlying Core transaction identifier.
func (tx *Transaction) ID() coretypes.TxID {
	return tx.core.ID()
}

// SigningPayload returns the underlying Core signing payload.
func (tx *Transaction) SigningPayload() []byte {
	if tx == nil {
		return nil
	}
	payload := tx.core.SigningPayload()
	out := make([]byte, len(payload))
	copy(out, payload)
	return out
}

func isSupportedTxType(txType TxType) bool {
	switch txType {
	case TxTypeTransfer, TxTypeStake, TxTypeUnstake, TxTypeValidator, TxTypeDeploy:
		return true
	default:
		return false
	}
}

func gasLimitForType(txType TxType) uint64 {
	switch txType {
	case TxTypeDeploy:
		return 2_000_000
	case TxTypeStake, TxTypeUnstake, TxTypeValidator:
		return 120_000
	default:
		return 21_000
	}
}
