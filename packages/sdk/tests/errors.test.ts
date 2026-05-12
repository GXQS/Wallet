import { describe, it, expect } from 'vitest';
import { GxqsError, RpcError, NetworkError } from '../src/errors.js';

describe('GxqsError', () => {
  it('should create with message and code', () => {
    const err = new GxqsError('test error', 'TEST_CODE');
    expect(err.message).toBe('test error');
    expect(err.code).toBe('TEST_CODE');
    expect(err.name).toBe('GxqsError');
  });
});

describe('RpcError', () => {
  it('should carry HTTP status code', () => {
    const err = new RpcError('rpc failed', 422);
    expect(err.statusCode).toBe(422);
    expect(err.code).toBe('RPC_ERROR');
    expect(err instanceof GxqsError).toBe(true);
  });
});

describe('NetworkError', () => {
  it('should wrap Error cause', () => {
    const cause = new Error('connection refused');
    const err = new NetworkError(cause);
    expect(err.message).toContain('connection refused');
    expect(err.code).toBe('NETWORK_ERROR');
  });

  it('should handle non-Error cause', () => {
    const err = new NetworkError('timeout');
    expect(err.message).toContain('timeout');
  });
});
