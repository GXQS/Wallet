'use client';

import type { ReactNode } from 'react';
import { NavSidebar } from './NavSidebar';
import { TopBar } from './TopBar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-gxqs-bg">
      <NavSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
