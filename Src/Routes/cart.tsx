import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Copy, Loader2, Minus, Plus, ShieldCheck, ShoppingBag, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart";
import { districts } from "@/lib/districts";
import { useLang, type DictKey } from "@/lib/i18n";
import { orderInputSchema } from "@/lib/order-schema";
import { placeOrder } from "@/lib/orders.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart & Checkout — Shalbon Mart" },
      { name: "description", content: "Review your cart and place your order as a guest at Shalbon Mart." },
      { property: "og:title", content: "Cart & Checkout — Shalbon Mart" },
      { property: "og:description", content: "Review your cart and check out as a guest." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

type Payment = "bkash" | "nagad" | "bank";
type Field = "name" | "phone" | "email" | "address" | "district";
const fieldError: Record<Field, DictKey> = {
  name: "err_name",
  phone: "err_phone",
  email: "err_email",
  address: "err_address",
  district: "err_district",
};

function Success({ orderId, total }: { orderId: string; total: number }) {
  const { t, price } = useLang();
  return (
    <div className="container-shop flex flex-col items-center py-16 text-center md:py-24">
      <div className="relative mb-8 flex h-28 w-28 animate-pop items-center justify-center rounded-full bg-gradient-primary shadow-elegant">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" style={{ animationIterationCount: 2 }} />
        <svg viewBox="0 0 52 52" className="relative h-14 w-14" aria-hidden>
          <path d="M14 27l8 8 16-17" fill="none" className="check-draw stroke-primary-foreground" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="animate-fade-up text-3xl font-bold md:text-4xl">{t("order_success")}</h1>
      <p className="mt-3 max-w-md animate-fade-up text-muted-foreground" style={{ animationDelay: "100ms" }}>
        {t("order_success_d")}
      </p>
      <div className="mt-8 animate-fade-up rounded-2xl border bg-card px-8 py-5 shadow-soft" style={{ animationDelay: "200ms" }}>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{t("order_id")}</div>
        <div className="mt-1 flex items-center justify-center gap-2">
          <span className="font-display text-2xl font-bold tracking-wide text-primary" data-testid="order-id">{orderId}</span>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Copy order ID"
            onClick={() => {
              navigator.clipboard?.writeText(orderId);
              toast.success("Copied");
            }}
          >
            <Copy />
          </Button>
        </div>
        <div className="mt-2 text-sm">
          {t("total")}: <strong>{price(total)}</strong>
        </div>
      </div>
      <Button asChild variant="premium" size="xl" className="mt-8">
        <Link to="/shop">{t("continue_shopping")}</Link>
      </Button>
    </div>
  );
}

function CartPage() {
  const { items, subtotal, setQty, remove, clear } = useCart();
  const { t, pick, price, num } = useLang();
  const submit = useServerFn(placeOrder);

  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", district: "", notes: "" });
  const [payment, setPayment] = useState<Payment>("bkash");
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<{ orderId: string; total: number } | null>(null);

  if (done) return <Success {...done} />;

  if (items.length === 0) {
    return (
      <div className="container-shop flex flex-col items-center py-24 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-accent text-primary">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-bold">{t("cart_empty")}</h1>
        <p className="mt-2 text-muted-foreground">{t("cart_empty_d")}</p>
        <Button asChild variant="premium" size="xl" className="mt-8">
          <Link to="/shop">{t("shop_now")}</Link>
        </Button>
      </div>
    );
  }

  const update = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (k in errors) setErrors((e) => ({ ...e, [k]: false }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { ...form, payment, items: items.map((i) => ({ id: i.id, qty: i.qty })) };
    const parsed = orderInputSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Partial<Record<Field, boolean>> = {};
      for (const issue of parsed.error.issues) {
        const f = issue.path[0] as Field;
        if (f in fieldError) next[f] = true;
      }
      setErrors(next);
      return;
    }
    setLoading(true);
    try {
      const res = await submit({ data: parsed.data });
      clear();
      setDone(res);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      toast.error(t("order_failed"));
    } finally {
      setLoading(false);
    }
  };

  const err = (f: Field) =>
    errors[f] ? <p className="mt-1 text-xs font-medium text-destructive">{t(fieldError[f])}</p> : null;

  const payments: { id: Payment; label: string }[] = [
    { id: "bkash", label: t("pay_bkash") },
    { id: "nagad", label: t("pay_nagad") },
    { id: "bank", label: t("pay_bank") },
  ];

  return (
    <div className="container-shop py-8 md:py-12">
      <Link to="/shop" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> {t("continue_shopping")}
      </Link>
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">
        {t("your_cart")} <span className="text-muted-foreground">({num(items.length)})</span>
      </h1>

      <form onSubmit={onSubmit} noValidate className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <section className="space-y-3">
            {items.map((i) => (
              <div key={i.id} className="flex gap-4 rounded-2xl border bg-card p-3 md:p-4">
                <Link to="/product/$id" params={{ id: i.id }} className="shrink-0">
                  <img src={i.product.image} alt={pick(i.product.name)} width={96} height={96} className="h-20 w-20 rounded-xl object-cover md:h-24 md:w-24" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <Link to="/product/$id" params={{ id: i.id }} className="line-clamp-2 text-sm font-semibold hover:text-primary md:text-base">
                      {pick(i.product.name)}
                    </Link>
                    <Button type="button" variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-destructive" onClick={() => remove(i.id)} aria-label={t("remove")}>
                      <Trash2 />
                    </Button>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <div className="flex items-center rounded-full border">
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease">
                        <Minus />
                      </Button>
                      <span className="w-8 text-center text-sm font-semibold tabular-nums">{num(i.qty)}</span>
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setQty(i.id, i.qty + 1)} disabled={i.qty >= i.product.stock} aria-label="Increase">
                        <Plus />
                      </Button>
                    </div>
                    <span className="font-display font-bold text-primary">{price(i.product.price * i.qty)}</span>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="rounded-2xl border bg-card p-5 md:p-7">
            <h2 className="mb-5 text-xl font-bold">{t("shipping_info")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">{t("full_name")} *</Label>
                <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} className={cn("mt-1.5 h-11", errors.name && "border-destructive")} autoComplete="name" />
                {err("name")}
              </div>
              <div>
                <Label htmlFor="phone">{t("phone")} *</Label>
                <Input id="phone" inputMode="tel" placeholder="01XXXXXXXXX" value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/[^\d]/g, "").slice(0, 11))} className={cn("mt-1.5 h-11", errors.phone && "border-destructive")} autoComplete="tel" />
                {err("phone")}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email">{t("email")} *</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={cn("mt-1.5 h-11", errors.email && "border-destructive")} autoComplete="email" />
                {err("email")}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="address">{t("address")} *</Label>
                <Input id="address" value={form.address} onChange={(e) => update("address", e.target.value)} className={cn("mt-1.5 h-11", errors.address && "border-destructive")} autoComplete="street-address" />
                {err("address")}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="district">{t("district")} *</Label>
                <Select value={form.district} onValueChange={(v) => update("district", v)}>
                  <SelectTrigger id="district" className={cn("mt-1.5 h-11", errors.district && "border-destructive")}>
                    <SelectValue placeholder={t("select_district")} />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {districts.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {err("district")}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="notes">{t("notes")}</Label>
                <Textarea id="notes" rows={3} placeholder={t("notes_ph")} value={form.notes} onChange={(e) => update("notes", e.target.value)} className="mt-1.5" />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-5 md:p-7">
            <h2 className="mb-2 text-xl font-bold">{t("payment_method")}</h2>
            <p className="mb-4 text-sm text-muted-foreground">{t("pay_note")}</p>
            <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label={t("payment_method")}>
              {payments.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={payment === p.id}
                  onClick={() => setPayment(p.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border-2 p-4 text-left text-sm font-semibold transition",
                    payment === p.id ? "border-primary bg-accent" : "border-border hover:border-primary/40",
                  )}
                >
                  <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border-2", payment === p.id ? "border-primary" : "border-muted-foreground/40")}>
                    {payment === p.id && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                  </span>
                  {p.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside>
          <div className="sticky top-28 rounded-2xl border bg-card p-6 shadow-soft">
            <h2 className="mb-5 text-xl font-bold">{t("order_summary")}</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{t("subtotal")}</dt>
                <dd className="font-semibold">{price(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{t("delivery_charge")}</dt>
                <dd className="font-semibold text-success">{t("free")}</dd>
              </div>
              <div className="flex justify-between border-t pt-4 text-lg">
                <dt className="font-bold">{t("total")}</dt>
                <dd className="font-display font-bold text-primary" data-testid="cart-total">{price(subtotal)}</dd>
              </div>
            </dl>
            <Button type="submit" variant="premium" size="xl" className="mt-6 w-full" disabled={loading}>
              {loading ? <><Loader2 className="animate-spin" /> {t("placing")}</> : t("place_order")}
            </Button>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" /> {t("why_genuine_d")}
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
