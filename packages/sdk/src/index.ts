/**
 * GXQS Platform SDK
 *
 * Typed client for the GXQS walletd JSON-RPC API.
 * All private key operations are delegated to the walletd process;
 * this SDK never handles raw key material.
 */

export type { Address, GenerateAddressRequest, GenerateAddressResponse } from './types/address.js';
export type { Transaction, BuildTransactionRequest } from './types/transaction.js';
export type { HealthResponse } from './types/health.js';
export { GxqsClient } from './client.js';
export { GxqsError, RpcError } from './errors.js';
