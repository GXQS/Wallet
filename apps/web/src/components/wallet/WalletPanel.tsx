'use client';

export function WalletPanel() {
  return (
    <div className="glass rounded-xl p-5 h-full min-h-48">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-mono text-gxqs-muted uppercase tracking-widest">Wallet</h2>
        <span className="text-gxqs-success text-xs font-mono">● Connected</span>
      </div>

      {/* Balance */}
      <div className="mb-4">
        <div className="text-gxqs-muted text-xs font-mono mb-1">Total Balance</div>
        <div className="text-3xl font-mono font-bold text-gxqs-primary glow-text">0.00</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gxqs-muted text-xs font-mono">GXQS</span>
          <span className="text-gxqs-muted text-xs font-mono">≈ $0.00 USD</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-gxqs-border/30 rounded-md px-3 py-2">
          <div className="text-gxqs-muted text-xs font-mono">Txns</div>
          <div className="text-gxqs-primary text-sm font-mono font-bold">0</div>
        </div>
        <div className="bg-gxqs-border/30 rounded-md px-3 py-2">
          <div className="text-gxqs-muted text-xs font-mono">Nonce</div>
          <div className="text-gxqs-primary text-sm font-mono font-bold">0</div>
        </div>
      </div>

      {/* Address */}
      <div className="terminal text-xs truncate text-gxqs-muted mb-4">
        gxqs1••••••••••••••••••••••••••••••••••••••
      </div>

      {/* Actions */}
      <div className="flex gap-2">
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
