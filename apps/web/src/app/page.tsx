import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { WalletPanel } from '@/components/wallet/WalletPanel';
import { MiningPanel } from '@/components/mining/MiningPanel';
import { ValidatorPanel } from '@/components/validator/ValidatorPanel';
import { TelemetryPanel } from '@/components/telemetry/TelemetryPanel';

const METRICS = [
  { label: 'Total Balance', value: '0.00', unit: 'GXQS', delta: '+0.00%', accent: 'primary' },
  { label: '24H Rewards', value: '0.000', unit: 'GXQS', delta: '+0.00%', accent: 'success' },
  { label: 'Active Nodes', value: '0', unit: '', delta: '0 online', accent: 'primary' },
  { label: 'Total Hashrate', value: '0', unit: 'MH/s', delta: '0 GPU active', accent: 'accent' },
  { label: 'Validator Status', value: 'Offline', unit: '', delta: '0% uptime', accent: 'warning' },
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

        {/* ── Main panel row ──────────────────────────────────────────── */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-4">
            <WalletPanel />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <MiningPanel />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <ValidatorPanel />
          </div>
        </div>

        {/* ── Telemetry ───────────────────────────────────────────────── */}
        <div>
          <TelemetryPanel />
        </div>
      </div>
    </DashboardLayout>
  );
}
