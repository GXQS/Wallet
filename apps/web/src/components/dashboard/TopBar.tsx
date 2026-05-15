'use client';

import { useRuntimeStore } from '@/store/runtimeStore';

interface TopBarProps {
  onToggleMobileNav: () => void;
}

export function TopBar({ onToggleMobileNav }: TopBarProps) {
  const { networkStatus, blockHeight } = useRuntimeStore();

  return (
    <header
      className="h-14 border-b border-gxqs-border flex items-center justify-between px-4 shrink-0"
      style={{ background: 'rgba(15, 23, 42, 0.92)', backdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleMobileNav}
          className="md:hidden rounded-md border border-gxqs-border px-2 py-1 text-xs font-mono text-gxqs-primary"
          aria-label="Toggle navigation drawer"
        >
          Menu
        </button>
        {/* Logo mark */}
        <span className="text-gxqs-primary font-mono font-bold text-base tracking-[0.1em] glow-text">
          GXQS Runtime Platform
        </span>
        <span className="text-gxqs-border text-xs hidden md:block">│</span>
        <span className="hidden md:block text-white/60 text-xs font-mono">
          Distributed Control Plane
        </span>
        {/* Mainnet pill */}
        <span className="hidden sm:inline-flex items-center gap-1.5 bg-gxqs-success/10 border border-gxqs-success/20 rounded-full px-2.5 py-0.5 text-gxqs-success text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-gxqs-success animate-pulse inline-block" />
          Mainnet
        </span>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        {/* Block height */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className="text-gxqs-muted hidden sm:block">BLK</span>
          <span className="text-gxqs-primary">{blockHeight.toLocaleString()}</span>
        </div>

        {/* Latency */}
        <div className="hidden md:flex items-center gap-1.5 text-xs font-mono">
          <span className="text-gxqs-muted">LAT</span>
          <span className="text-gxqs-primary">—ms</span>
        </div>

        {/* Peers */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono">
          <span className="text-gxqs-muted">PEERS</span>
          <span className="text-gxqs-primary">0</span>
        </div>

        <div className="hidden xl:flex items-center gap-1.5 text-xs font-mono">
          <span className="text-gxqs-muted">SHORTCUT</span>
          <kbd className="rounded border border-gxqs-border px-1.5 py-0.5 text-gxqs-primary">G</kbd>
        </div>

        {/* Network status indicator */}
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              networkStatus === 'connected'
                ? 'bg-gxqs-success animate-pulse'
                : networkStatus === 'syncing'
                  ? 'bg-gxqs-warning animate-pulse-slow'
                  : 'bg-gxqs-danger'
            }`}
          />
          <span className="text-xs text-gxqs-muted font-mono capitalize hidden sm:block">
            {networkStatus}
          </span>
        </div>
      </div>
    </header>
  );
}
