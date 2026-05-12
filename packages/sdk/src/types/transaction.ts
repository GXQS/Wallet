import type { Address } from './address.js';

export type TxType = 'transfer' | 'stake' | 'unstake' | 'validator_register' | 'deploy';

export interface BuildTransactionRequest {
  type: TxType;
  from: Address;
  to: Address;
  /** Amount in smallest denomination (aGXQS). */
  amount: bigint | number;
  /** Transaction fee in aGXQS. */
  fee: bigint | number;
  /** Sender nonce. */
  nonce: number;
  /** Optional arbitrary payload data (hex-encoded). */
  data?: string;
}

export interface Transaction {
  version: number;
  type: TxType;
  from: Address;
  to: Address;
  /** Amount in smallest denomination (aGXQS), encoded as decimal string for uint64 safety. */
  amount: string;
  /** Transaction fee in aGXQS, encoded as decimal string for uint64 safety. */
  fee: string;
  nonce: number;
  timestamp: string;
  hash: string;
  signature?: string;
}
