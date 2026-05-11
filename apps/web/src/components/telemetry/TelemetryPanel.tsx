'use client';

const TELEMETRY_ROWS: {
  label: string;
  status: string;
  pid: string;
  cpu: string;
  mem: string;
  uptime: string;
  restarts: number;
}[] = [
  { label: 'walletd', status: 'stopped', pid: '—', cpu: '—', mem: '—', uptime: '—', restarts: 0 },
  { label: 'minerd', status: 'stopped', pid: '—', cpu: '—', mem: '—', uptime: '—', restarts: 0 },
  {
    label: 'validatord',
    status: 'stopped',
    pid: '—',
    cpu: '—',
    mem: '—',
    uptime: '—',
    restarts: 0,
  },
  {
    label: 'telemetryd',
    status: 'stopped',
    pid: '—',
    cpu: '—',
    mem: '—',
    uptime: '—',
    restarts: 0,
  },
  {
    label: 'deployerd',
    status: 'stopped',
    pid: '—',
    cpu: '—',
    mem: '—',
    uptime: '—',
    restarts: 0,
  },
];

export function TelemetryPanel() {
  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-mono text-gxqs-muted uppercase tracking-widest">
          Runtime Supervisor
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-gxqs-muted text-xs font-mono">GXQS.exe Process Table</span>
          <span className="text-gxqs-muted text-xs font-mono border border-gxqs-border px-2 py-0.5 rounded">
            0/5 running
          </span>
        </div>
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
              <th className="text-left py-2 pr-4">MEM</th>
              <th className="text-left py-2 pr-4">UPTIME</th>
              <th className="text-left py-2">RST</th>
            </tr>
          </thead>
          <tbody>
            {TELEMETRY_ROWS.map((row) => (
              <tr
                key={row.label}
                className="border-b border-gxqs-border/40 hover:bg-gxqs-border/10"
              >
                <td className="py-2 pr-4 text-white">{row.label}</td>
                <td className="py-2 pr-4">
                  <span
                    className={row.status === 'running' ? 'text-gxqs-success' : 'text-gxqs-muted'}
                  >
                    ● {row.status}
                  </span>
                </td>
                <td className="py-2 pr-4 text-gxqs-muted">{row.pid}</td>
                <td className="py-2 pr-4 text-gxqs-muted">{row.cpu}</td>
                <td className="py-2 pr-4 text-gxqs-muted">{row.mem}</td>
                <td className="py-2 pr-4 text-gxqs-muted">{row.uptime}</td>
                <td className="py-2 text-gxqs-muted">{row.restarts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
