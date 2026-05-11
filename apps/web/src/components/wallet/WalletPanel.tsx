'use client';

import { useState } from 'react';
import { useIntegrationBridges } from '@/hooks/useIntegrationBridges';
import { deriveAddress, generateWalletMaterial } from '@/lib/wallet';
import type { PlatformNetwork } from '@/types/integration';

type ImportMode = 'seed' | 'private' | 'keystore';
type AuthProvider = 'email' | 'google';

const RPC_BY_NETWORK: Record<PlatformNetwork, string> = {
  mainnet: 'https://rpc.mainnet.gxqs.io',
  testnet: 'https://rpc.testnet.gxqs.io',
};

export function WalletPanel() {
  const { coreBridge, exployerBridge } = useIntegrationBridges();
  const [network, setNetwork] = useState<PlatformNetwork>('mainnet');
  const [rpcUrl, setRpcUrl] = useState(RPC_BY_NETWORK.mainnet);
  const [authProvider, setAuthProvider] = useState<AuthProvider>('email');
  const [email, setEmail] = useState('');
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [googleLinked, setGoogleLinked] = useState(false);
  const [address, setAddress] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [privateKeyHex, setPrivateKeyHex] = useState('');
  const [importMode, setImportMode] = useState<ImportMode>('seed');
  const [importValue, setImportValue] = useState('');
  const [status, setStatus] = useState('Wallet not registered');

  const handleNetworkChange = (next: PlatformNetwork) => {
    setNetwork(next);
    setRpcUrl(RPC_BY_NETWORK[next]);
  };

  const handleCreateWallet = async () => {
    const wallet = await generateWalletMaterial(network);
    setMnemonic(wallet.mnemonic);
    setPrivateKeyHex(wallet.privateKeyHex);
    setAddress(wallet.address);
    const registration = await coreBridge.registerWallet({
      address: wallet.address,
      network,
      authProvider,
      contact: authProvider === 'email' ? email || 'unconfirmed@email' : 'google-oauth',
    });
    await coreBridge.syncWallet({
      network,
      rpcUrl,
      walletAddress: wallet.address,
    });
    await exployerBridge.syncWalletData({
      network,
      walletAddress: wallet.address,
    });
    setStatus(`Registered ${registration.walletId} (${registration.status})`);
  };

  const handleImportWallet = async () => {
    if (!importValue.trim()) {
      setStatus('Paste seed phrase/private key/keystore to import');
      return;
    }
    const nextAddress = await deriveAddress(`${importMode}:${importValue.trim()}`, network);
    setAddress(nextAddress);
    setStatus(`Imported wallet from ${importMode} (${network})`);
  };

  const handleExport = async (mode: 'mnemonic' | 'private' | 'keystore') => {
    const payload =
      mode === 'mnemonic'
        ? mnemonic
        : mode === 'private'
          ? privateKeyHex
          : JSON.stringify(
              { address, network, rpcUrl, exportedAt: new Date().toISOString() },
              null,
              2,
            );

    if (!payload) {
      setStatus('Create or import a wallet before exporting');
      return;
    }

    await globalThis.navigator.clipboard.writeText(payload);
    setStatus(`${mode} copied to clipboard`);
  };

  return (
    <div className="glass rounded-xl p-5 h-full min-h-48 flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-mono text-gxqs-muted uppercase tracking-widest">
          Smart Wallet
        </h2>
        <span className="text-xs font-mono text-gxqs-success">● Registration Ready</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => handleNetworkChange('mainnet')}
          className={`rounded-md border px-3 py-1.5 text-xs font-mono ${
            network === 'mainnet'
              ? 'border-gxqs-primary text-gxqs-primary bg-gxqs-primary/10'
              : 'border-gxqs-border text-gxqs-muted'
          }`}
        >
          Mainnet
        </button>
        <button
          type="button"
          onClick={() => handleNetworkChange('testnet')}
          className={`rounded-md border px-3 py-1.5 text-xs font-mono ${
            network === 'testnet'
              ? 'border-gxqs-accent text-gxqs-accent bg-gxqs-accent/10'
              : 'border-gxqs-border text-gxqs-muted'
          }`}
        >
          Testnet
        </button>
      </div>

      <label className="text-xs font-mono text-gxqs-muted">
        RPC Endpoint
        <input
          value={rpcUrl}
          onChange={(event) => setRpcUrl(event.target.value)}
          className="mt-1 w-full rounded-md border border-gxqs-border bg-black/30 px-2 py-1.5 text-xs text-white"
        />
      </label>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setAuthProvider('email')}
          className={`rounded-md border px-3 py-1.5 text-xs font-mono ${
            authProvider === 'email'
              ? 'border-gxqs-primary text-gxqs-primary bg-gxqs-primary/10'
              : 'border-gxqs-border text-gxqs-muted'
          }`}
        >
          Email Login
        </button>
        <button
          type="button"
          onClick={() => {
            setAuthProvider('google');
            setGoogleLinked(true);
            setStatus('Google account linked (UI placeholder)');
          }}
          className={`rounded-md border px-3 py-1.5 text-xs font-mono ${
            authProvider === 'google'
              ? 'border-gxqs-accent text-gxqs-accent bg-gxqs-accent/10'
              : 'border-gxqs-border text-gxqs-muted'
          }`}
        >
          Google Login
        </button>
      </div>

      {authProvider === 'email' && (
        <div className="space-y-2">
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setIsEmailConfirmed(false);
            }}
            placeholder="wallet.ops@gxqs.io"
            className="w-full rounded-md border border-gxqs-border bg-black/30 px-2 py-1.5 text-xs text-white"
          />
          <button
            type="button"
            onClick={() => {
              setIsEmailConfirmed(Boolean(email));
              setStatus(email ? 'Email confirmed (UI placeholder)' : 'Enter email first');
            }}
            className="w-full rounded-md border border-gxqs-primary/30 bg-gxqs-primary/10 px-2 py-1.5 text-xs font-mono text-gxqs-primary"
          >
            Confirm Email
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={handleCreateWallet}
        className="w-full rounded-lg border border-gxqs-primary/30 bg-gxqs-primary/10 py-2 text-xs font-mono text-gxqs-primary hover:bg-gxqs-primary/20"
      >
        Create New Wallet
      </button>

      <div className="grid grid-cols-3 gap-1 rounded-md bg-black/25 p-1">
        {(['seed', 'private', 'keystore'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setImportMode(mode)}
            className={`rounded px-2 py-1 text-[11px] font-mono uppercase ${
              importMode === mode ? 'bg-gxqs-border text-white' : 'text-gxqs-muted'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>
      <textarea
        value={importValue}
        onChange={(event) => setImportValue(event.target.value)}
        rows={3}
        placeholder="Import seed phrase / private key / keystore JSON"
        className="w-full rounded-md border border-gxqs-border bg-black/30 px-2 py-1.5 text-xs text-white"
      />
      <button
        type="button"
        onClick={handleImportWallet}
        className="w-full rounded-lg border border-gxqs-secondary/30 bg-gxqs-secondary/10 py-2 text-xs font-mono text-gxqs-secondary hover:bg-gxqs-secondary/20"
      >
        Import Wallet
      </button>

      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => handleExport('mnemonic')}
          className="rounded-md border border-gxqs-border px-2 py-1.5 text-[11px] font-mono text-gxqs-muted hover:text-white"
        >
          Export Seed
        </button>
        <button
          type="button"
          onClick={() => handleExport('private')}
          className="rounded-md border border-gxqs-border px-2 py-1.5 text-[11px] font-mono text-gxqs-muted hover:text-white"
        >
          Export Key
        </button>
        <button
          type="button"
          onClick={() => handleExport('keystore')}
          className="rounded-md border border-gxqs-border px-2 py-1.5 text-[11px] font-mono text-gxqs-muted hover:text-white"
        >
          Export JSON
        </button>
      </div>

      <div className="terminal text-xs space-y-1">
        <div className="text-gxqs-muted">Address: {address || '—'}</div>
        <div className="text-gxqs-muted truncate">
          Mnemonic: {mnemonic ? `${mnemonic.split(' ').slice(0, 4).join(' ')} ...` : '—'}
        </div>
        <div className="text-gxqs-muted truncate">
          Private Key: {privateKeyHex ? `${privateKeyHex.slice(0, 12)}...` : '—'}
        </div>
      </div>

      <div className="text-xs font-mono text-gxqs-muted">
        Status: <span className="text-gxqs-primary">{status}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
        <div className="rounded border border-gxqs-border bg-black/20 px-2 py-1 text-gxqs-muted">
          Email: {isEmailConfirmed ? 'Confirmed' : 'Pending'}
        </div>
        <div className="rounded border border-gxqs-border bg-black/20 px-2 py-1 text-gxqs-muted">
          Google: {googleLinked ? 'Linked' : 'Not linked'}
        </div>
      </div>
    </div>
  );
}
