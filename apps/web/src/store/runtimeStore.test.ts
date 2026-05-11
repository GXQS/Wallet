import { describe, it, expect, beforeEach } from 'vitest';
import { useRuntimeStore } from './runtimeStore';

describe('runtimeStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test.
    useRuntimeStore.setState({
      networkStatus: 'disconnected',
      blockHeight: 0,
      walletdConnected: false,
    });
  });

  it('should initialise with disconnected state', () => {
    const { networkStatus, blockHeight, walletdConnected } = useRuntimeStore.getState();
    expect(networkStatus).toBe('disconnected');
    expect(blockHeight).toBe(0);
    expect(walletdConnected).toBe(false);
  });

  it('should update network status', () => {
    const { setNetworkStatus } = useRuntimeStore.getState();
    setNetworkStatus('connected');
    expect(useRuntimeStore.getState().networkStatus).toBe('connected');
  });

  it('should update block height', () => {
    const { setBlockHeight } = useRuntimeStore.getState();
    setBlockHeight(123456);
    expect(useRuntimeStore.getState().blockHeight).toBe(123456);
  });

  it('should update walletd connection status', () => {
    const { setWalletdConnected } = useRuntimeStore.getState();
    setWalletdConnected(true);
    expect(useRuntimeStore.getState().walletdConnected).toBe(true);
  });

  it('should transition through network status states', () => {
    const { setNetworkStatus } = useRuntimeStore.getState();

    setNetworkStatus('syncing');
    expect(useRuntimeStore.getState().networkStatus).toBe('syncing');

    setNetworkStatus('connected');
    expect(useRuntimeStore.getState().networkStatus).toBe('connected');

    setNetworkStatus('disconnected');
    expect(useRuntimeStore.getState().networkStatus).toBe('disconnected');
  });
});
