import type { Metadata, Viewport } from 'next';
import './globals.css';

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
      <body className="bg-gxqs-bg text-white font-sans antialiased min-h-screen">{children}</body>
    </html>
  );
}
