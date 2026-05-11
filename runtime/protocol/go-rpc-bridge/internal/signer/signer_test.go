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
	if !signer.Verify(&key.PublicKey, payload, sig) {
		t.Fatal("Verify returned false for valid signature")
	}
}

func TestVerifyWrongPayload(t *testing.T) {
	key, _ := signer.GenerateKeyPair()
	sig, _ := signer.Sign(key, []byte("original"))
	if signer.Verify(&key.PublicKey, []byte("tampered"), sig) {
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
	b, err := signer.PublicKeyBytes(&key.PublicKey)
	if err != nil {
		t.Fatalf("PublicKeyBytes: %v", err)
	}
	if b[0] != 0x04 {
		t.Fatalf("expected uncompressed prefix 0x04, got 0x%02x", b[0])
	}
	// Key is idempotent: same bytes on repeated calls.
	b2, _ := signer.PublicKeyBytes(&key.PublicKey)
	if !bytes.Equal(b, b2) {
		t.Fatal("PublicKeyBytes not deterministic")
	}
}
