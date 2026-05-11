package txbuilder_test

import (
	"testing"

	"github.com/gxqs/wallet/runtime/protocol/go-rpc-bridge/internal/txbuilder"
)

const (
	testFrom = "gxqs1aabbccddeeff00112233445566778899aabb"
	testTo   = "gxqs1112233445566778899aabbccddeeff001122"
)

func TestBuildTransfer(t *testing.T) {
	tx, err := txbuilder.New(txbuilder.TxTypeTransfer).
		From(testFrom).
		To(testTo).
		Amount(1_000_000).
		Fee(500).
		Nonce(1).
		Build()
	if err != nil {
		t.Fatalf("Build: %v", err)
	}
	if tx.Hash == "" {
		t.Fatal("expected non-empty hash")
	}
	if tx.Type != txbuilder.TxTypeTransfer {
		t.Fatalf("expected type %q, got %q", txbuilder.TxTypeTransfer, tx.Type)
	}
}

func TestBuildMissingFrom(t *testing.T) {
	_, err := txbuilder.New(txbuilder.TxTypeTransfer).
		To(testTo).
		Amount(100).
		Fee(1).
		Nonce(0).
		Build()
	if err == nil {
		t.Fatal("expected error for missing from address")
	}
}

func TestBuildMissingTo(t *testing.T) {
	_, err := txbuilder.New(txbuilder.TxTypeTransfer).
		From(testFrom).
		Amount(100).
		Fee(1).
		Nonce(0).
		Build()
	if err == nil {
		t.Fatal("expected error for missing to address")
	}
}

func TestTxBytes(t *testing.T) {
	tx, err := txbuilder.New(txbuilder.TxTypeStake).
		From(testFrom).
		To(testTo).
		Amount(50_000_000).
		Fee(1000).
		Nonce(2).
		Build()
	if err != nil {
		t.Fatalf("Build: %v", err)
	}
	b, err := tx.Bytes()
	if err != nil {
		t.Fatalf("Bytes: %v", err)
	}
	if len(b) == 0 {
		t.Fatal("expected non-empty serialised transaction")
	}
}
