import type { GenerateAddressRequest, GenerateAddressResponse } from './types/address.js';
import type { BuildTransactionRequest, Transaction } from './types/transaction.js';
import type { HealthResponse } from './types/health.js';
import { NetworkError, RpcError } from './errors.js';

interface RpcResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

/** Options for constructing a {@link GxqsClient}. */
export interface ClientOptions {
  /** Base URL of the walletd RPC server (e.g. http://localhost:8545). */
  baseUrl: string;
  /** Request timeout in milliseconds. Defaults to 10000. */
  timeoutMs?: number;
}

/**
 * Typed client for the GXQS walletd JSON-RPC API.
 *
 * All private key operations are handled by the walletd process.
 * This client never receives or transmits raw key material.
 */
export class GxqsClient {
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor(options: ClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, '');
    this.timeoutMs = options.timeoutMs ?? 10_000;
  }

  /** Check walletd liveness. */
  async healthz(): Promise<HealthResponse> {
    const res = await this.fetch<HealthResponse>('GET', '/healthz');
    return res;
  }

  /** Check walletd readiness. */
  async readyz(): Promise<HealthResponse> {
    return this.fetch<HealthResponse>('GET', '/readyz');
  }

  /** Generate a GXQS address from a public key. */
  async generateAddress(req: GenerateAddressRequest): Promise<GenerateAddressResponse> {
    const publicKeyBytes = hexToBytes(req.publicKeyHex);
    const body = { public_key: Array.from(publicKeyBytes) };
    return this.rpc<GenerateAddressResponse>('POST', '/rpc/v1/address/generate', body);
  }

  /** Validate a GXQS address string. */
  async validateAddress(address: string): Promise<{ valid: boolean }> {
    return this.rpc<{ valid: boolean }>('POST', '/rpc/v1/address/validate', { address });
  }

  /** Build an unsigned transaction. */
  async buildTransaction(req: BuildTransactionRequest): Promise<Transaction> {
    return this.rpc<Transaction>('POST', '/rpc/v1/tx/build', {
      type: req.type,
      from: req.from,
      to: req.to,
      // Encode uint64 fields as decimal strings to avoid JS number precision loss
      // for values > 2^53 - 1.
      amount: req.amount.toString(),
      fee: req.fee.toString(),
      nonce: req.nonce,
    });
  }

  // ---- private helpers ----

  private async rpc<T>(method: string, path: string, body?: unknown): Promise<T> {
    const res = await this.rawFetch(method, path, body);
    const json = (await res.json()) as RpcResponse<T>;
    if (!json.ok || !json.data) {
      throw new RpcError(json.error ?? 'Unknown RPC error', res.status);
    }
    return json.data;
  }

  private async fetch<T>(method: string, path: string): Promise<T> {
    const res = await this.rawFetch(method, path);
    return res.json() as Promise<T>;
  }

  private async rawFetch(method: string, path: string, body?: unknown): Promise<Response> {
    const controller = new AbortController();
    const timerId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const res = await globalThis.fetch(`${this.baseUrl}${path}`, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
      return res;
    } catch (err) {
      throw new NetworkError(err);
    } finally {
      clearTimeout(timerId);
    }
  }
}

function hexToBytes(hex: string): Uint8Array {
  const cleaned = hex.startsWith('0x') ? hex.slice(2) : hex;
  if (cleaned.length % 2 !== 0) {
    throw new RpcError(`Invalid hex string: odd length (${cleaned.length} chars)`, 0);
  }
  if (cleaned.length > 0 && !/^[0-9a-fA-F]+$/.test(cleaned)) {
    throw new RpcError('Invalid hex string: non-hex characters detected', 0);
  }
  const arr = new Uint8Array(cleaned.length / 2);
  for (let i = 0; i < cleaned.length; i += 2) {
    arr[i / 2] = parseInt(cleaned.slice(i, i + 2), 16);
  }
  return arr;
}
