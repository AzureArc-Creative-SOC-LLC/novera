"use client";

import { useEffect, type DependencyList } from "react";

/**
 * Thin wrapper around useEffect for GSAP setup that runs after mount.
 * Defers one frame so layout (and Lenis) is settled before measuring.
 */
export function useGSAP(
  setup: () => void | (() => void),
  deps: DependencyList = []
) {
  useEffect(() => {
    let cleanup: void | (() => void);
    const id = requestAnimationFrame(() => {
      cleanup = setup();
    });
    return () => {
      cancelAnimationFrame(id);
      if (typeof cleanup === "function") cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
