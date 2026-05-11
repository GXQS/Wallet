'use client';

export function ValidatorPanel() {
  return (
    <div className="glass rounded-xl p-5 h-full min-h-48">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-mono text-gxqs-muted uppercase tracking-widest">Validator</h2>
        <span className="text-gxqs-muted text-xs font-mono">● Inactive</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gxqs-border/40 rounded-lg p-3">
          <div className="text-gxqs-muted text-xs font-mono mb-1">Stake</div>
          <div className="text-gxqs-primary font-mono font-bold">0 GXQS</div>
        </div>
        <div className="bg-gxqs-border/40 rounded-lg p-3">
          <div className="text-gxqs-muted text-xs font-mono mb-1">Commission</div>
          <div className="text-gxqs-primary font-mono font-bold">0%</div>
        </div>
        <div className="bg-gxqs-border/40 rounded-lg p-3">
          <div className="text-gxqs-muted text-xs font-mono mb-1">Uptime</div>
          <div className="text-gxqs-accent font-mono font-bold">—</div>
        </div>
        <div className="bg-gxqs-border/40 rounded-lg p-3">
          <div className="text-gxqs-muted text-xs font-mono mb-1">Rewards</div>
          <div className="text-gxqs-accent font-mono font-bold">0</div>
        </div>
      </div>

      <button className="w-full py-2 bg-gxqs-secondary/10 border border-gxqs-secondary/30 rounded-lg text-gxqs-secondary text-xs font-mono hover:bg-gxqs-secondary/20 transition-colors">
        Register Validator
      </button>
    </div>
  );
}
