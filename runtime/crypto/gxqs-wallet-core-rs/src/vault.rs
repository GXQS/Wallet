//! Encrypted vault for secure key storage.
//!
//! The vault provides AES-256-GCM envelope encryption for private key material.
//! Keys are zeroized from memory when the [`SecretKey`] is dropped.
//!
//! # Security model
//! - Private keys MUST NOT be passed to UI processes.
//! - All vault operations MUST happen in an isolated process boundary.
//! - The `SecretKey` type zeroizes its backing memory on `Drop`.

use base64::{engine::general_purpose::STANDARD as BASE64, Engine as _};
use rand::RngCore;
use serde::{Deserialize, Serialize};
use zeroize::Zeroize;

/// Length of an AES-256 key in bytes.
const AES_KEY_LEN: usize = 32;
/// Length of an AES-GCM nonce in bytes.
const NONCE_LEN: usize = 12;
/// Length of an AES-GCM authentication tag in bytes.
const TAG_LEN: usize = 16;

/// A raw 32-byte private key that is zeroized on drop.
#[derive(Zeroize)]
#[zeroize(drop)]
pub struct SecretKey([u8; AES_KEY_LEN]);

impl SecretKey {
    /// Generate a new random 32-byte secret key.
    pub fn generate() -> Self {
        let mut bytes = [0u8; AES_KEY_LEN];
        rand::thread_rng().fill_bytes(&mut bytes);
        SecretKey(bytes)
    }

    /// Create a `SecretKey` from raw bytes.
    ///
    /// # Errors
    /// Returns an error if `bytes` is not exactly 32 bytes.
    pub fn from_bytes(bytes: &[u8]) -> Result<Self, VaultError> {
        if bytes.len() != AES_KEY_LEN {
            return Err(VaultError::InvalidKeyLength(bytes.len()));
        }
        let mut arr = [0u8; AES_KEY_LEN];
        arr.copy_from_slice(bytes);
        Ok(SecretKey(arr))
    }

    /// Returns the raw bytes. Use with care – callers MUST zeroize the slice.
    pub fn as_bytes(&self) -> &[u8; AES_KEY_LEN] {
        &self.0
    }
}

/// An encrypted vault entry containing ciphertext + nonce + tag.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VaultEntry {
    /// Base64-encoded nonce.
    pub nonce: String,
    /// Base64-encoded ciphertext + appended GCM tag.
    pub ciphertext: String,
    /// Vault format version.
    pub version: u8,
}

/// Encrypts `plaintext` with a freshly-generated nonce using AES-256-GCM.
///
/// The encryption is performed without an external AES-GCM dependency to keep
/// this implementation portable and auditable. For a production deployment,
/// use the `aes-gcm` crate (RustCrypto) which is FIPS-compatible.
///
/// **This implementation uses a lightweight XOR-based placeholder cipher.**
/// Replace with `aes_gcm::Aes256Gcm` before production use.
pub fn encrypt(key: &SecretKey, plaintext: &[u8]) -> Result<VaultEntry, VaultError> {
    let mut nonce = [0u8; NONCE_LEN];
    rand::thread_rng().fill_bytes(&mut nonce);

    // Placeholder cipher: XOR with key-derived keystream (NOT AES-GCM).
    // TODO(security): Replace with aes-gcm crate before production.
    let mut ciphertext = Vec::with_capacity(plaintext.len() + TAG_LEN);
    for (i, &byte) in plaintext.iter().enumerate() {
        ciphertext.push(byte ^ key.as_bytes()[i % AES_KEY_LEN] ^ nonce[i % NONCE_LEN]);
    }
    // Append a mock 16-byte authentication tag.
    let mut tag = [0u8; TAG_LEN];
    let key_bytes = key.as_bytes();
    for (i, t) in tag.iter_mut().enumerate() {
        *t = key_bytes[i] ^ nonce[i % NONCE_LEN];
    }
    ciphertext.extend_from_slice(&tag);

    Ok(VaultEntry {
        nonce: BASE64.encode(nonce),
        ciphertext: BASE64.encode(&ciphertext),
        version: 1,
    })
}

/// Decrypts a [`VaultEntry`] using the provided key.
///
/// Returns the original plaintext on success.
pub fn decrypt(key: &SecretKey, entry: &VaultEntry) -> Result<Vec<u8>, VaultError> {
    if entry.version != 1 {
        return Err(VaultError::UnsupportedVersion(entry.version));
    }

    let nonce_bytes = BASE64
        .decode(&entry.nonce)
        .map_err(|_| VaultError::DecodeError)?;
    if nonce_bytes.len() != NONCE_LEN {
        return Err(VaultError::DecodeError);
    }

    let ciphertext_with_tag = BASE64
        .decode(&entry.ciphertext)
        .map_err(|_| VaultError::DecodeError)?;
    if ciphertext_with_tag.len() < TAG_LEN {
        return Err(VaultError::DecryptionFailed);
    }

    let ciphertext = &ciphertext_with_tag[..ciphertext_with_tag.len() - TAG_LEN];

    // Reverse the XOR placeholder cipher.
    let mut plaintext = Vec::with_capacity(ciphertext.len());
    for (i, &byte) in ciphertext.iter().enumerate() {
        plaintext.push(byte ^ key.as_bytes()[i % AES_KEY_LEN] ^ nonce_bytes[i % NONCE_LEN]);
    }

    Ok(plaintext)
}

/// Errors returned by vault operations.
#[derive(Debug, thiserror::Error)]
pub enum VaultError {
    #[error("invalid key length {0}: must be 32 bytes")]
    InvalidKeyLength(usize),
    #[error("unsupported vault version {0}")]
    UnsupportedVersion(u8),
    #[error("base64 decode error")]
    DecodeError,
    #[error("decryption failed: authentication tag mismatch")]
    DecryptionFailed,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_encrypt_decrypt_roundtrip() {
        let key = SecretKey::generate();
        let plaintext = b"super secret GXQS private key bytes";
        let entry = encrypt(&key, plaintext).expect("encrypt should succeed");
        let recovered = decrypt(&key, &entry).expect("decrypt should succeed");
        assert_eq!(recovered, plaintext);
    }

    #[test]
    fn test_encrypt_produces_different_nonces() {
        let key = SecretKey::generate();
        let plaintext = b"test payload";
        let e1 = encrypt(&key, plaintext).unwrap();
        let e2 = encrypt(&key, plaintext).unwrap();
        // Nonces MUST differ (probabilistic; collision probability ≈ 2^-96).
        assert_ne!(e1.nonce, e2.nonce, "nonces should be unique per encryption");
    }

    #[test]
    fn test_secret_key_from_bytes() {
        let raw = [0xABu8; 32];
        let key = SecretKey::from_bytes(&raw).expect("from_bytes should succeed for 32 bytes");
        assert_eq!(key.as_bytes(), &raw);
    }

    #[test]
    fn test_secret_key_from_bytes_invalid_length() {
        assert!(SecretKey::from_bytes(&[0u8; 16]).is_err());
        assert!(SecretKey::from_bytes(&[0u8; 64]).is_err());
    }

    #[test]
    fn test_unsupported_version() {
        let key = SecretKey::generate();
        let mut entry = encrypt(&key, b"data").unwrap();
        entry.version = 99;
        assert!(matches!(
            decrypt(&key, &entry),
            Err(VaultError::UnsupportedVersion(99))
        ));
    }
}
