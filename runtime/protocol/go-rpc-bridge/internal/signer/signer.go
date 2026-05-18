// Package signer wraps Core's hybrid signer for transaction signing.
package signer

import (
	"errors"
	"fmt"

	"github.com/gxqs/core/crypto/hybrid"
)

// Signature is a hybrid signature blob.
type Signature = []byte

// KeyPair is a Core hybrid signer keypair wrapper.
type KeyPair = hybrid.Signer

// ErrInvalidKey is returned when key material is malformed.
var ErrInvalidKey = errors.New("invalid key material")

// ErrEmptyPayload is returned when the signing payload is empty.
var ErrEmptyPayload = errors.New("payload must not be empty")

// GenerateKeyPair produces a new Core hybrid key pair.
func GenerateKeyPair() (*KeyPair, error) {
	key, err := hybrid.GenerateSigner(nil)
	if err != nil {
		return nil, fmt.Errorf("key generation failed: %w", err)
	}
	return key, nil
}

// Sign signs payload using Core's hybrid signer.
func Sign(privateKey *KeyPair, payload []byte) (Signature, error) {
	if privateKey == nil {
		return nil, ErrInvalidKey
	}
	if len(payload) == 0 {
		return nil, ErrEmptyPayload
	}
	sig, err := privateKey.Sign(payload)
	if err != nil {
		return nil, fmt.Errorf("hybrid sign: %w", err)
	}
	return sig, nil
}

// Verify checks that sig is a valid signature of payload under pubKey.
func Verify(pubKey []byte, payload []byte, sig Signature) bool {
	if len(pubKey) == 0 || len(sig) == 0 {
		return false
	}
	return (hybrid.Verifier{}).Verify(pubKey, payload, sig)
}

// PublicKeyBytes encodes a keypair's public key.
func PublicKeyBytes(key *KeyPair) ([]byte, error) {
	if key == nil {
		return nil, ErrInvalidKey
	}
	pub := key.PublicKey()
	if len(pub) == 0 {
		return nil, ErrInvalidKey
	}
	out := make([]byte, len(pub))
	copy(out, pub)
	return out, nil
}
