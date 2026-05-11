//! WASM bindings for GXQS cryptographic primitives.
//!
//! Exposes address derivation and vault operations to browser JavaScript
//! via `wasm-bindgen`.
//!
//! # Security model
//! These bindings are intended for test/development tooling and browser
//! orchestration helpers only. Private vault keys MUST NOT be persisted
//! in JavaScript; all production key material lives exclusively in the
//! `walletd` process.

use crate::address::Address;
use crate::vault::{self, SecretKey};
use wasm_bindgen::prelude::*;

/// Derive a GXQS mainnet address from a compressed or uncompressed public key.
///
/// `pub_key_hex` must be a 33-byte (compressed) or 65-byte (uncompressed) public
/// key encoded as a lowercase hex string (e.g. `"02abcd…"`).
///
/// Returns the `gxqs1…` mainnet address on success, or a descriptive error
/// string wrapped in `JsValue` on failure.
#[wasm_bindgen(js_name = "deriveAddress")]
pub fn derive_address(pub_key_hex: &str) -> Result<String, JsValue> {
    let bytes = hex::decode(pub_key_hex)
        .map_err(|e| JsValue::from_str(&format!("hex decode error: {e}")))?;
    let addr = Address::from_public_key(&bytes).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(addr.to_gxqs_string())
}

/// Derive a GXQS testnet address from a compressed or uncompressed public key.
///
/// Same as [`derive_address`] but returns a `tgxqs1…` testnet address.
#[wasm_bindgen(js_name = "deriveTestnetAddress")]
pub fn derive_testnet_address(pub_key_hex: &str) -> Result<String, JsValue> {
    let bytes = hex::decode(pub_key_hex)
        .map_err(|e| JsValue::from_str(&format!("hex decode error: {e}")))?;
    let addr = Address::from_public_key(&bytes).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(addr.to_testnet_string())
}

/// Generate a new random 32-byte vault key and return it as a lowercase hex string.
///
/// # Security
/// The returned key is only as secure as the JavaScript environment it runs in.
/// For production deployments, vault keys are managed exclusively by the
/// `walletd` process and must never be handled in browser JS.
#[wasm_bindgen(js_name = "generateVaultKey")]
pub fn generate_vault_key() -> String {
    let key = SecretKey::generate();
    hex::encode(key.as_bytes())
}

/// Encrypt `plaintext` bytes using a vault key.
///
/// `key_hex` — 32-byte vault key as a lowercase hex string.
///
/// Returns a JSON-encoded `VaultEntry` string on success, or an error
/// string wrapped in `JsValue` on failure.
#[wasm_bindgen(js_name = "vaultEncrypt")]
pub fn vault_encrypt(key_hex: &str, plaintext: &[u8]) -> Result<String, JsValue> {
    let key_bytes =
        hex::decode(key_hex).map_err(|e| JsValue::from_str(&format!("hex decode error: {e}")))?;
    let key = SecretKey::from_bytes(&key_bytes).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let entry = vault::encrypt(&key, plaintext).map_err(|e| JsValue::from_str(&e.to_string()))?;
    serde_json::to_string(&entry).map_err(|e| JsValue::from_str(&e.to_string()))
}

/// Decrypt a vault entry.
///
/// `key_hex` — 32-byte vault key as a lowercase hex string.  
/// `entry_json` — JSON-encoded `VaultEntry` (as returned by [`vault_encrypt`]).
///
/// Returns the decrypted plaintext bytes on success, or an error string
/// wrapped in `JsValue` on failure.
#[wasm_bindgen(js_name = "vaultDecrypt")]
pub fn vault_decrypt(key_hex: &str, entry_json: &str) -> Result<Vec<u8>, JsValue> {
    let key_bytes =
        hex::decode(key_hex).map_err(|e| JsValue::from_str(&format!("hex decode error: {e}")))?;
    let key = SecretKey::from_bytes(&key_bytes).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let entry: crate::vault::VaultEntry =
        serde_json::from_str(entry_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    vault::decrypt(&key, &entry).map_err(|e| JsValue::from_str(&e.to_string()))
}
