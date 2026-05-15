import type { Metadata, Viewport } from 'next';
import './globals.css';
import MobileNav from '../components/navigation/MobileNav';
import DesktopNav from '../components/navigation/DesktopNav';

export const metadata: Metadata = {
  title: 'GXQS Platform',
  description:
    'GXQS Distributed Compute Operating Platform – unified control plane for wallet, mining, validation, and deployment',
  keywords: ['GXQS', 'blockchain', 'compute', 'validator', 'mining'],
};

export const viewport: Viewport = {
  themeColor: '#00ffe1',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gxqs-bg text-white font-sans antialiased min-h-screen">
        <div className="flex flex-col md:flex-row">
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <DesktopNav />
          </div>

          {/* Main Content */}
          <main className="flex-1 p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
