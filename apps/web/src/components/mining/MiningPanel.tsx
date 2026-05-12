'use client';

/** Static sparkline bars representing recent hashrate samples (0–100). */
const SPARKLINE = [12, 18, 9, 24, 31, 15, 8, 20, 14, 22, 10, 16] as const;

const GPU_UNITS: { id: string; util: number; temp: number; mem: number }[] = [
  { id: 'GPU:0', util: 0, temp: 0, mem: 0 },
  { id: 'GPU:1', util: 0, temp: 0, mem: 0 },
];

export function MiningPanel() {
  return (
    <div className="glass rounded-xl p-5 h-full min-h-48 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-mono text-gxqs-muted uppercase tracking-widest">
          Compute Engine
        </h2>
        <span className="text-gxqs-warning text-xs font-mono">● Idle</span>
      </div>

      {/* Hashrate + sparkline */}
      <div>
        <div className="text-gxqs-muted text-xs font-mono mb-1">Hashrate</div>
        <div className="flex items-end gap-3">
          <div className="text-3xl font-mono font-bold text-gxqs-accent glow-text-accent">0</div>
          <span className="text-gxqs-muted text-xs font-mono mb-1">MH/s</span>
          <div className="flex items-end gap-0.5 h-8 ml-auto">
            {SPARKLINE.map((v, i) => (
              <div
                key={i}
                className="w-3 bg-gxqs-accent/30 rounded-sm transition-all duration-500"
                style={{ height: `${Math.max(v, 4)}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* GPU Compute Overview */}
      <div>
        <div className="text-gxqs-muted text-xs font-mono mb-2 uppercase tracking-wider">
          GPU Compute Overview
        </div>
        <div className="space-y-2">
          {GPU_UNITS.map((gpu) => (
            <div key={gpu.id} className="bg-gxqs-border/20 rounded-lg p-2">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-white text-xs font-mono">{gpu.id}</span>
                <div className="flex gap-3 text-xs font-mono text-gxqs-muted">
                  <span>
                    Temp:{' '}
                    <span className="text-gxqs-warning">
                      {gpu.temp > 0 ? `${gpu.temp}°C` : '—'}
                    </span>
                  </span>
                  <span>
                    VRAM:{' '}
                    <span className="text-gxqs-primary">{gpu.mem > 0 ? `${gpu.mem}%` : '—'}</span>
                  </span>
                </div>
              </div>
              <div className="h-1 bg-gxqs-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gxqs-accent to-gxqs-primary rounded-full transition-all duration-700"
                  style={{ width: `${gpu.util}%` }}
                />
              </div>
              <div className="text-right text-xs font-mono text-gxqs-muted mt-0.5">{gpu.util}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* CPU utilisation bar */}
      <div>
        <div className="flex justify-between text-xs font-mono text-gxqs-muted mb-1">
          <span>CPU Utilisation</span>
          <span>0%</span>
        </div>
        <div className="h-1.5 bg-gxqs-border rounded-full overflow-hidden">
          <div className="h-full bg-gxqs-primary rounded-full w-0 transition-all duration-500" />
        </div>
      </div>

      {/* Shares + perf row */}
      <div className="flex gap-4 text-xs font-mono">
        <span className="text-gxqs-muted">
          Accepted <span className="text-gxqs-success font-bold">0</span>
        </span>
        <span className="text-gxqs-muted">
          Rejected <span className="text-gxqs-danger font-bold">0</span>
        </span>
        <span className="text-gxqs-muted ml-auto">
          Efficiency <span className="text-gxqs-primary font-bold">—</span>
        </span>
      </div>

      {/* Controls */}
      <button className="mt-auto w-full py-2 bg-gxqs-accent/10 border border-gxqs-accent/30 rounded-lg text-gxqs-accent text-xs font-mono hover:bg-gxqs-accent/20 transition-colors">
        Start Compute Session
      </button>
    </div>
  );
}
