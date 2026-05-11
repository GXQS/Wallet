import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export type NetworkStatus = 'connected' | 'syncing' | 'disconnected';

interface RuntimeState {
  networkStatus: NetworkStatus;
  blockHeight: number;
  setNetworkStatus: (status: NetworkStatus) => void;
  setBlockHeight: (height: number) => void;
}

export const useRuntimeStore = create<RuntimeState>()(
  subscribeWithSelector((set) => ({
    networkStatus: 'disconnected',
    blockHeight: 0,
    setNetworkStatus: (status) => set({ networkStatus: status }),
    setBlockHeight: (height) => set({ blockHeight: height }),
  })),
);
