"use client";

import { createContext, useContext, useState } from "react";

type PreloadState = { ready: boolean; setReady: (v: boolean) => void };

const PreloadContext = createContext<PreloadState>({ ready: true, setReady: () => {} });

export function PreloadProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  return <PreloadContext.Provider value={{ ready, setReady }}>{children}</PreloadContext.Provider>;
}

/** True once the intro loader has left the screen; hero animations wait for it. */
export const usePreloaded = () => useContext(PreloadContext);
