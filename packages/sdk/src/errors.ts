/** GXQS SDK error base class. */
export class GxqsError extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'GxqsError';
  }
}

/** Thrown when a walletd RPC call returns a non-OK response. */
export class RpcError extends GxqsError {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message, 'RPC_ERROR');
    this.name = 'RpcError';
  }
}

/** Thrown when a network request fails entirely. */
export class NetworkError extends GxqsError {
  constructor(cause: unknown) {
    super(
      `Network request failed: ${cause instanceof Error ? cause.message : String(cause)}`,
      'NETWORK_ERROR',
    );
    this.name = 'NetworkError';
  }
}
