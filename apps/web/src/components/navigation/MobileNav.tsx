interface MobileNavProps {
  onOpenDrawer: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#overview' },
  { label: 'Wallet', href: '#wallet' },
  { label: 'Mining', href: '#mining' },
  { label: 'Health', href: '#health' },
] as const;

export default function MobileNav({ onOpenDrawer }: MobileNavProps) {
  return (
    <>
      <button
        type="button"
        onClick={onOpenDrawer}
        className="fixed right-4 bottom-24 z-40 rounded-full border border-gxqs-primary/40 bg-gxqs-primary/20 px-4 py-3 text-xs font-mono text-gxqs-primary shadow-[0_0_18px_rgba(0,255,225,0.22)]"
        aria-label="Open command drawer"
      >
        Commands
      </button>
      <nav
        className="fixed bottom-0 left-0 right-0 z-30 border-t border-gxqs-border bg-gxqs-surface/95 px-2 py-3 backdrop-blur-sm"
        aria-label="Mobile bottom navigation"
      >
        <ul className="grid grid-cols-4 gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-md px-2 py-2 text-center text-[11px] font-mono text-gxqs-primary active:bg-gxqs-primary/10"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
