'use client';

export function MiningPanel() {
  return (
    <div className="glass rounded-xl p-5 h-full min-h-48">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-mono text-gxqs-muted uppercase tracking-widest">
          Compute Engine
        </h2>
        <span className="text-gxqs-warning text-xs font-mono">● Idle</span>
      </div>

      {/* Hashrate */}
      <div className="mb-4">
        <div className="text-gxqs-muted text-xs font-mono mb-1">Hashrate</div>
        <div className="text-3xl font-mono font-bold text-gxqs-accent">0</div>
        <div className="text-gxqs-muted text-xs font-mono mt-1">MH/s</div>
      </div>

      {/* GPU utilisation bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-mono text-gxqs-muted mb-1">
          <span>GPU Utilisation</span>
          <span>0%</span>
        </div>
        <div className="h-2 bg-gxqs-border rounded-full overflow-hidden">
          <div className="h-full bg-gxqs-accent rounded-full w-0 transition-all duration-500" />
        </div>
      </div>

      {/* Controls */}
      <button className="w-full py-2 bg-gxqs-accent/10 border border-gxqs-accent/30 rounded-lg text-gxqs-accent text-xs font-mono hover:bg-gxqs-accent/20 transition-colors">
        Start Compute Session
      </button>
    </div>
  );
}
