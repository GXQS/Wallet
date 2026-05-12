'use client';

import { useMemo } from 'react';
import type {
  CoreWalletDaemonBridge,
  CoreWalletDaemonSyncPayload,
  CoreWalletDaemonSyncResult,
  ExployerBridge,
  ExployerSyncPayload,
  ExployerSyncResult,
  WalletImportPayload,
  WalletImportResult,
  WalletProvisioningPayload,
  WalletProvisioningResult,
  WalletRegistrationPayload,
  WalletRegistrationResult,
} from '@/types/integration';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function generateSecurePlaceholderId(): string {
  const bytes = new Uint8Array(8);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('');
}

async function registerWallet(
  payload: WalletRegistrationPayload,
): Promise<WalletRegistrationResult> {
  // Placeholder workflow for cross-repo sync:
  // 1) Wallet UI validates local onboarding state
  // 2) core.git wallet daemon endpoint receives registration request
  // 3) wallet daemon returns canonical wallet ID + queue status
  await wait(120);
  return {
    walletId: `${payload.network}-${payload.address.slice(0, 8)}`,
    status: 'queued',
    queuedAt: new Date().toISOString(),
  };
}

async function requestWalletProvisioning(
  payload: WalletProvisioningPayload,
): Promise<WalletProvisioningResult> {
  // Placeholder only. In production, walletd creates key material and returns
  // a canonical public address; UI never handles secrets.
  await wait(120);
  const networkPrefix = payload.network === 'mainnet' ? 'gxqs1' : 'tgxqs1';
  const placeholderId = generateSecurePlaceholderId();
  return {
    walletAddress: `${networkPrefix}walletd-placeholder-${placeholderId}`,
    source: 'walletd-placeholder',
  };
}

async function requestWalletImport({
  mode,
  network,
  secureSessionId,
}: WalletImportPayload): Promise<WalletImportResult> {
  // Placeholder only. UI submits an opaque secure-session identifier to walletd.
  // Sensitive seed/private-key/keystore content must stay in walletd process scope.
  await wait(120);
  const networkPrefix = network === 'mainnet' ? 'gxqs1' : 'tgxqs1';
  const placeholderId = generateSecurePlaceholderId();
  let importStatus: WalletImportResult['status'] = 'queued';
  // Explicit placeholder convention: walletd can return the literal marker
  // "imported" when an import has already been finalized server-side.
  if (secureSessionId.trim().toLowerCase() === 'imported') {
    importStatus = 'imported';
  }
  return {
    walletAddress: `${networkPrefix}import-placeholder-${mode}-${placeholderId}`,
    status: importStatus,
  };
}

async function syncWallet(
  payload: CoreWalletDaemonSyncPayload,
): Promise<CoreWalletDaemonSyncResult> {
  // Placeholder workflow:
  // 1) push network + RPC profile to core.git wallet daemon
  // 2) daemon verifies chain state and registration on selected network
  // 3) daemon updates readiness for signing + transfers
  await wait(120);
  const hasRpcEndpoint = payload.rpcUrl.startsWith('http');
  return {
    status: hasRpcEndpoint && payload.walletAddress ? 'ready' : 'pending',
    workflowStep:
      payload.network === 'mainnet' ? 'await-core-confirmation' : 'prepare-registration',
    lastSyncAt: new Date().toISOString(),
  };
}

async function syncWalletData(payload: ExployerSyncPayload): Promise<ExployerSyncResult> {
  // Placeholder workflow:
  // 1) wallet profile is passed to Exployer indexer
  // 2) explorer streams balances/contracts/tx timelines back to UI
  await wait(120);
  return {
    status: payload.network === 'mainnet' ? 'ready' : 'pending',
    indexedContracts: 0,
    indexedAt: new Date().toISOString(),
  };
}

export function useIntegrationBridges(): {
  coreBridge: CoreWalletDaemonBridge;
  exployerBridge: ExployerBridge;
} {
  const coreBridge = useMemo<CoreWalletDaemonBridge>(
    () => ({
      requestWalletProvisioning,
      requestWalletImport,
      registerWallet,
      syncWallet,
    }),
    [],
  );

  const exployerBridge = useMemo<ExployerBridge>(
    () => ({
      syncWalletData,
    }),
    [],
  );

  return { coreBridge, exployerBridge };
}
