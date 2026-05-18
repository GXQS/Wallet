'use client';

import { useEffect, useMemo, useState } from 'react';

interface AdaptiveRuntimeState {
  reducedMotion: boolean;
  lowEndDevice: boolean;
  touchPrimary: boolean;
  compactCharts: boolean;
}

export function useAdaptiveRuntime(): AdaptiveRuntimeState {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lowEndDevice, setLowEndDevice] = useState(false);
  const [touchPrimary, setTouchPrimary] = useState(false);

  useEffect(() => {
    const motionQuery = globalThis.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointerQuery = globalThis.matchMedia('(pointer: coarse)');

    const update = () => {
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
      const cpuThreads = navigator.hardwareConcurrency ?? 8;

      setReducedMotion(motionQuery.matches);
      setTouchPrimary(coarsePointerQuery.matches);
      setLowEndDevice(memory <= 4 || cpuThreads <= 4 || motionQuery.matches);
    };

    update();
    motionQuery.addEventListener('change', update);
    coarsePointerQuery.addEventListener('change', update);

    return () => {
      motionQuery.removeEventListener('change', update);
      coarsePointerQuery.removeEventListener('change', update);
    };
  }, []);

  return useMemo(
    () => ({
      reducedMotion,
      lowEndDevice,
      touchPrimary,
      compactCharts: reducedMotion || lowEndDevice || touchPrimary,
    }),
    [reducedMotion, lowEndDevice, touchPrimary],
  );
}
