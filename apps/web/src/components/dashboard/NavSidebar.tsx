'use client';

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview', icon: '⬡' },
  { label: 'Wallet', href: '#wallet', icon: '◈' },
  { label: 'Mining', href: '#mining', icon: '⚡' },
  { label: 'Validator', href: '#validator', icon: '◉' },
  { label: 'Health', href: '#health', icon: '▲' },
] as const;

export function NavSidebar() {
  return (
    <nav
      className="w-full md:w-16 lg:w-56 h-full flex flex-col border-r border-gxqs-border shrink-0"
      style={{ background: 'rgba(11, 15, 28, 0.92)', backdropFilter: 'blur(12px)' }}
      aria-label="Primary navigation"
    >
      {/* Logo */}
      <div className="px-4 py-5 border-b border-gxqs-border">
        <span className="text-gxqs-primary font-mono font-bold text-xl tracking-[0.25em] glow-text hidden lg:block">
          GXQS
        </span>
        <span className="text-gxqs-primary font-mono font-bold text-xl lg:hidden glow-text">G</span>
        <span className="hidden lg:block text-gxqs-muted text-xs font-mono mt-0.5 tracking-wider">
          Runtime Platform
        </span>
      </div>

      {/* Nav items */}
      <ul className="flex flex-col gap-0.5 p-2 mt-2">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gxqs-muted hover:text-white hover:bg-white/5 transition-all duration-150 group"
            >
              <span className="text-gxqs-primary text-base group-hover:drop-shadow-[0_0_6px_#00ffe1]">
                {item.icon}
              </span>
              <span className="md:hidden lg:block">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Version footer */}
      <div className="mt-auto p-4 text-gxqs-muted text-xs font-mono hidden lg:block border-t border-gxqs-border">
        v0.1.0
      </div>
    </nav>
  );
}
