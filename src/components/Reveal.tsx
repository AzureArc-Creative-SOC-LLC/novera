"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Soft ease-out ("power2.out" feel) — motion is felt, not noticed.
const EASE = [0.22, 0.61, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span" | "li";
};

/** Fade + subtle translateY reveal, once on scroll into view. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 60,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -12% 0px" }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers its <Reveal>/motion children. */
export function Stagger({
  children,
  className,
  delayChildren = 0.05,
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  stagger?: number;
}) {
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 1.4, ease: EASE } },
};
