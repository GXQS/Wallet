'use client';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/', icon: '⬡' },
  { label: 'Wallet', href: '/wallet', icon: '◈' },
  { label: 'Mining', href: '/mining', icon: '⚡' },
  { label: 'Validator', href: '/validator', icon: '◉' },
  { label: 'Deploy', href: '/deploy', icon: '▲' },
  { label: 'Fleet', href: '/fleet', icon: '⬡' },
  { label: 'Settings', href: '/settings', icon: '⚙' },
] as const;

export function NavSidebar() {
  return (
    <nav className="w-16 lg:w-56 flex flex-col bg-gxqs-surface border-r border-gxqs-border shrink-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-gxqs-border">
        <span className="text-gxqs-primary font-mono font-bold text-lg tracking-widest glow-text hidden lg:block">
          GXQS
        </span>
        <span className="text-gxqs-primary font-mono font-bold text-lg lg:hidden">G</span>
      </div>

      {/* Nav items */}
      <ul className="flex flex-col gap-1 p-2 mt-2">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gxqs-muted hover:text-white hover:bg-gxqs-border transition-colors"
            >
              <span className="text-gxqs-primary text-base">{item.icon}</span>
              <span className="hidden lg:block">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Version footer */}
      <div className="mt-auto p-4 text-gxqs-muted text-xs font-mono hidden lg:block border-t border-gxqs-border">
        v0.1.0-alpha
      </div>
    </nav>
  );
}
