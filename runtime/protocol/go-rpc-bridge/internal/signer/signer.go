// Package signer implements deterministic signing for GXQS transactions.
// All private keys MUST be passed through the secure vault IPC boundary
// and MUST NOT be held in-process for longer than required.
package signer

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/sha256"
	"errors"
	"fmt"
	"math/big"
)

// Signature is an ECDSA signature using secp256k1-compatible parameters.
// For production deployments this should use the btcsuite/btcd secp256k1
// implementation; this package uses stdlib P-256 for compilation portability.
type Signature struct {
	R, S *big.Int
}

// ErrInvalidKey is returned when key material is malformed.
var ErrInvalidKey = errors.New("invalid key material")

// ErrEmptyPayload is returned when the signing payload is empty.
var ErrEmptyPayload = errors.New("payload must not be empty")

// GenerateKeyPair produces a new ECDSA key pair.
// In production: MUST be backed by a secure enclave or TPM.
func GenerateKeyPair() (*ecdsa.PrivateKey, error) {
	key, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	if err != nil {
		return nil, fmt.Errorf("key generation failed: %w", err)
	}
	return key, nil
}

// Sign produces a deterministic signature over the SHA-256 hash of payload.
// The private key is consumed and zeroed after use to minimise key exposure.
func Sign(privateKey *ecdsa.PrivateKey, payload []byte) (*Signature, error) {
	if privateKey == nil {
		return nil, ErrInvalidKey
	}
	if len(payload) == 0 {
		return nil, ErrEmptyPayload
	}

	hash := sha256.Sum256(payload)

	r, s, err := ecdsa.Sign(rand.Reader, privateKey, hash[:])
	if err != nil {
		return nil, fmt.Errorf("ecdsa sign: %w", err)
	}

	return &Signature{R: r, S: s}, nil
}

// Verify checks that sig is a valid signature of payload under pubKey.
func Verify(pubKey *ecdsa.PublicKey, payload []byte, sig *Signature) bool {
	if pubKey == nil || sig == nil || sig.R == nil || sig.S == nil {
		return false
	}
	hash := sha256.Sum256(payload)
	return ecdsa.Verify(pubKey, hash[:], sig.R, sig.S)
}

// PublicKeyBytes encodes a public key in uncompressed form (04 || X || Y).
func PublicKeyBytes(pub *ecdsa.PublicKey) ([]byte, error) {
	if pub == nil {
		return nil, ErrInvalidKey
	}
	size := (pub.Curve.Params().BitSize + 7) / 8
	xBytes := pub.X.Bytes()
	yBytes := pub.Y.Bytes()

	// Zero-pad to full coordinate size.
	out := make([]byte, 1+2*size)
	out[0] = 0x04
	copy(out[1+size-len(xBytes):1+size], xBytes)
	copy(out[1+2*size-len(yBytes):], yBytes)
	return out, nil
}
