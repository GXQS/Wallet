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
	if tx.ID().Hex() == "" {
		t.Fatal("expected non-empty tx id")
	}
	if tx.Value != 1_000_000 {
		t.Fatalf("expected value 1000000, got %d", tx.Value)
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

func TestSigningPayload(t *testing.T) {
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
	b := tx.SigningPayload()
	if len(b) == 0 {
		t.Fatal("expected non-empty signing payload")
	}
}
