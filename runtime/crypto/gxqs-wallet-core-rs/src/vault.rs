//! Encrypted vault for secure key storage.
//!
//! The vault provides AES-256-GCM envelope encryption for private key material.
//! Keys are zeroized from memory when the [`SecretKey`] is dropped.
//!
//! # Security model
//! - Private keys MUST NOT be passed to UI processes.
//! - All vault operations MUST happen in an isolated process boundary.
//! - The `SecretKey` type zeroizes its backing memory on `Drop`.

use aes_gcm::{
    aead::{Aead, KeyInit},
    Aes256Gcm, Key, Nonce,
};
use base64::{engine::general_purpose::STANDARD as BASE64, Engine as _};
use rand::RngCore;
use serde::{Deserialize, Serialize};
use zeroize::Zeroize;

/// Length of an AES-256 key in bytes.
const AES_KEY_LEN: usize = 32;
/// Length of an AES-GCM nonce in bytes.
const NONCE_LEN: usize = 12;

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

/// An encrypted vault entry containing ciphertext + nonce + GCM tag.
///
/// The ciphertext field contains the AEAD ciphertext with the 16-byte
/// authentication tag appended (as produced by `aes_gcm::Aes256Gcm::encrypt`).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VaultEntry {
    /// Base64-encoded 12-byte AES-GCM nonce.
    pub nonce: String,
    /// Base64-encoded AES-256-GCM ciphertext (includes 16-byte auth tag).
    pub ciphertext: String,
    /// Vault format version (2 = AES-256-GCM via RustCrypto `aes-gcm`).
    pub version: u8,
}

/// Encrypts `plaintext` with a freshly-generated nonce using AES-256-GCM.
///
/// Each call generates a unique random 96-bit nonce. The authentication tag
/// produced by AES-GCM is appended to the ciphertext and verified during
/// [`decrypt`], providing integrity and authenticity guarantees.
pub fn encrypt(key: &SecretKey, plaintext: &[u8]) -> Result<VaultEntry, VaultError> {
    let mut nonce_bytes = [0u8; NONCE_LEN];
    rand::thread_rng().fill_bytes(&mut nonce_bytes);

    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(key.as_bytes()));
    let nonce = Nonce::from_slice(&nonce_bytes);

    let ciphertext = cipher
        .encrypt(nonce, plaintext)
        .map_err(|_| VaultError::EncryptionFailed)?;

    Ok(VaultEntry {
        nonce: BASE64.encode(nonce_bytes),
        ciphertext: BASE64.encode(&ciphertext),
        version: 2,
    })
}

/// Decrypts a [`VaultEntry`] using the provided key.
///
/// Verifies the AES-GCM authentication tag before returning plaintext.
/// Returns [`VaultError::DecryptionFailed`] if the tag is invalid (tampered
/// ciphertext, wrong key, or corrupted nonce).
pub fn decrypt(key: &SecretKey, entry: &VaultEntry) -> Result<Vec<u8>, VaultError> {
    if entry.version != 2 {
        return Err(VaultError::UnsupportedVersion(entry.version));
    }

    let nonce_bytes = BASE64
        .decode(&entry.nonce)
        .map_err(|_| VaultError::DecodeError)?;
    if nonce_bytes.len() != NONCE_LEN {
        return Err(VaultError::DecodeError);
    }

    let ciphertext = BASE64
        .decode(&entry.ciphertext)
        .map_err(|_| VaultError::DecodeError)?;

    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(key.as_bytes()));
    let nonce = Nonce::from_slice(&nonce_bytes);

    cipher
        .decrypt(nonce, ciphertext.as_ref())
        .map_err(|_| VaultError::DecryptionFailed)
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
    #[error("encryption failed")]
    EncryptionFailed,
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
    fn test_decrypt_wrong_key_fails() {
        let key1 = SecretKey::generate();
        let key2 = SecretKey::generate();
        let entry = encrypt(&key1, b"secret").unwrap();
        // AES-GCM tag verification must reject a different key.
        assert!(
            matches!(decrypt(&key2, &entry), Err(VaultError::DecryptionFailed)),
            "decryption with wrong key must fail"
        );
    }

    #[test]
    fn test_decrypt_tampered_ciphertext_fails() {
        let key = SecretKey::generate();
        let mut entry = encrypt(&key, b"secret data").unwrap();
        // Flip a byte in the base64-encoded ciphertext.
        let mut ct = BASE64.decode(&entry.ciphertext).unwrap();
        ct[0] ^= 0xff;
        entry.ciphertext = BASE64.encode(&ct);
        assert!(
            matches!(decrypt(&key, &entry), Err(VaultError::DecryptionFailed)),
            "tampered ciphertext must fail authentication"
        );
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
