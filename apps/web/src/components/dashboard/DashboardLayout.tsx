'use client';

import { useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { NavSidebar } from './NavSidebar';
import { TopBar } from './TopBar';
import MobileNav from '../navigation/MobileNav';
import { AIAssistantPanel } from '../ai/AIAssistantPanel';
import { useContainerMode } from '@/hooks/useContainerMode';
import { useAdaptiveRuntime } from '@/hooks/useAdaptiveRuntime';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mode = useContainerMode(containerRef);
  const runtime = useAdaptiveRuntime();

  const shellClassName = useMemo(() => {
    return runtime.lowEndDevice ? 'adaptive-shell low-power' : 'adaptive-shell';
  }, [runtime.lowEndDevice]);

  return (
    <div
      ref={containerRef}
      className={`${shellClassName} flex h-screen overflow-hidden bg-gxqs-bg`}
    >
      <aside className="hidden md:block">
        <NavSidebar />
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close navigation drawer"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85vw] border-r border-gxqs-border bg-gxqs-bg/95 p-3 backdrop-blur-sm">
            <NavSidebar />
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar onToggleMobileNav={() => setDrawerOpen((value) => !value)} />
        <main className="flex-1 overflow-y-auto pb-24 md:pb-0">{children}</main>

        <div className="md:hidden">
          <MobileNav onOpenDrawer={() => setDrawerOpen(true)} />
        </div>

        <div className="hidden lg:block fixed right-4 top-20 w-80 max-w-[28vw] z-20">
          <AIAssistantPanel mode="desktop" />
        </div>

        {mode === 'tablet' && <AIAssistantPanel mode="tablet" />}
        {mode === 'phone' && (
          <div className="md:hidden px-4 pb-24">
            <AIAssistantPanel mode="phone" />
          </div>
        )}
      </div>
    </div>
  );
}
