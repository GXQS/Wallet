export type PlatformNetwork = 'mainnet' | 'testnet';

export interface WalletRegistrationPayload {
  address: string;
  network: PlatformNetwork;
  authProvider: 'email' | 'google';
  contact: string;
}

export interface WalletRegistrationResult {
  walletId: string;
  status: 'queued' | 'registered';
  queuedAt: string;
}

export interface WalletProvisioningPayload {
  network: PlatformNetwork;
  rpcUrl: string;
}

export interface WalletProvisioningResult {
  walletAddress: string;
  source: 'walletd-placeholder';
}

export interface WalletImportPayload {
  mode: 'seed' | 'private' | 'keystore';
  secureSessionId: string;
  network: PlatformNetwork;
}

export interface WalletImportResult {
  walletAddress: string;
  status: 'queued' | 'imported';
}

export interface CoreWalletDaemonSyncPayload {
  network: PlatformNetwork;
  rpcUrl: string;
  walletAddress: string;
}

export interface CoreWalletDaemonSyncResult {
  status: 'pending' | 'ready';
  lastSyncAt: string;
  workflowStep:
    | 'prepare-registration'
    | 'push-wallet-registration'
    | 'await-core-confirmation'
    | 'ready-for-signing';
}

export interface ExployerSyncPayload {
  network: PlatformNetwork;
  walletAddress: string;
}

export interface ExployerSyncResult {
  status: 'pending' | 'ready';
  indexedContracts: number;
  indexedAt: string;
}

export interface CoreWalletDaemonBridge {
  requestWalletProvisioning(payload: WalletProvisioningPayload): Promise<WalletProvisioningResult>;
  requestWalletImport(payload: WalletImportPayload): Promise<WalletImportResult>;
  registerWallet(payload: WalletRegistrationPayload): Promise<WalletRegistrationResult>;
  syncWallet(payload: CoreWalletDaemonSyncPayload): Promise<CoreWalletDaemonSyncResult>;
}

export interface ExployerBridge {
  syncWalletData(payload: ExployerSyncPayload): Promise<ExployerSyncResult>;
}
