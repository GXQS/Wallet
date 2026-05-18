package txbuilder_test

import (
	"encoding/json"
	"testing"

	"github.com/gxqs/wallet/runtime/protocol/go-rpc-bridge/internal/txbuilder"
)

const (
	testFrom = "gxqs1aabbccddeeff00112233445566778899aabbccdd"
	testTo   = "gxqs1112233445566778899aabbccddeeff0011223344"
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
	if tx.Amount != 1_000_000 {
		t.Fatalf("expected amount 1000000, got %d", tx.Amount)
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

func TestUnsupportedType(t *testing.T) {
	_, err := txbuilder.New("unknown").
		From(testFrom).
		To(testTo).
		Amount(1).
		Fee(1).
		Nonce(1).
		Build()
	if err == nil {
		t.Fatal("expected error for unsupported transaction type")
	}
}

func TestInvalidAddress(t *testing.T) {
	_, err := txbuilder.New(txbuilder.TxTypeTransfer).
		From("not-an-address").
		To(testTo).
		Amount(1).
		Fee(1).
		Nonce(1).
		Build()
	if err == nil {
		t.Fatal("expected error for invalid from address")
	}
}

func TestTypeAffectsBuiltCoreTransaction(t *testing.T) {
	transferTx, err := txbuilder.New(txbuilder.TxTypeTransfer).
		From(testFrom).
		To(testTo).
		Amount(42).
		Fee(1).
		Nonce(7).
		Build()
	if err != nil {
		t.Fatalf("build transfer: %v", err)
	}
	deployTx, err := txbuilder.New(txbuilder.TxTypeDeploy).
		From(testFrom).
		To(testTo).
		Amount(42).
		Fee(1).
		Nonce(7).
		Build()
	if err != nil {
		t.Fatalf("build deploy: %v", err)
	}
	if transferTx.ID() == deployTx.ID() {
		t.Fatal("expected tx type to affect resulting core transaction")
	}
}

func TestJSONContractCompatibility(t *testing.T) {
	tx, err := txbuilder.New(txbuilder.TxTypeTransfer).
		From(testFrom).
		To(testTo).
		Amount(123).
		Fee(4).
		Nonce(9).
		Build()
	if err != nil {
		t.Fatalf("Build: %v", err)
	}
	raw, err := json.Marshal(tx)
	if err != nil {
		t.Fatalf("Marshal: %v", err)
	}
	var out map[string]any
	if err := json.Unmarshal(raw, &out); err != nil {
		t.Fatalf("Unmarshal: %v", err)
	}
	if out["type"] != string(txbuilder.TxTypeTransfer) {
		t.Fatalf("expected type=%q, got %#v", txbuilder.TxTypeTransfer, out["type"])
	}
	if out["from"] != testFrom {
		t.Fatalf("expected from=%q, got %#v", testFrom, out["from"])
	}
	if out["to"] != testTo {
		t.Fatalf("expected to=%q, got %#v", testTo, out["to"])
	}
}
