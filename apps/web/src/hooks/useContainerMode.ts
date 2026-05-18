'use client';

import { RefObject, useEffect, useState } from 'react';

export type ContainerMode = 'phone' | 'tablet' | 'desktop';

function getMode(width: number): ContainerMode {
  if (width < 768) {
    return 'phone';
  }
  if (width < 1024) {
    return 'tablet';
  }
  return 'desktop';
}

export function useContainerMode(ref: RefObject<HTMLElement | null>): ContainerMode {
  const [mode, setMode] = useState<ContainerMode>('desktop');

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const next = getMode(entries[0]?.contentRect.width ?? 1024);
      setMode(next);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return mode;
}
