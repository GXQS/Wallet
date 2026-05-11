package address_test

import (
	"testing"

	"github.com/gxqs/wallet/runtime/protocol/go-rpc-bridge/internal/address"
)

// A deterministic compressed secp256k1 public key used in tests.
var testPubKey = []byte{
	0x02, 0x79, 0xBE, 0x66, 0x7E, 0xF9, 0xDC, 0xBB, 0xAC,
	0x55, 0xA0, 0x62, 0x95, 0xCE, 0x87, 0x0B, 0x07, 0x02,
	0x9B, 0xFC, 0xDB, 0x2D, 0xCE, 0x28, 0xD9, 0x59, 0xF2,
	0x81, 0x5B, 0x16, 0xF8, 0x17, 0x98,
}

func TestFromPublicKey(t *testing.T) {
	addr, err := address.FromPublicKey(testPubKey)
	if err != nil {
		t.Fatalf("FromPublicKey: unexpected error: %v", err)
	}
	if len(addr) != address.AddressLength {
		t.Fatalf("expected address length %d, got %d", address.AddressLength, len(addr))
	}
}

func TestAddressString(t *testing.T) {
	addr, err := address.FromPublicKey(testPubKey)
	if err != nil {
		t.Fatalf("FromPublicKey: %v", err)
	}
	s := addr.String()
	if err := address.Validate(s); err != nil {
		t.Fatalf("Validate(%q): %v", s, err)
	}
}

func TestValidateInvalid(t *testing.T) {
	cases := []string{
		"",
		"invalid",
		"gxqs1short",
		"gxqs1" + string(make([]byte, 40)), // wrong encoding
	}
	for _, c := range cases {
		if err := address.Validate(c); err == nil {
			t.Errorf("Validate(%q): expected error, got nil", c)
		}
	}
}

func TestInvalidPublicKeyLength(t *testing.T) {
	_, err := address.FromPublicKey([]byte{0x01, 0x02})
	if err == nil {
		t.Fatal("expected error for short public key, got nil")
	}
}
