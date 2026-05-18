package signer_test

import (
	"bytes"
	"testing"

	"github.com/gxqs/wallet/runtime/protocol/go-rpc-bridge/internal/signer"
)

func TestSignAndVerify(t *testing.T) {
	key, err := signer.GenerateKeyPair()
	if err != nil {
		t.Fatalf("GenerateKeyPair: %v", err)
	}

	payload := []byte("gxqs test transaction payload v1")
	sig, err := signer.Sign(key, payload)
	if err != nil {
		t.Fatalf("Sign: %v", err)
	}
	pub, err := signer.PublicKeyBytes(key)
	if err != nil {
		t.Fatalf("PublicKeyBytes: %v", err)
	}
	if !signer.Verify(pub, payload, sig) {
		t.Fatal("Verify returned false for valid signature")
	}
}

func TestVerifyWrongPayload(t *testing.T) {
	key, _ := signer.GenerateKeyPair()
	sig, _ := signer.Sign(key, []byte("original"))
	pub, _ := signer.PublicKeyBytes(key)
	if signer.Verify(pub, []byte("tampered"), sig) {
		t.Fatal("Verify returned true for tampered payload")
	}
}

func TestSignEmptyPayload(t *testing.T) {
	key, _ := signer.GenerateKeyPair()
	_, err := signer.Sign(key, []byte{})
	if err == nil {
		t.Fatal("expected error for empty payload")
	}
}

func TestSignNilKey(t *testing.T) {
	_, err := signer.Sign(nil, []byte("payload"))
	if err == nil {
		t.Fatal("expected error for nil key")
	}
}

func TestPublicKeyBytes(t *testing.T) {
	key, _ := signer.GenerateKeyPair()
	b, err := signer.PublicKeyBytes(key)
	if err != nil {
		t.Fatalf("PublicKeyBytes: %v", err)
	}
	if len(b) == 0 {
		t.Fatal("expected non-empty public key bytes")
	}
	// Key is idempotent: same bytes on repeated calls.
	b2, _ := signer.PublicKeyBytes(key)
	if !bytes.Equal(b, b2) {
		t.Fatal("PublicKeyBytes not deterministic")
	}
}
