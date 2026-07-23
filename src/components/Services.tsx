// Server component — see the note in About.tsx. The product grid is the primary
// content for crawlers, so it must be in the initial HTML.
import Link from "next/link";
import Reveal from "./Reveal";
import RevealImage from "./RevealImage";
import { PRODUCTS } from "@/lib/data";

export default function Products() {
  return (
    <section id="products" className="section-pad bg-background-secondary">
      <div className="container-lux">
        {/* Heading — asymmetric, editorial */}
        <div className="grid lg:grid-cols-12 gap-8 mb-24 lg:mb-32">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-7">Our Range</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-section">
                Formulations engineered
                <br />
                for certainty.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <Reveal delay={0.1}>
              <p className="lede">
                Four focused lines each lyophilised, sealed, and documented, so
                what reaches your bench is exactly what the label states.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Product blocks — editorial, thin top rule, generous space */}
        <div className="grid sm:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-24 lg:gap-y-32">
          {PRODUCTS.map((p) => (
            <article key={p.no} className="group">
              <Link href={`/products/${p.slug}`} className="block">
                <RevealImage
                  src={p.image}
                  alt={p.name}
                  sizes="(max-width: 640px) 100vw, 45vw"
                  className="aspect-[3/2] rounded-[28px] lg:rounded-[32px] bg-background-secondary"
                  imgClassName="!object-cover"
                />
              </Link>

              <div className="mt-6 flex items-start gap-6 border-t border-line pt-6">
                <span className="font-serif text-2xl text-accent leading-none mt-1">
                  {p.no}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <Link
                      href={`/products/${p.slug}`}
                      className="text-subhead link-underline"
                    >
                      {p.name}
                    </Link>
                    <Link
                      href={`/products/${p.slug}`}
                      className="btn-lux shrink-0 !py-2.5 !px-6 !text-[0.7rem]"
                    >
                      View
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {p.strengths.map((s) => (
                      <span
                        key={s}
                        className="text-xs tracking-wide text-dark bg-background rounded-full px-3 py-1.5 border border-line"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
