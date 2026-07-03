"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { getProduct, formatPrice } from "@/lib/data";
import { api, ApiError } from "@/lib/api";

type CentralOrderResponse = {
  ok: boolean;
  success: boolean;
  orderNumber: string;
  orderId: number;
  totals: { subtotal: number; shipping: number; discount: number; total: number };
};

type PromoResponse = { ok: boolean; valid: boolean; percent: number };

const inputCls =
  "w-full bg-transparent border border-line rounded-full px-5 py-3.5 text-dark placeholder-muted/70 focus:border-olive focus:outline-none transition-colors duration-300";

const selectCls =
  "w-full bg-transparent border border-line rounded-full px-5 py-3.5 text-dark focus:border-olive focus:outline-none transition-colors duration-300 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236d6d6d%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-no-repeat bg-[right_1.25rem_center]";

export default function CheckoutPage() {
  const { items, subtotal, clear, hydrated } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [promoStatus, setPromoStatus] = useState<
    { kind: "idle" } | { kind: "checking" } | { kind: "valid"; percent: number } | { kind: "invalid"; msg: string }
  >({ kind: "idle" });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    country: "United Arab Emirates",
    discount: "",
  });

  const lines = items
    .map((i) => ({ item: i, product: getProduct(i.slug) }))
    .filter((l) => l.product);

  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const discountPercent =
    promoStatus.kind === "valid" ? promoStatus.percent : 0;
  const discountAmount = Math.round(subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount);

  const applyPromo = async () => {
    const code = form.discount.trim();
    if (!code) return;
    setPromoStatus({ kind: "checking" });
    try {
      const res = await api<PromoResponse>("/api/promos/validate", {
        method: "POST",
        json: { code },
      });
      if (res.valid && typeof res.percent === "number") {
        setPromoStatus({ kind: "valid", percent: res.percent });
      } else {
        setPromoStatus({ kind: "invalid", msg: "Invalid promo code" });
      }
    } catch (err) {
      const msg =
        err instanceof ApiError && err.status === 404
          ? "Invalid promo code"
          : err instanceof Error
            ? err.message
            : "Couldn't validate promo";
      setPromoStatus({ kind: "invalid", msg });
    }
  };

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await api<CentralOrderResponse>("/api/central/orders", {
        method: "POST",
        json: {
          customer: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            mobile: form.mobile,
          },
          shippingAddress: {
            line1: form.address1,
            line2: form.address2,
            city: form.city,
            postcode: form.postcode,
            country: form.country,
          },
          promoCode:
            promoStatus.kind === "valid" ? form.discount.trim() : undefined,
          items: lines.map(({ item, product }) => ({
            name: product!.name,
            price: product!.price,
            qty: item.qty,
          })),
          subtotal,
          shipping: 0,
          discount: discountAmount,
          total,
        },
      });

      setOrderId(res.orderNumber);
      setOrderTotal(res.totals?.total ?? total);
      setPlaced(true);
      clear();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to place order."
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!placed) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [placed]);

  /* ---- Empty cart ---- */
  if (!placed && hydrated && lines.length === 0) {
    return (
      <main className="pt-28 lg:pt-32 pb-24 min-h-[70vh]">
        <div className="container-lux">
          <p className="eyebrow mb-3">Checkout</p>
          <h1 className="text-section mb-6">Complete your order</h1>
          <p className="text-muted mb-8">
            Your cart is empty — add a product before placing an order.
          </p>
          <Link href="/#products" className="btn-lux">
            View Products
          </Link>
        </div>
      </main>
    );
  }

  const firstName = form.firstName.trim() || "there";

  return (
    <main className="pt-28 lg:pt-32 pb-24">
      <div className="container-lux max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <p className="eyebrow mb-3">Checkout</p>
          <h1 className="text-section">Complete your order</h1>
          <Link
            href="/cart"
            className="link-underline mt-4 inline-block text-sm text-olive"
          >
            ← Back to cart
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left — form */}
          <form
            id="checkout-form"
            onSubmit={placeOrder}
            className="lg:col-span-7 flex flex-col gap-12"
          >
            {/* Contact */}
            <section>
              <h2 className="text-subhead text-2xl mb-6">Contact</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  required
                  value={form.firstName}
                  onChange={set("firstName")}
                  className={inputCls}
                  placeholder="First name"
                />
                <input
                  required
                  value={form.lastName}
                  onChange={set("lastName")}
                  className={inputCls}
                  placeholder="Last name"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  className={inputCls}
                  placeholder="Email address"
                />
                <input
                  required
                  value={form.mobile}
                  onChange={set("mobile")}
                  className={inputCls}
                  placeholder="Mobile number"
                />
              </div>
            </section>

            {/* Shipping */}
            <section>
              <h2 className="text-subhead text-2xl mb-6">Shipping address</h2>
              <div className="flex flex-col gap-4">
                <input
                  required
                  value={form.address1}
                  onChange={set("address1")}
                  className={inputCls}
                  placeholder="Address line 1"
                />
                <input
                  value={form.address2}
                  onChange={set("address2")}
                  className={inputCls}
                  placeholder="Address line 2 (optional)"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    required
                    value={form.city}
                    onChange={set("city")}
                    className={inputCls}
                    placeholder="City"
                  />
                  <input
                    required
                    value={form.postcode}
                    onChange={set("postcode")}
                    className={inputCls}
                    placeholder="Postcode"
                  />
                </div>
                <select
                  required
                  value={form.country}
                  onChange={set("country")}
                  className={selectCls}
                >
                  <option>United Arab Emirates</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Saudi Arabia</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Australia</option>
                  <option>Canada</option>
                  <option>Singapore</option>
                </select>
              </div>
            </section>

            <p className="text-[0.72rem] leading-relaxed text-muted">
              For laboratory R&amp;D use only — not for human or veterinary
              consumption.
            </p>
          </form>

          {/* Right — order summary */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-[28px] bg-background-secondary p-6 lg:p-8">
              <h2 className="text-subhead text-2xl mb-6">Order summary</h2>

              {/* Lines */}
              <div className="flex flex-col gap-5 pb-6">
                {lines.map(({ item, product }) => (
                  <div key={item.slug} className="flex items-center gap-4">
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-card">
                      <Image
                        src={product!.image}
                        alt={product!.name}
                        fill
                        sizes="56px"
                        className="object-contain img-grade"
                      />
                      <span className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full bg-dark text-[0.65rem] font-medium text-background">
                        {item.qty}
                      </span>
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-dark text-sm truncate">
                        {product!.name}
                      </p>
                      <p className="text-muted text-xs mt-0.5 truncate">
                        {product!.summary}
                      </p>
                    </div>
                    <span className="text-sm text-dark whitespace-nowrap">
                      {formatPrice(product!.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Discount */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    value={form.discount}
                    onChange={(e) => {
                      set("discount")(e);
                      if (promoStatus.kind !== "idle") {
                        setPromoStatus({ kind: "idle" });
                      }
                    }}
                    placeholder="Discount code"
                    className={`${inputCls} min-w-0 bg-card`}
                    disabled={promoStatus.kind === "valid"}
                  />
                  {promoStatus.kind === "valid" ? (
                    <button
                      type="button"
                      onClick={() => {
                        setPromoStatus({ kind: "idle" });
                        setForm((f) => ({ ...f, discount: "" }));
                      }}
                      className="shrink-0 rounded-full bg-card border border-line px-6 py-3.5 text-sm text-dark hover:bg-background transition-colors"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={applyPromo}
                      disabled={
                        promoStatus.kind === "checking" ||
                        !form.discount.trim()
                      }
                      className="shrink-0 rounded-full bg-card border border-line px-6 py-3.5 text-sm text-dark hover:bg-background transition-colors disabled:opacity-60"
                    >
                      {promoStatus.kind === "checking" ? "…" : "Apply"}
                    </button>
                  )}
                </div>
                {promoStatus.kind === "valid" && (
                  <p className="mt-2 text-xs text-olive">
                    {promoStatus.percent}% off applied.
                  </p>
                )}
                {promoStatus.kind === "invalid" && (
                  <p className="mt-2 text-xs text-red-600">{promoStatus.msg}</p>
                )}
              </div>

              {/* Totals */}
              <div className="flex flex-col gap-2.5 border-t border-line pt-5 text-sm">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span className="text-dark">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-muted">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="text-dark">
                      −{formatPrice(discountAmount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-muted">
                  <span>Tracked shipping</span>
                  <span className="text-dark">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mt-5 pt-5 border-t border-line">
                <span className="text-dark text-lg">Total</span>
                <span className="font-serif text-3xl text-olive">
                  {formatPrice(total)}
                </span>
              </div>

              {submitError && (
                <p
                  role="alert"
                  className="mt-4 rounded-2xl border border-red-500/25 bg-red-500/10 p-3 text-xs text-red-700"
                >
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                form="checkout-form"
                disabled={submitting}
                className="btn-lux w-full justify-center mt-7 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full border-2 border-background border-r-transparent animate-spin" />
                    Placing order…
                  </span>
                ) : (
                  "Place Order"
                )}
              </button>
              <Link
                href="/cart"
                className="link-underline mt-4 block text-center text-sm text-muted hover:text-dark transition-colors"
              >
                Back to cart
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Order-placed modal */}
      {placed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-placed-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/40 backdrop-blur-sm p-4"
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-line bg-card p-8 text-center shadow-[0_40px_80px_-20px_rgba(83,96,82,0.35)]">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-olive text-background">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12l5 5L20 7" />
              </svg>
            </div>

            <h3
              id="order-placed-title"
              className="mt-6 font-serif text-3xl tracking-[-0.02em] text-dark"
            >
              Order placed
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-muted">
              Thanks {firstName} — we&apos;ve received your order. A confirmation
              will be sent to{" "}
              <span className="text-dark">{form.email}</span>.
            </p>

            <div className="mt-6 rounded-2xl border border-line bg-background-secondary p-4 text-left">
              <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                <span>Order #</span>
                <span className="text-dark tracking-normal font-mono text-[0.72rem]">
                  {orderId}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between font-serif text-lg">
                <span className="text-dark">Total paid</span>
                <span className="text-dark">{formatPrice(orderTotal)}</span>
              </div>
            </div>

            <Link
              href="/#products"
              className="btn-lux mt-7 w-full justify-center"
              onClick={() => setPlaced(false)}
            >
              Continue shopping
            </Link>

            <p className="mt-5 text-[0.65rem] uppercase tracking-[0.22em] text-muted">
              For laboratory R&amp;D use only
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
