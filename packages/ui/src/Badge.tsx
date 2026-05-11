interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

const VARIANT_CLASSES: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-gxqs-muted/20 text-gxqs-muted border-gxqs-muted/30',
  success: 'bg-gxqs-accent/10 text-gxqs-accent border-gxqs-accent/30',
  warning: 'bg-gxqs-warning/10 text-gxqs-warning border-gxqs-warning/30',
  danger: 'bg-gxqs-danger/10 text-gxqs-danger border-gxqs-danger/30',
};

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-mono ${VARIANT_CLASSES[variant]}`}
    >
      {label}
    </span>
  );
}
