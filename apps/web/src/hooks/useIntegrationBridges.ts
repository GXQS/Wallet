'use client';

import { useMemo } from 'react';
import type {
  CoreWalletDaemonBridge,
  CoreWalletDaemonSyncPayload,
  CoreWalletDaemonSyncResult,
  ExployerBridge,
  ExployerSyncPayload,
  ExployerSyncResult,
  WalletRegistrationPayload,
  WalletRegistrationResult,
} from '@/types/integration';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
    status: 'pending',
    indexedContracts: payload.walletAddress ? 0 : 0,
    indexedAt: new Date().toISOString(),
  };
}

export function useIntegrationBridges(): {
  coreBridge: CoreWalletDaemonBridge;
  exployerBridge: ExployerBridge;
} {
  const coreBridge = useMemo<CoreWalletDaemonBridge>(
    () => ({
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
