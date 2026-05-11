'use client';

export function WalletPanel() {
  return (
    <div className="glass rounded-xl p-5 h-full min-h-48">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-mono text-gxqs-muted uppercase tracking-widest">Wallet</h2>
        <span className="text-gxqs-accent text-xs font-mono">● Connected</span>
      </div>

      {/* Balance */}
      <div className="mb-4">
        <div className="text-gxqs-muted text-xs font-mono mb-1">Total Balance</div>
        <div className="text-3xl font-mono font-bold text-gxqs-primary glow-text">0.00</div>
        <div className="text-gxqs-muted text-xs font-mono mt-1">GXQS</div>
      </div>

      {/* Address */}
      <div className="terminal text-xs truncate text-gxqs-muted">
        gxqs1••••••••••••••••••••••••••••••••••••••
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <button className="flex-1 py-2 bg-gxqs-primary/10 border border-gxqs-primary/30 rounded-lg text-gxqs-primary text-xs font-mono hover:bg-gxqs-primary/20 transition-colors">
          Send
        </button>
        <button className="flex-1 py-2 bg-gxqs-secondary/10 border border-gxqs-secondary/30 rounded-lg text-gxqs-secondary text-xs font-mono hover:bg-gxqs-secondary/20 transition-colors">
          Receive
        </button>
      </div>
    </div>
  );
}
