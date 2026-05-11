'use client';

/** Static sparkline bars representing recent hashrate samples (0–100). */
const SPARKLINE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] as const;

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
      <div className="mb-3">
        <div className="text-gxqs-muted text-xs font-mono mb-1">Hashrate</div>
        <div className="flex items-end gap-2">
          <div className="text-3xl font-mono font-bold text-gxqs-accent glow-text-accent">0</div>
          <span className="text-gxqs-muted text-xs font-mono mb-1">MH/s</span>
        </div>
      </div>

      {/* Mini sparkline */}
      <div className="flex items-end gap-0.5 h-8 mb-3">
        {SPARKLINE.map((v, i) => (
          <div
            key={i}
            className="flex-1 bg-gxqs-accent/40 rounded-sm"
            style={{ height: `${Math.max(v, 4)}%` }}
          />
        ))}
      </div>

      {/* GPU + CPU utilisation bars */}
      <div className="space-y-2 mb-4">
        <div>
          <div className="flex justify-between text-xs font-mono text-gxqs-muted mb-1">
            <span>GPU</span>
            <span>0%</span>
          </div>
          <div className="h-1.5 bg-gxqs-border rounded-full overflow-hidden">
            <div className="h-full bg-gxqs-accent rounded-full w-0 transition-all duration-500" />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs font-mono text-gxqs-muted mb-1">
            <span>CPU</span>
            <span>0%</span>
          </div>
          <div className="h-1.5 bg-gxqs-border rounded-full overflow-hidden">
            <div className="h-full bg-gxqs-primary rounded-full w-0 transition-all duration-500" />
          </div>
        </div>
      </div>

      {/* Shares row */}
      <div className="flex gap-2 text-xs font-mono mb-4">
        <span className="text-gxqs-muted">Accepted</span>
        <span className="text-gxqs-success font-bold">0</span>
        <span className="text-gxqs-muted ml-2">Rejected</span>
        <span className="text-gxqs-danger font-bold">0</span>
      </div>

      {/* Controls */}
      <button className="w-full py-2 bg-gxqs-accent/10 border border-gxqs-accent/30 rounded-lg text-gxqs-accent text-xs font-mono hover:bg-gxqs-accent/20 transition-colors">
        Start Compute Session
      </button>
    </div>
  );
}
