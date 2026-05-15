export default function DesktopNav() {
  return (
    <nav className="w-64 bg-gxqs-surface border-r border-gxqs-border p-4 flex flex-col">
      <a href="/" className="text-gxqs-primary mb-4">
        Home
      </a>
      <a href="/dashboard" className="text-gxqs-primary mb-4">
        Dashboard
      </a>
      <a href="/settings" className="text-gxqs-primary">
        Settings
      </a>
    </nav>
  );
}
