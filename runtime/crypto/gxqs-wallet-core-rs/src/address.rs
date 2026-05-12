//! GXQS address derivation.
//!
//! Derives addresses using SHA-256 followed by RIPEMD-160, matching the
//! derivation chain used by Bitcoin and Cosmos SDK, ensuring future protocol
//! compatibility with GXQS/core.

use ripemd::Ripemd160;
use sha2::{Digest, Sha256};

/// Byte length of a raw GXQS address (RIPEMD-160 output).
pub const ADDRESS_LENGTH: usize = 20;

/// A raw 20-byte GXQS address.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct Address([u8; ADDRESS_LENGTH]);

impl Address {
    /// Derive an address from a raw public key (compressed or uncompressed).
    ///
    /// # Errors
    /// Returns an error if `pub_key` has an invalid length.
    pub fn from_public_key(pub_key: &[u8]) -> Result<Self, AddressError> {
        if pub_key.len() != 33 && pub_key.len() != 65 {
            return Err(AddressError::InvalidPublicKeyLength(pub_key.len()));
        }

        // SHA-256 pass
        let sha_digest = Sha256::digest(pub_key);

        // RIPEMD-160 pass
        let ripe_digest = Ripemd160::digest(sha_digest);

        let mut bytes = [0u8; ADDRESS_LENGTH];
        bytes.copy_from_slice(&ripe_digest);
        Ok(Address(bytes))
    }

    /// Returns the raw bytes of the address.
    pub fn as_bytes(&self) -> &[u8; ADDRESS_LENGTH] {
        &self.0
    }

    /// Returns the address as a hex string (no prefix).
    pub fn to_hex(&self) -> String {
        hex::encode(self.0)
    }

    /// Returns the address formatted with the GXQS mainnet prefix.
    pub fn to_gxqs_string(&self) -> String {
        format!("gxqs1{}", self.to_hex())
    }

    /// Returns the address formatted with the GXQS testnet prefix.
    pub fn to_testnet_string(&self) -> String {
        format!("tgxqs1{}", self.to_hex())
    }
}

/// Errors returned by address derivation.
#[derive(Debug, thiserror::Error)]
pub enum AddressError {
    #[error("invalid public key length {0}: must be 33 (compressed) or 65 (uncompressed)")]
    InvalidPublicKeyLength(usize),
}

#[cfg(test)]
mod tests {
    use super::*;

    /// The generator point of secp256k1 in compressed form (used as a stable test vector).
    const SECP256K1_G_COMPRESSED: [u8; 33] = [
        0x02, 0x79, 0xBE, 0x66, 0x7E, 0xF9, 0xDC, 0xBB, 0xAC, 0x55, 0xA0, 0x62, 0x95, 0xCE, 0x87,
        0x0B, 0x07, 0x02, 0x9B, 0xFC, 0xDB, 0x2D, 0xCE, 0x28, 0xD9, 0x59, 0xF2, 0x81, 0x5B, 0x16,
        0xF8, 0x17, 0x98,
    ];

    #[test]
    fn test_derive_address_from_compressed_key() {
        let addr = Address::from_public_key(&SECP256K1_G_COMPRESSED)
            .expect("should derive address from compressed key");
        assert_eq!(addr.as_bytes().len(), ADDRESS_LENGTH);
    }

    #[test]
    fn test_address_is_deterministic() {
        let a1 = Address::from_public_key(&SECP256K1_G_COMPRESSED).unwrap();
        let a2 = Address::from_public_key(&SECP256K1_G_COMPRESSED).unwrap();
        assert_eq!(a1, a2, "address derivation must be deterministic");
    }

    #[test]
    fn test_gxqs_string_prefix() {
        let addr = Address::from_public_key(&SECP256K1_G_COMPRESSED).unwrap();
        assert!(addr.to_gxqs_string().starts_with("gxqs1"));
    }

    #[test]
    fn test_testnet_string_prefix() {
        let addr = Address::from_public_key(&SECP256K1_G_COMPRESSED).unwrap();
        assert!(addr.to_testnet_string().starts_with("tgxqs1"));
    }

    #[test]
    fn test_invalid_key_length() {
        let result = Address::from_public_key(&[0x01, 0x02, 0x03]);
        assert!(result.is_err(), "should reject invalid key length");
    }

    #[test]
    fn test_hex_roundtrip() {
        let addr = Address::from_public_key(&SECP256K1_G_COMPRESSED).unwrap();
        let hex_str = addr.to_hex();
        assert_eq!(hex_str.len(), ADDRESS_LENGTH * 2);
        let decoded = hex::decode(&hex_str).unwrap();
        assert_eq!(decoded.as_slice(), addr.as_bytes());
    }
}
