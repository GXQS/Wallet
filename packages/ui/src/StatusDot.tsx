type StatusVariant = 'online' | 'offline' | 'syncing' | 'warning';

const STATUS_CLASSES: Record<StatusVariant, string> = {
  online: 'bg-gxqs-accent animate-pulse',
  offline: 'bg-gxqs-danger',
  syncing: 'bg-gxqs-warning animate-pulse-slow',
  warning: 'bg-gxqs-warning',
};

interface StatusDotProps {
  status: StatusVariant;
  label?: string;
}

export function StatusDot({ status, label }: StatusDotProps) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`inline-block w-2 h-2 rounded-full ${STATUS_CLASSES[status]}`} />
      {label && <span className="text-xs font-mono text-gxqs-muted">{label}</span>}
    </span>
  );
}
