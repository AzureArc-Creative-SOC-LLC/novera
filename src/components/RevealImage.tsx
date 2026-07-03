"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// Luxury editorial easing — the curtain settles, never bounces.
const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 1.9;

type RevealImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** Outer container classes — aspect ratio + border radius live here. */
  className?: string;
  /** Extra classes applied to the inner <Image> (e.g. grayscale treatment). */
  imgClassName?: string;
  /** "view" reveals on scroll-in (default); "load" reveals on mount (hero). */
  trigger?: "view" | "load";
  grade?: boolean;
  hover?: boolean;
  delay?: number;
};

/**
 * Primary image reveal used site-wide.
 *
 * A vertical clip-path mask uncovers the frame top → bottom (the image stays
 * put — only the mask moves), while the image itself settles from scale 1.08→1
 * and opacity 0.95→1. No fade-up, no slide, no bounce.
 */
export default function RevealImage({
  src,
  alt,
  sizes,
  priority,
  className = "",
  imgClassName = "",
  trigger = "view",
  grade = true,
  hover = true,
  delay = 0,
}: RevealImageProps) {
  const reduce = useReducedMotion();

  const transition = { duration: DURATION, ease: EASE, delay };
  const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

  // Mask: inset(top right BOTTOM left) — animate bottom inset 100% → 0%.
  const mask = reduce
    ? {}
    : {
        initial: { clipPath: "inset(0% 0% 100% 0%)" },
        transition,
        ...(trigger === "load"
          ? { animate: { clipPath: "inset(0% 0% 0% 0%)" } }
          : { whileInView: { clipPath: "inset(0% 0% 0% 0%)" }, viewport }),
      };

  const settle = reduce
    ? {}
    : {
        initial: { scale: 1.08, opacity: 0.95 },
        transition,
        ...(trigger === "load"
          ? { animate: { scale: 1, opacity: 1 } }
          : { whileInView: { scale: 1, opacity: 1 }, viewport }),
      };

  return (
    <motion.div
      className={`group relative overflow-hidden ${className}`}
      {...mask}
    >
      <motion.div className="absolute inset-0" {...settle}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${grade ? "img-grade" : ""} ${
            hover ? "img-hover" : ""
          } ${imgClassName}`}
        />
      </motion.div>
    </motion.div>
  );
}
