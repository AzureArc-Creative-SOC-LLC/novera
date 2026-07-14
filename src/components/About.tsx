"use client";

import Reveal from "./Reveal";
import RevealImage from "./RevealImage";

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container-lux">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          {/* Oversized image — visually overpowers the text */}
          <div className="lg:col-span-7 order-1">
            <RevealImage
              src="/images/about-seo.webp"
              alt="Inside the Novera research facility"
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="aspect-[4/5] w-full rounded-[28px] lg:rounded-[32px]"
            />
          </div>

          {/* Story — narrow measure, large margins */}
          <div className="lg:col-span-5 order-2">
            <Reveal>
              <p className="eyebrow mb-7">About Novera</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-section mb-10">
                Built around one
                <br />
                principle: purity.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-muted text-[1.15rem] leading-[1.85] mb-7 max-w-[480px]">
                Novera was founded in Dubai to advance research with formulations
                that are clean, reliable, and precisely made. We source only from
                verified partners and test every batch before it ever leaves us.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-muted text-[1.0625rem] leading-[1.85] mb-12 max-w-[480px]">
                From peptide synthesis to the supplement bench, our standard never
                changes — controlled processes, transparent documentation, and
                support that answers in minutes, not days.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-10 max-w-md border-t border-line pt-10">
                <Stat figure="≥99%" label="Verified purity target" />
                <Stat figure="10k+" label="Orders shipped worldwide" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ figure, label }: { figure: string; label: string }) {
  return (
    <div>
      <p className="font-serif font-light text-5xl lg:text-6xl leading-none text-olive">
        {figure}
      </p>
      <p className="text-sm text-muted mt-3">{label}</p>
    </div>
  );
}
