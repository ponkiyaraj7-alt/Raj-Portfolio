"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export type Density = "comfortable" | "compact";

interface Ctx {
  density: Density;
  setDensity: (d: Density) => void;
  toggle: () => void;
}

const DensityCtx = createContext<Ctx>({
  density: "comfortable",
  setDensity: () => {},
  toggle: () => {},
});

const STORAGE_KEY = "forge.density";

export function DensityProvider({ children }: { children: ReactNode }) {
  const [density, setDensityState] = useState<Density>("comfortable");

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "compact" || v === "comfortable") setDensityState(v);
    } catch {}
  }, []);

  const setDensity = useCallback((d: Density) => {
    setDensityState(d);
    try { localStorage.setItem(STORAGE_KEY, d); } catch {}
  }, []);

  const toggle = useCallback(() => {
    setDensityState((prev) => {
      const next: Density = prev === "comfortable" ? "compact" : "comfortable";
      try { localStorage.setItem(STORAGE_KEY, next); } catch {}
      return next;
    });
  }, []);

  return (
    <DensityCtx.Provider value={{ density, setDensity, toggle }}>
      {children}
    </DensityCtx.Provider>
  );
}

export function useDensity() {
  return useContext(DensityCtx);
}
