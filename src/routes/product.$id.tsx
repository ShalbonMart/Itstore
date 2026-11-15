import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Check, ChevronRight, Minus, Plus, ShieldCheck, ShoppingBag, Truck, Zap } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/shop/ProductCard";
import { Stars } from "@/components/shop/Stars";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { discountPercent } from "@/lib/pricing";
import { getCategory, getProduct, products } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name.en} — Shalbon Mart` : "Product — Shalbon Mart";
    const desc = p ? p.short.en : "Product details at Shalbon Mart.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-shop py-24 text-center">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <Link to="/shop" className="mt-4 inline-block text-primary underline">
        Back to shop
      </Link>
    </div>
  ),
  component: ProductPage,
});

/** Gallery views: full shot plus close-up detail crops of the same image. */
const views = [
  { scale: 1, origin: "50% 50%" },
  { scale: 1.7, origin: "25% 30%" },
  { scale: 1.7, origin: "75% 70%" },
  { scale: 1.4, origin: "50% 50%" },
];

function Gallery({ src, alt }: { src: string; alt: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const v = views[active] ?? { scale: 1, origin: "50% 50%" };

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative aspect-square cursor-zoom-in overflow-hidden rounded-3xl border bg-secondary"
        onMouseMove={onMove}
        onMouseLeave={() => setZoom(null)}
      >
        <img
          src={src}
          alt={alt}
          width={816}
          height={816}
          className="h-full w-full object-cover transition-transform duration-200 ease-out"
          style={
            zoom
              ? { transform: "scale(2.2)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
              : { transform: `scale(${v.scale})`, transformOrigin: v.origin }
          }
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {views.map((view, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Image ${i + 1}`}
            className={cn(
              "aspect-square overflow-hidden rounded-xl border-2 bg-secondary transition",
              i === active ? "border-primary" : "border-transparent opacity-70 hover:opacity-100",
            )}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              width={160}
              height={160}
              className="h-full w-full object-cover"
              style={{ transform: `scale(${view.scale})`, transformOrigin: view.origin }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { t, pick, price, num } = useLang();
  const { add } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const off = discountPercent(product.price, product.oldPrice);
  const related = products.filter((p) => p.id !== product.id && p.category === product.category);
  const more = products.filter((p) => p.id !== product.id && p.category !== product.category && p.trending);
  const relatedList = [...related, ...more].slice(0, 8);
  const stockLabel = product.stock === 0 ? t("out_stock") : product.stock <= 5 ? t("low_stock") : t("in_stock");
  const stockTone = product.stock === 0 ? "bg-destructive" : product.stock <= 5 ? "bg-gold" : "bg-success";

  const addToCart = () => {
    add(product.id, qty);
    toast.success(t("added"), { description: `${pick(product.name)} × ${num(qty)}` });
  };

  return (
    <div className="container-shop py-6 md:py-10">
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-primary">{t("home")}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/shop" search={{ cat: product.category }} className="hover:text-primary">
          {pick(getCategory(product.category).name)}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="line-clamp-1 text-foreground">{pick(product.name)}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <Gallery key={product.id} src={product.image} alt={pick(product.name)} />

        <div className="flex flex-col gap-5">
          <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {pick(getCategory(product.category).name)}
          </span>
          <h1 className="text-2xl font-bold leading-tight md:text-4xl">{pick(product.name)}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Stars value={product.rating} />
            <span className="font-semibold">{num(product.rating)}</span>
            <span className="text-muted-foreground">({num(product.reviews)} {t("reviews")})</span>
          </div>
          <p className="text-muted-foreground">{pick(product.short)}</p>

          <div className="flex flex-wrap items-end gap-3 rounded-2xl bg-secondary p-5">
            <span className="font-display text-4xl font-bold text-primary">{price(product.price)}</span>
            {product.oldPrice && (
              <span className="pb-1 text-lg text-muted-foreground line-through">{price(product.oldPrice)}</span>
            )}
            {off > 0 && (
              <span className="mb-1.5 rounded-full bg-sale px-2.5 py-1 text-xs font-bold text-sale-foreground">
                -{num(off)}% {t("off")}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm font-medium">
            <span className={cn("h-2.5 w-2.5 rounded-full", stockTone)} />
            {stockLabel}
          </div>

          <div>
            <span className="mb-2 block text-sm font-medium">{t("quantity")}</span>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border bg-card">
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Decrease" onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}>
                  <Minus />
                </Button>
                <span className="w-10 text-center font-semibold tabular-nums">{num(qty)}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Increase"
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  disabled={qty >= product.stock}
                >
                  <Plus />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="xl" variant="outline" className="flex-1 border-primary text-primary" disabled={product.stock === 0} onClick={addToCart}>
              <ShoppingBag /> {t("add_to_cart")}
            </Button>
            <Button
              size="xl"
              variant="premium"
              className="flex-1"
              disabled={product.stock === 0}
              onClick={() => {
                add(product.id, qty);
                navigate({ to: "/cart" });
              }}
            >
              <Zap /> {t("buy_now")}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 rounded-xl border p-3"><Truck className="h-4 w-4 text-primary" /> {t("why_fast")}</div>
            <div className="flex items-center gap-2 rounded-xl border p-3"><ShieldCheck className="h-4 w-4 text-primary" /> {t("why_genuine")}</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="mt-14">
        <TabsList className="h-11 rounded-full p-1">
          <TabsTrigger value="details" className="rounded-full px-5">{t("details")}</TabsTrigger>
          <TabsTrigger value="delivery" className="rounded-full px-5">{t("delivery_info")}</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6 rounded-2xl border bg-card p-6 md:p-8">
          <p className="leading-relaxed">{pick(product.description)}</p>
          <h3 className="mb-3 mt-6 font-semibold">{t("whats_included")}</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f.en} className="flex items-center gap-2 text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-primary">
                  <Check className="h-3 w-3" />
                </span>
                {pick(f)}
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="delivery" className="mt-6 rounded-2xl border bg-card p-6 leading-relaxed md:p-8">
          <p>{pick(product.delivery)}</p>
          <p className="mt-3 text-sm text-muted-foreground">{t("pay_note")}</p>
        </TabsContent>
      </Tabs>

      {relatedList.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">{t("related")}</h2>
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="-ml-3 md:-ml-5">
              {relatedList.map((p) => (
                <CarouselItem key={p.id} className="basis-[70%] pl-3 sm:basis-1/2 md:basis-1/3 md:pl-5 lg:basis-1/4">
                  <ProductCard product={p} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 hidden md:flex" />
            <CarouselNext className="-right-3 hidden md:flex" />
          </Carousel>
        </section>
      )}
    </div>
  );
}
