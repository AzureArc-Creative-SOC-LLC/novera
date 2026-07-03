"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { TESTIMONIALS } from "@/lib/data";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const AUTO_MS = 6000;

function Avatar({
  src,
  alt,
  size,
  className = "",
}: {
  src: string;
  alt: string;
  size: number;
  className?: string;
}) {
  return (
    <span
      className={`relative shrink-0 overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-cover" />
    </span>
  );
}

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-1 text-accent ${className}`} aria-label="5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current">
          <path d="M10 1.5l2.47 5.26 5.78.62-4.32 3.86 1.2 5.7L10 14.9 4.87 18.4l1.2-5.7L1.75 8.84l5.78-.62L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = TESTIMONIALS[active];

  // Auto-advance unless the user is hovering the panel.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % TESTIMONIALS.length),
      AUTO_MS
    );
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      id="testimonials"
      className="section-pad bg-background-secondary overflow-hidden"
    >
      <div className="container-lux">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 lg:mb-20">
          <div className="max-w-xl">
            <Reveal>
              <p className="eyebrow mb-5">Client Reviews</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-section">
                Backed by people
                <br />
                who keep coming back.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-4 rounded-2xl border border-line bg-card px-6 py-4">
              <span className="font-serif font-light text-5xl leading-none text-olive">
                4.9
              </span>
              <div>
                <Stars />
                <p className="text-sm text-muted mt-1.5">
                  from 2,000+ verified orders
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Spotlight + selector */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Featured panel */}
          <Reveal
            delay={0.1}
            className="lg:col-span-7"
          >
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="relative h-full overflow-hidden rounded-[32px] border border-line bg-card p-8 lg:p-12 flex flex-col min-h-[400px]"
            >
              {/* Quote watermark */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-10 -right-2 select-none font-serif text-[14rem] leading-none text-accent/10"
              >
                &rdquo;
              </span>

              <Stars className="relative" />

              <div className="relative flex-1 flex items-center py-8">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={active}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <p className="font-serif font-light text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.3] tracking-tight text-dark">
                      {t.quote}
                    </p>
                    <footer className="mt-8 flex items-center gap-4">
                      <Avatar src={t.image} alt={t.name} size={52} />
                      <div>
                        <p className="text-dark">{t.name}</p>
                        <p className="text-sm text-muted mt-0.5">{t.role}</p>
                      </div>
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Progress + counter */}
              <div className="relative flex items-center justify-between">
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`View testimonial ${i + 1}`}
                      onClick={() => setActive(i)}
                      className="group/dot py-2"
                    >
                      <span
                        className={`block h-[3px] rounded-full transition-all duration-500 ${
                          i === active
                            ? "w-10 bg-olive"
                            : "w-5 bg-line group-hover/dot:bg-accent"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-sm text-muted tabular-nums">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(TESTIMONIALS.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Selectable list */}
          <Reveal delay={0.18} className="lg:col-span-5">
            <div className="flex flex-col gap-3 h-full">
              {TESTIMONIALS.map((item, i) => {
                const on = i === active;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActive(i)}
                    className={`group flex items-center gap-4 rounded-2xl border p-4 lg:p-5 text-left transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                      on
                        ? "border-olive bg-olive text-background"
                        : "border-line bg-card hover:border-accent/50 hover:-translate-y-0.5"
                    }`}
                  >
                    <Avatar
                      src={item.image}
                      alt={item.name}
                      size={44}
                      className={`transition-shadow duration-500 ${
                        on ? "ring-2 ring-background/70" : ""
                      }`}
                    />
                    <div className="min-w-0">
                      <p
                        className={`leading-tight truncate ${
                          on ? "text-background" : "text-dark"
                        }`}
                      >
                        {item.name}
                      </p>
                      <p
                        className={`text-sm mt-0.5 truncate ${
                          on ? "text-background/70" : "text-muted"
                        }`}
                      >
                        {item.role}
                      </p>
                    </div>
                    <svg
                      viewBox="0 0 24 24"
                      className={`ml-auto h-5 w-5 shrink-0 transition-all duration-500 ${
                        on
                          ? "opacity-100 translate-x-0 text-background"
                          : "opacity-0 -translate-x-2 text-accent"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
