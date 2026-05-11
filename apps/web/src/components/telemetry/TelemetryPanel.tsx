'use client';

const TELEMETRY_ROWS: { label: string; status: string; pid: string; cpu: string; mem: string }[] = [
  { label: 'walletd', status: 'stopped', pid: '—', cpu: '—', mem: '—' },
  { label: 'minerd', status: 'stopped', pid: '—', cpu: '—', mem: '—' },
  { label: 'validatord', status: 'stopped', pid: '—', cpu: '—', mem: '—' },
  { label: 'telemetryd', status: 'stopped', pid: '—', cpu: '—', mem: '—' },
  { label: 'deployerd', status: 'stopped', pid: '—', cpu: '—', mem: '—' },
];

export function TelemetryPanel() {
  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-mono text-gxqs-muted uppercase tracking-widest">
          Runtime Supervisor
        </h2>
        <span className="text-gxqs-muted text-xs font-mono">GXQS.exe Process Table</span>
      </div>

      {/* Process table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="text-gxqs-muted border-b border-gxqs-border">
              <th className="text-left py-2 pr-4">DAEMON</th>
              <th className="text-left py-2 pr-4">STATUS</th>
              <th className="text-left py-2 pr-4">PID</th>
              <th className="text-left py-2 pr-4">CPU</th>
              <th className="text-left py-2">MEM</th>
            </tr>
          </thead>
          <tbody>
            {TELEMETRY_ROWS.map((row) => (
              <tr key={row.label} className="border-b border-gxqs-border/40">
                <td className="py-2 pr-4 text-white">{row.label}</td>
                <td className="py-2 pr-4">
                  <span
                    className={`${
                      row.status === 'running' ? 'text-gxqs-accent' : 'text-gxqs-muted'
                    }`}
                  >
                    ● {row.status}
                  </span>
                </td>
                <td className="py-2 pr-4 text-gxqs-muted">{row.pid}</td>
                <td className="py-2 pr-4 text-gxqs-muted">{row.cpu}</td>
                <td className="py-2 text-gxqs-muted">{row.mem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
