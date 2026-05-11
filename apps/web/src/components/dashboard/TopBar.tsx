'use client';

import { useRuntimeStore } from '@/store/runtimeStore';

export function TopBar() {
  const { networkStatus, blockHeight } = useRuntimeStore();

  return (
    <header className="h-14 border-b border-gxqs-border bg-gxqs-surface flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-4">
        <span className="text-gxqs-muted text-sm font-mono">GXQS Runtime Platform</span>
      </div>

      <div className="flex items-center gap-6">
        {/* Block height */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-gxqs-muted">Block</span>
          <span className="text-gxqs-primary">{blockHeight.toLocaleString()}</span>
        </div>

        {/* Network status indicator */}
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              networkStatus === 'connected'
                ? 'bg-gxqs-accent animate-pulse'
                : networkStatus === 'syncing'
                  ? 'bg-gxqs-warning animate-pulse-slow'
                  : 'bg-gxqs-danger'
            }`}
          />
          <span className="text-xs text-gxqs-muted font-mono capitalize">{networkStatus}</span>
        </div>
      </div>
    </header>
  );
}
