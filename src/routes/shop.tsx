import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, Star, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { ProductCard } from "@/components/shop/ProductCard";
import { useLang } from "@/lib/i18n";
import { categories, MAX_PRICE, products, type CategoryId } from "@/lib/products";
import { matchesQuery } from "@/lib/search";
import { cn } from "@/lib/utils";

type Sort = "newest" | "price_asc" | "price_desc";
type ShopSearch = {
  q?: string | undefined;
  cat?: CategoryId | undefined;
  min?: number | undefined;
  max?: number | undefined;
  rating?: number | undefined;
  sort?: Sort | undefined;
  page?: number | undefined;
};

const PAGE_SIZE = 8;
const catIds = categories.map((c) => c.id) as string[];

export const Route = createFileRoute("/shop")({
  validateSearch: (s: { q?: unknown; cat?: unknown; min?: unknown; max?: unknown; rating?: unknown; sort?: unknown; page?: unknown }): ShopSearch => {
    const n = (v: unknown) => (v === undefined || v === "" || isNaN(Number(v)) ? undefined : Number(v));
    return {
      q: typeof s.q === "string" && s.q ? s.q : undefined,
      cat: typeof s.cat === "string" && catIds.includes(s.cat) ? (s.cat as CategoryId) : undefined,
      min: n(s.min),
      max: n(s.max),
      rating: n(s.rating),
      sort: s.sort === "price_asc" || s.sort === "price_desc" || s.sort === "newest" ? s.sort : undefined,
      page: n(s.page),
    };
  },
  head: () => ({
    meta: [
      { title: "Shop Templates, Software & Services — Shalbon Mart" },
      {
        name: "description",
        content: "Browse website templates, business software, design asset bundles and IT service packages. Filter by category, price and rating.",
      },
      { property: "og:title", content: "Shop — Shalbon Mart" },
      { property: "og:description", content: "Browse templates, software, asset bundles and IT services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Filters({ search, set }: { search: ShopSearch; set: (s: Partial<ShopSearch>) => void }) {
  const { t, pick, price, num } = useLang();
  const [range, setRange] = useState<[number, number]>([search.min ?? 0, search.max ?? MAX_PRICE]);
  useEffect(() => setRange([search.min ?? 0, search.max ?? MAX_PRICE]), [search.min, search.max]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t("category")}</h3>
        <div className="flex flex-col gap-1">
          {[{ id: undefined, label: t("all") }, ...categories.map((c) => ({ id: c.id, label: pick(c.name) }))].map((c) => {
            const count = c.id ? products.filter((p) => p.category === c.id).length : products.length;
            const active = search.cat === c.id;
            return (
              <button
                key={c.id ?? "all"}
                onClick={() => set({ cat: c.id })}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition",
                  active ? "bg-primary font-semibold text-primary-foreground" : "hover:bg-accent",
                )}
              >
                <span>{c.label}</span>
                <span className={cn("text-xs", active ? "text-primary-foreground/80" : "text-muted-foreground")}>{num(count)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t("price_range")}</h3>
        <Slider
          min={0}
          max={MAX_PRICE}
          step={500}
          value={range}
          onValueChange={(v) => setRange([v[0] ?? 0, v[1] ?? MAX_PRICE])}
          onValueCommit={([lo = 0, hi = MAX_PRICE]) => set({ min: lo > 0 ? lo : undefined, max: hi < MAX_PRICE ? hi : undefined })}
        />
        <div className="mt-3 flex justify-between text-sm font-medium">
          <span>{price(range[0])}</span>
          <span>{price(range[1])}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t("rating")}</h3>
        <div className="flex flex-col gap-1">
          {[4.5, 4, 3].map((r) => (
            <button
              key={r}
              onClick={() => set({ rating: search.rating === r ? undefined : r })}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
                search.rating === r ? "bg-accent font-semibold text-accent-foreground ring-1 ring-primary/40" : "hover:bg-accent",
              )}
            >
              <Star className="h-4 w-4 fill-gold text-gold" />
              {num(r)} {t("and_up")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const { t, num } = useLang();
  const [q, setQ] = useState(search.q ?? "");
  useEffect(() => setQ(search.q ?? ""), [search.q]);

  const set = (patch: Partial<ShopSearch>) =>
    navigate({ search: (prev: ShopSearch) => ({ ...prev, ...patch, page: undefined }), replace: true });

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        matchesQuery(p, search.q ?? "") &&
        (!search.cat || p.category === search.cat) &&
        p.price >= (search.min ?? 0) &&
        p.price <= (search.max ?? Infinity) &&
        p.rating >= (search.rating ?? 0),
    );
    const sort = search.sort ?? "newest";
    list = [...list].sort((a, b) =>
      sort === "price_asc" ? a.price - b.price : sort === "price_desc" ? b.price - a.price : b.added - a.added,
    );
    return list;
  }, [search]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, search.page ?? 1), pages);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasFilters = Boolean(search.q || search.cat || search.min || search.max || search.rating);

  const goPage = (p: number) => {
    navigate({ search: (prev: ShopSearch) => ({ ...prev, page: p > 1 ? p : undefined }) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container-shop py-8 md:py-12">
      <div className="mb-8 rounded-3xl bg-gradient-primary p-6 md:p-10">
        <h1 className="text-3xl font-bold text-hero-foreground md:text-4xl">{t("nav_shop")}</h1>
        <div className="relative mt-5 max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              set({ q: e.target.value || undefined });
            }}
            placeholder={t("search_placeholder")}
            aria-label={t("search_placeholder")}
            className="h-12 w-full rounded-full border-0 bg-background pl-11 pr-4 text-sm text-foreground shadow-card outline-none focus:ring-4 focus:ring-gold/40"
          />
        </div>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-28 rounded-2xl border bg-card p-5">
            <Filters search={search} set={set} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="rounded-full lg:hidden">
                    <SlidersHorizontal /> {t("filters")}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>{t("filters")}</SheetTitle>
                  </SheetHeader>
                  <div className="px-4 pb-8">
                    <Filters search={search} set={set} />
                  </div>
                </SheetContent>
              </Sheet>
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">{num(filtered.length)}</strong> {t("results")}
              </span>
              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-primary"
                  onClick={() => navigate({ search: { sort: search.sort }, replace: true })}
                >
                  <X /> {t("clear_filters")}
                </Button>
              )}
            </div>
            <Select value={search.sort ?? "newest"} onValueChange={(v) => set({ sort: v as Sort })}>
              <SelectTrigger className="w-52 rounded-full" aria-label={t("sort_by")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t("sort_newest")}</SelectItem>
                <SelectItem value="price_asc">{t("sort_low")}</SelectItem>
                <SelectItem value="price_desc">{t("sort_high")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {visible.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed py-20 text-center">
              <Search className="h-10 w-10 text-muted-foreground" />
              <p className="font-medium">{t("no_results")}</p>
              <Button variant="outline" className="rounded-full" onClick={() => navigate({ search: {} })}>
                {t("clear_filters")}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:gap-5 xl:grid-cols-4 lg:grid-cols-3">
              {visible.map((p, idx) => (
                <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${idx * 40}ms` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}

          {pages > 1 && (
            <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
              <Button variant="outline" size="sm" className="rounded-full" disabled={page === 1} onClick={() => goPage(page - 1)}>
                <ChevronLeft /> {t("prev")}
              </Button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={p === page ? "default" : "outline"}
                  size="icon"
                  className="rounded-full"
                  onClick={() => goPage(p)}
                  aria-current={p === page ? "page" : undefined}
                >
                  {num(p)}
                </Button>
              ))}
              <Button variant="outline" size="sm" className="rounded-full" disabled={page === pages} onClick={() => goPage(page + 1)}>
                {t("next")} <ChevronRight />
              </Button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
