'use client';

const MODES = [
  {
    label: 'Popup Mode',
    detail: 'Ultra-compact wallet actions with low animation and touch-first buttons.',
  },
  {
    label: 'Side Panel Mode',
    detail: 'Balanced telemetry + controls for browser-side mining and validation checks.',
  },
  {
    label: 'Full Tab Mode',
    detail: 'Workstation-grade analytics with full routing, governance, and policy workflows.',
  },
] as const;

export function ExtensionModesPanel() {
  return (
    <section className="glass rounded-xl p-4" aria-label="Extension responsive modes">
      <h3 className="text-xs font-mono uppercase tracking-widest text-gxqs-muted mb-3">
        Extension Responsive Modes
      </h3>
      <div className="adaptive-cards">
        {MODES.map((mode) => (
          <article
            key={mode.label}
            className="rounded-lg border border-gxqs-border bg-gxqs-border/15 p-3"
          >
            <h4 className="text-sm font-mono text-gxqs-primary mb-1">{mode.label}</h4>
            <p className="text-xs text-gxqs-muted leading-relaxed">{mode.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
