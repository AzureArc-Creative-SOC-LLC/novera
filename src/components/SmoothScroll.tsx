"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Respect reduced-motion: skip smooth scroll entirely.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Lenis needs driving from a rAF loop. This was GSAP's ticker purely so
    // ScrollTrigger stayed in sync; with the Hero's parallax now on framer-
    // motion (which reads scroll natively), a plain rAF loop is all that's
    // left — and gsap drops out of the bundle.
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Smooth in-page anchor navigation. Handles "#id" and "/#id" links — the
    // latter only when the target section exists on the current page (home).
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'a[href^="#"], a[href^="/#"]'
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;
      const hash = href.startsWith("/#") ? href.slice(1) : href;
      if (!hash.startsWith("#") || hash === "#") return;
      const el = document.querySelector(hash);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
