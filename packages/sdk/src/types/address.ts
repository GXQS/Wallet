/** A GXQS mainnet or testnet address string. */
export type Address = string;

export interface GenerateAddressRequest {
  /** Compressed or uncompressed secp256k1 public key as a hex string. */
  publicKeyHex: string;
}

export interface GenerateAddressResponse {
  /** Bech32-encoded GXQS address (e.g. gxqs1…). */
  address: Address;
  /** Hex-encoded raw address bytes. */
  hex: string;
}
