"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const EASE_IMG = [0.165, 0.84, 0.44, 1] as const;

const HERO_IMG = "/images/hero-new-seo.webp";

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle scroll-linked parallax pan inside the portrait frame. framer-motion's
  // useScroll replaces GSAP ScrollTrigger: the offsets below are the equivalent
  // of start:"top bottom" / end:"bottom top" with scrub, so the motion is
  // unchanged — but it drops gsap + ScrollTrigger from the bundle entirely.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const driftY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, ease: EASE, delay },
  });

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* ---- Right-side box effect, set behind the portrait ---- */}
      <div
        aria-hidden
        className="hidden lg:block absolute inset-0 pointer-events-none"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.5 }}
          className="absolute right-[16%] top-[15%] w-[28%] h-[66%] bg-background-secondary"
        />
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.6 }}
          className="absolute right-[16%] top-[8%] w-[32%] h-[80%] border border-line"
        />
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.7 }}
          className="absolute right-[11%] top-[22%] w-[24%] h-[52%] border border-line"
        />
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.8 }}
          className="absolute right-[1%] top-[14%] w-[20%] h-[62%] border border-line"
        />
      </div>

      {/* ---- Full-height portrait (desktop) ---- */}
      <motion.div
        initial={reduce ? false : { clipPath: "inset(0% 0% 0% 100%)" }}
        animate={reduce ? undefined : { clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.6, ease: EASE_IMG, delay: 0.25 }}
        className="hidden lg:block absolute top-[10%] bottom-0 right-[9%] w-[33%] xl:w-[31%] overflow-hidden"
      >
        <motion.div
          className="absolute -top-[8%] -bottom-[8%] left-0 right-0"
          style={{ y: reduce ? 0 : driftY, willChange: "transform" }}
        >
          {/* The hero is rendered twice — this desktop copy and the mobile one
              further down. `priority` preloads regardless of whether the copy is
              displayed, so marking both would download a full-size image that
              one breakpoint never shows (measured: a wasted 147KB on desktop).
              This copy keeps priority for a fast desktop LCP; the mobile copy is
              lazy, and a display:none lazy image is never fetched at all. */}
          <Image
            src={HERO_IMG}
            alt="Novera research-grade peptide product"
            fill
            priority
            sizes="42vw"
            className="object-cover object-top img-grade scale-75"
          />
        </motion.div>
      </motion.div>

      {/* ---- Decorative geometry (desktop) ---- */}
      <div
        aria-hidden
        className="hidden lg:block absolute inset-0 pointer-events-none"
      >
        {/* Left-side geometry */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
          className="absolute left-[3%] top-[24%] w-[12%] h-[30%] bg-background-secondary"
        />
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          className="absolute left-[6%] top-[16%] w-[18%] h-[44%] border border-line"
        />
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
          className="absolute left-[1%] top-[36%] w-[10%] h-[22%] border border-line"
        />

        {/* Center geometry */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          className="absolute left-[30%] top-[13%] w-[20%] h-[32%] bg-background-secondary"
        />
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.25 }}
          className="absolute left-[22%] top-[20%] w-[34%] h-[46%] border border-line"
        />
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
          className="absolute left-[40%] top-[9%] w-[15%] h-[30%] border border-line"
        />

        {/* Bottom geometry */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
          className="absolute left-[10%] top-[64%] w-[30%] h-[26%] border border-line"
        />
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.58 }}
          className="absolute left-[4%] top-[72%] w-[12%] h-[20%] bg-background-secondary"
        />
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.62 }}
          className="absolute left-[36%] top-[70%] w-[20%] h-[24%] border border-line"
        />

        {/* Giant faint index number */}
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.4 }}
          className="absolute left-[40%] top-[6%] font-sans font-bold text-[8vw] leading-none tracking-tighter text-dark/10 select-none"
        >
          01
        </motion.span>
      </div>

      {/* ---- Small circle-dot marker ---- */}
      <motion.span
        initial={reduce ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.1 }}
        className="hidden lg:flex absolute left-[53%] top-[62%] h-12 w-12 items-center justify-center rounded-full border border-dark/40"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-dark" />
      </motion.span>

      {/* ---- Vertical year ---- */}
      <motion.span
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.9 }}
        className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 text-[0.7rem] tracking-[0.5em] text-background/70 mix-blend-difference [writing-mode:vertical-rl]"
      >
        2026
      </motion.span>

      {/* ---- Main content ---- */}
      <div className="container-lux relative z-10 min-h-[100svh] flex flex-col justify-center pt-28 pb-24 lg:pb-28">
        <motion.p
          {...rise(0.2)}
          className="text-[0.7rem] tracking-[0.32em] uppercase text-muted mb-10 lg:mb-16"
        >
          Novera Research
        </motion.p>

        <h1 className="font-sans font-bold uppercase tracking-[-0.01em] leading-[0.92] text-[clamp(2.6rem,9vw,6rem)] max-w-full lg:max-w-[55%]">
          <motion.span {...rise(0.3)} className="block text-dark/30">
            Precision in
          </motion.span>
          <motion.span {...rise(0.4)} className="block text-dark">
            Every
          </motion.span>
          <motion.span {...rise(0.5)} className="block text-dark">
            Vial.
          </motion.span>
        </h1>

        <motion.div {...rise(0.66)} className="mt-10">
          <a
            href="#products"
            className="group inline-flex items-center gap-3 bg-dark px-9 py-4 text-background text-xs tracking-[0.18em] uppercase transition-colors duration-500 hover:bg-olive"
          >
            View Products
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>

        {/* ---- Mobile portrait (in-flow) ---- */}
        <motion.div
          initial={reduce ? false : { clipPath: "inset(0% 0% 100% 0%)" }}
          animate={reduce ? undefined : { clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.4, ease: EASE_IMG, delay: 0.4 }}
          className="lg:hidden mt-12 relative aspect-[3/4] w-full overflow-hidden"
        >
          {/* Lazy, not priority: on desktop this copy is display:none and is
              therefore never fetched. On mobile it sits at the top of the page,
              so it still starts loading during first layout. */}
          <Image
            src={HERO_IMG}
            alt="Novera research-grade peptide product"
            fill
            sizes="100vw"
            className="object-cover object-top img-grade scale-75"
          />
          <span className="absolute top-4 left-4 font-sans font-bold text-5xl leading-none text-background/90 mix-blend-difference">
            01
          </span>
        </motion.div>
      </div>

      {/* ---- Corner micro-labels ---- */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1 }}
        className="hidden lg:block container-lux absolute inset-x-0 bottom-7 z-10"
      >
        <div className="flex items-end justify-between gap-6 text-[0.66rem] tracking-[0.24em] uppercase text-muted">
          <span>Batch Nº 01</span>
          <span className="hidden md:block max-w-[240px] leading-relaxed text-center normal-case tracking-normal text-[0.8rem]">
            Where rigorous testing meets reliable supply.
          </span>
          <a
            href="#products"
            className="link-underline text-muted lg:text-background/90 mix-blend-difference hover:text-dark transition-colors duration-500"
          >
            Products
          </a>
        </div>
      </motion.div>
    </section>
  );
}
