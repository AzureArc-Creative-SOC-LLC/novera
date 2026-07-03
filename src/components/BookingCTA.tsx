"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { CONTACT, DISCLAIMER, PRODUCTS } from "@/lib/data";

/* ---- inline icons ---- */
const IconWhatsApp = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.04 2c-5.46 0-9.9 4.43-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.9 9.9 0 004.73 1.2h.01c5.46 0 9.9-4.43 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0012.04 2zm0 18.02h-.01a8.2 8.2 0 01-4.18-1.15l-.3-.18-3.15.83.84-3.07-.2-.31a8.21 8.21 0 01-1.26-4.37c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 012.42 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.48-1.38-1.73-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
  </svg>
);
const IconMail = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconPhone = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
    <path d="M5 3h3l2 5-2.5 1.5a11 11 0 005 5L19 11l2 5v3a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconArrow = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CHANNELS = [
  {
    label: "WhatsApp",
    value: CONTACT.whatsapp,
    href: CONTACT.whatsappHref,
    Icon: IconWhatsApp,
    external: true,
  },
  {
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    Icon: IconMail,
  },
  {
    label: "Phone",
    value: CONTACT.phone,
    href: `tel:${CONTACT.phone.replace(/\s/g, "")}`,
    Icon: IconPhone,
  },
];

const inputCls =
  "w-full bg-transparent border-b border-background/25 py-3 text-background placeholder-background/35 focus:border-sand focus:outline-none transition-colors duration-300";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    product: "General enquiry",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `Hi Novera, I'm ${form.name} (${form.email}).\n` +
      `Interest: ${form.product}\n\n${form.message}`;
    window.open(
      `${CONTACT.whatsappHref}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSent(true);
  };

  return (
    <section id="contact" className="section-pad bg-dark text-background">
      <div className="container-lux">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left — heading + channels */}
          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-6 text-sand">Get in Touch</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif font-light text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.05] tracking-tight">
                Let&apos;s talk
                <br />
                <span className="italic">orders</span> &amp; answers.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 text-background/70 max-w-md leading-relaxed">
                WhatsApp is the fastest route — most enquiries are answered within
                minutes. Prefer email or a call? We&apos;re here for that too.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-col gap-3">
                {CHANNELS.map(({ label, value, href, Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-4 rounded-2xl border border-background/15 p-4 transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-0.5 hover:border-sand hover:bg-background/[0.04]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background/10 text-sand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.62rem] tracking-[0.22em] uppercase text-background/45">
                        {label}
                      </span>
                      <span className="block text-background mt-0.5 break-words">{value}</span>
                    </span>
                    <IconArrow className="ml-auto h-5 w-5 text-background/40 transition-all duration-500 group-hover:text-sand group-hover:translate-x-1" />
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 grid grid-cols-2 gap-6 border-t border-background/15 pt-7 text-sm text-background/70">
                <div>
                  <p className="text-[0.62rem] tracking-[0.22em] uppercase text-background/45 mb-2">
                    Studio
                  </p>
                  <p className="leading-relaxed">{CONTACT.address.join(", ")}</p>
                </div>
                <div>
                  <p className="text-[0.62rem] tracking-[0.22em] uppercase text-background/45 mb-2">
                    Hours
                  </p>
                  <p className="leading-relaxed">{CONTACT.hours}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — contact form */}
          <div className="min-w-0 lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.15}>
              <form
                onSubmit={submit}
                className="rounded-[28px] border border-background/15 bg-background/[0.03] p-7 lg:p-9"
              >
                <div className="flex items-center gap-2.5 mb-8 text-sm text-background/70">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sage" />
                  </span>
                  Typically replies within minutes
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Full name">
                    <input
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Your name"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@email.com"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <div className="mt-6">
                  <Field label="Product interest">
                    <select
                      value={form.product}
                      onChange={set("product")}
                      className={`${inputCls} appearance-none cursor-pointer`}
                    >
                      <option className="text-dark">General enquiry</option>
                      {PRODUCTS.map((p) => (
                        <option key={p.name} className="text-dark">
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="mt-6">
                  <Field label="Message">
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us what you need — quantities, strengths, timelines…"
                      className={`${inputCls} resize-none`}
                    />
                  </Field>
                </div>

                <button
                  type="submit"
                  className="btn-lux btn-invert mt-9 w-full justify-center"
                >
                  {sent ? "Opening WhatsApp…" : "Send Message"}
                  <IconArrow className="h-4 w-4" />
                </button>

                <p className="mt-5 text-[0.72rem] leading-relaxed text-background/40">
                  {DISCLAIMER}
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[0.62rem] tracking-[0.22em] uppercase text-background/45 mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}
