'use client';

import { motion } from 'framer-motion';
import { useAdaptiveRuntime } from '@/hooks/useAdaptiveRuntime';

interface AIAssistantPanelProps {
  mode: 'phone' | 'tablet' | 'desktop';
}

export function AIAssistantPanel({ mode }: AIAssistantPanelProps) {
  const { compactCharts } = useAdaptiveRuntime();

  if (mode === 'desktop') {
    return (
      <motion.aside
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: compactCharts ? 0.1 : 0.25 }}
        className="glass rounded-xl p-4"
        aria-label="AI Assistant dock"
      >
        <h3 className="text-xs font-mono uppercase tracking-widest text-gxqs-muted mb-2">
          AI Copilot
        </h3>
        <p className="text-sm text-white/90">
          Docked analysis mode: risk alerts, routing suggestions, and policy hints.
        </p>
      </motion.aside>
    );
  }

  if (mode === 'tablet') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: compactCharts ? 0.1 : 0.25 }}
        className="fixed right-4 bottom-28 z-30 glass-accent rounded-xl p-3 max-w-[240px]"
        aria-label="AI Assistant floating"
      >
        <div className="text-xs font-mono text-gxqs-accent mb-1">AI Floating Assistant</div>
        <p className="text-xs text-white/85">Tap for quick insights and validator guidance.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: compactCharts ? 0.1 : 0.2 }}
      className="glass rounded-xl p-3"
      aria-label="AI Assistant mobile drawer"
    >
      <div className="text-xs font-mono text-gxqs-primary mb-1">AI Drawer</div>
      <p className="text-xs text-white/85">Mobile assistant stays compact and thumb-accessible.</p>
    </motion.div>
  );
}
