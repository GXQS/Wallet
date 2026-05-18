// Package address implements GXQS address generation and validation.
// Addresses follow the format: gxqs1<bech32-encoded-pubkey-hash>
package address

import (
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"strings"

	"golang.org/x/crypto/ripemd160" //nolint:staticcheck // GXQS protocol requires RIPEMD-160 for address derivation
)

const (
	// MainnetPrefix is the bech32 HRP for mainnet addresses.
	MainnetPrefix = "gxqs"
	// TestnetPrefix is the bech32 HRP for testnet addresses.
	TestnetPrefix = "tgxqs"
	// AddressLength is the byte-length of a raw GXQS address (RIPEMD-160 output).
	AddressLength = 20
)

// ErrInvalidAddress is returned when an address fails validation.
var ErrInvalidAddress = errors.New("invalid GXQS address")

// Address represents a raw GXQS 20-byte address.
type Address [AddressLength]byte

// FromPublicKey derives a GXQS address from a compressed secp256k1 public key.
// Derivation: SHA-256 → RIPEMD-160 (identical to Bitcoin/Cosmos SDK pattern).
func FromPublicKey(pubKey []byte) (Address, error) {
	if len(pubKey) != 33 && len(pubKey) != 65 {
		return Address{}, fmt.Errorf("invalid public key length %d: must be 33 (compressed) or 65 (uncompressed)", len(pubKey))
	}

	// SHA-256 pass.
	sha := sha256.Sum256(pubKey)

	// RIPEMD-160 pass.
	h := ripemd160.New()
	if _, err := h.Write(sha[:]); err != nil {
		return Address{}, fmt.Errorf("ripemd160 write: %w", err)
	}
	var addr Address
	copy(addr[:], h.Sum(nil))
	return addr, nil
}

// Hex returns the address as a 0x-prefixed hex string.
func (a Address) Hex() string {
	return "0x" + hex.EncodeToString(a[:])
}

// String returns the address formatted with the mainnet prefix.
func (a Address) String() string {
	return a.Format(MainnetPrefix)
}

// Format returns the address formatted with the given bech32 HRP.
// This is a simplified representation; a full bech32 encoder should be
// used in production (e.g., cosmos/cosmos-sdk/types/bech32).
func (a Address) Format(hrp string) string {
	return fmt.Sprintf("%s1%s", hrp, hex.EncodeToString(a[:]))
}

// Validate checks that a string is a well-formed GXQS address.
func Validate(s string) error {
	_, err := Parse(s)
	return err
}

// Parse validates and decodes a GXQS address string into raw bytes.
func Parse(s string) (Address, error) {
	if s == "" {
		return Address{}, ErrInvalidAddress
	}
	for _, prefix := range []string{MainnetPrefix + "1", TestnetPrefix + "1"} {
		if strings.HasPrefix(s, prefix) {
			rest := s[len(prefix):]
			if len(rest) != AddressLength*2 {
				return Address{}, fmt.Errorf("%w: incorrect length", ErrInvalidAddress)
			}
			raw, err := hex.DecodeString(rest)
			if err != nil {
				return Address{}, fmt.Errorf("%w: invalid hex encoding", ErrInvalidAddress)
			}
			var out Address
			copy(out[:], raw)
			return out, nil
		}
	}
	return Address{}, fmt.Errorf("%w: unrecognised prefix", ErrInvalidAddress)
}
