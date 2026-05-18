// Package txbuilder constructs GXQS transactions backed by Core protocol types.
package txbuilder

import (
	"errors"
	"time"

	coretypes "github.com/gxqs/core/types"
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

// Transaction is the canonical Core transaction type.
type Transaction = coretypes.Transaction

// Builder provides a fluent API for constructing Core-backed transactions.
type Builder struct {
	tx   coretypes.Transaction
	from string
	to   string
	err  error
}

// New creates a new Builder for the given transaction type.
func New(txType TxType) *Builder {
	_ = txType
	return &Builder{tx: coretypes.Transaction{
		ChainID:   1,
		Timestamp: time.Now().UnixMilli(),
		GasLimit:  21_000,
	}}
}

// From sets the sender address.
func (b *Builder) From(addr string) *Builder {
	if addr == "" {
		b.err = errors.New("from address must not be empty")
	}
	b.from = addr
	return b
}

// To sets the recipient address.
func (b *Builder) To(addr string) *Builder {
	if addr == "" {
		b.err = errors.New("to address must not be empty")
	}
	b.to = addr
	return b
}

// Amount sets the transfer amount in the smallest denomination.
func (b *Builder) Amount(a uint64) *Builder {
	b.tx.Value = a
	return b
}

// Fee sets the transaction gas price.
func (b *Builder) Fee(f uint64) *Builder {
	b.tx.GasPrice = f
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

// Build finalises the transaction and returns a Core transaction.
func (b *Builder) Build() (*Transaction, error) {
	if b.err != nil {
		return nil, b.err
	}
	if b.from == "" {
		return nil, errors.New("from address is required")
	}
	if b.to == "" {
		return nil, errors.New("to address is required")
	}

	b.tx.From = coretypes.DeriveAddress([]byte(b.from))
	b.tx.To = coretypes.DeriveAddress([]byte(b.to))

	tx := b.tx
	return &tx, nil
}
