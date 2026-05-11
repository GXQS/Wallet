//! GXQS Wallet Core – cryptographic primitives for the GXQS platform.
//!
//! This crate provides:
//! - Address derivation (SHA-256 → RIPEMD-160, bech32 encoding)
//! - Encrypted vault (AES-256-GCM key wrapping, zeroize-on-drop)
//! - WASM bindings for browser runtimes
//!
//! # Security guarantees
//! - Private key material is wrapped in [`Zeroize`]-derived types.
//! - Vault keys are never exposed outside this crate boundary.
//! - All random number generation uses `rand::thread_rng` (OS-backed CSPRNG).

pub mod address;
pub mod vault;

#[cfg(feature = "wasm")]
pub mod wasm;

