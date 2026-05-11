import type { PlatformNetwork } from '@/types/integration';

const WORD_BANK = [
  'anchor',
  'binary',
  'cipher',
  'delta',
  'ember',
  'flux',
  'galaxy',
  'helium',
  'ignite',
  'jungle',
  'kinetic',
  'lumen',
  'matrix',
  'nova',
  'onyx',
  'pulse',
  'quantum',
  'relay',
  'signal',
  'turbo',
  'uplink',
  'vector',
  'warden',
  'xenon',
  'yotta',
  'zenith',
  'apex',
  'byte',
  'cobalt',
  'drift',
  'echo',
  'forge',
] as const;

export interface WalletMaterial {
  mnemonic: string;
  privateKeyHex: string;
  address: string;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function randomBytes(size: number): Uint8Array {
  const bytes = new Uint8Array(size);
  globalThis.crypto.getRandomValues(bytes);
  return bytes;
}

export function generateMnemonic(wordCount = 12): string {
  const entropy = randomBytes(wordCount);
  const words = Array.from(entropy, (value) => WORD_BANK[value % WORD_BANK.length]);
  return words.join(' ');
}

export function generatePrivateKeyHex(): string {
  return bytesToHex(randomBytes(32));
}

export async function deriveAddress(input: string, network: PlatformNetwork): Promise<string> {
  const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  const hex = bytesToHex(new Uint8Array(digest).slice(0, 20));
  return `${network === 'mainnet' ? 'gxqs1' : 'tgxqs1'}${hex}`;
}

export async function generateWalletMaterial(network: PlatformNetwork): Promise<WalletMaterial> {
  const mnemonic = generateMnemonic();
  const privateKeyHex = generatePrivateKeyHex();
  const address = await deriveAddress(`${mnemonic}:${privateKeyHex}`, network);
  return { mnemonic, privateKeyHex, address };
}
