import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { WalletPanel } from '@/components/wallet/WalletPanel';
import { MiningPanel } from '@/components/mining/MiningPanel';
import { ValidatorPanel } from '@/components/validator/ValidatorPanel';
import { TelemetryPanel } from '@/components/telemetry/TelemetryPanel';

const METRICS = [
  { label: 'Total Balance', value: '4,892.12', unit: 'GXQS', delta: '+3.8%', accent: 'primary' },
  { label: '24H Rewards', value: '128.54', unit: 'GXQS', delta: '+11.3%', accent: 'success' },
  { label: 'Active Nodes', value: '248', unit: '', delta: '240 online', accent: 'primary' },
  { label: 'Total Hashrate', value: '9.3', unit: 'TH/s', delta: '84 GPU active', accent: 'accent' },
  {
    label: 'Validator Status',
    value: 'Healthy',
    unit: '',
    delta: '99.98% uptime',
    accent: 'success',
  },
] as const;

const ACCENT_MAP = {
  primary: 'text-gxqs-primary glow-text',
  success: 'text-gxqs-success',
  accent: 'text-gxqs-accent glow-text-accent',
  warning: 'text-gxqs-warning',
} as const;

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto">
        <section id="overview" />
        {/* ── KPI row ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {METRICS.map((m) => (
            <div key={m.label} className="metric-card glow-border">
              <div className="text-gxqs-muted text-xs font-mono mb-1 uppercase tracking-widest">
                {m.label}
              </div>
              <div className={`text-xl font-mono font-bold ${ACCENT_MAP[m.accent]}`}>
                {m.value}
                {m.unit && (
                  <span className="text-xs text-gxqs-muted font-normal ml-1">{m.unit}</span>
                )}
              </div>
              <div className="text-gxqs-muted text-xs font-mono mt-0.5">{m.delta}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-4 glass rounded-xl p-4">
            <div className="text-gxqs-muted text-xs font-mono uppercase tracking-widest mb-3">
              GPU Overview
            </div>
            <div className="relative mx-auto h-36 w-36 rounded-full border border-gxqs-primary/30 flex items-center justify-center">
              <div className="absolute inset-2 rounded-full border border-gxqs-accent/20" />
              <div className="text-center">
                <div className="text-3xl font-mono text-gxqs-primary glow-text">82%</div>
                <div className="text-xs font-mono text-gxqs-muted">Utilization</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] font-mono">
              <div className="rounded-md border border-gxqs-border p-2 text-gxqs-muted">
                Temp 63°C
              </div>
              <div className="rounded-md border border-gxqs-border p-2 text-gxqs-muted">
                VRAM 76%
              </div>
              <div className="rounded-md border border-gxqs-border p-2 text-gxqs-muted">
                Power 212W
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 glass rounded-xl p-4">
            <div className="text-gxqs-muted text-xs font-mono uppercase tracking-widest mb-3">
              Network Topology
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['Gateway', 'Core', 'Validator', 'Walletd', 'Exployer', 'Edge'].map(
                (node, index) => (
                  <div
                    key={node}
                    className={`rounded-md border p-2 text-[11px] font-mono text-center ${
                      index % 2 === 0
                        ? 'border-gxqs-primary/30 text-gxqs-primary'
                        : 'border-gxqs-accent/30 text-gxqs-accent'
                    }`}
                  >
                    {node}
                  </div>
                ),
              )}
            </div>
            <div className="mt-3 text-xs font-mono text-gxqs-muted">
              P2P Latency avg: 21ms • 128 peers
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 glass rounded-xl p-4">
            <div className="text-gxqs-muted text-xs font-mono uppercase tracking-widest mb-3">
              Mining Chart
            </div>
            <div className="h-28 flex items-end gap-1">
              {[32, 48, 44, 58, 62, 70, 56, 74, 80, 72, 86, 90].map((value, index) => (
                <div
                  key={index}
                  style={{ height: `${value}%` }}
                  className="flex-1 rounded-sm bg-gradient-to-t from-gxqs-accent/50 to-gxqs-primary/50"
                />
              ))}
            </div>
            <div className="mt-3 text-xs font-mono text-gxqs-muted">
              Trend: +12.7% vs previous epoch
            </div>
          </div>
        </div>

        {/* ── Main panel row ──────────────────────────────────────────── */}
        <div id="wallet" className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-4">
            <WalletPanel />
          </div>
          <div id="mining" className="col-span-12 lg:col-span-4">
            <MiningPanel />
          </div>
          <div id="validator" className="col-span-12 lg:col-span-4">
            <ValidatorPanel />
          </div>
        </div>

        {/* ── Telemetry ───────────────────────────────────────────────── */}
        <div id="health">
          <TelemetryPanel />
        </div>
      </div>
    </DashboardLayout>
  );
}
