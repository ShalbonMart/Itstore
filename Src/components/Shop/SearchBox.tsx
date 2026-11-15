import { useNavigate, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { products } from "@/lib/products";
import { matchesQuery } from "@/lib/search";
import { cn } from "@/lib/utils";

export function SearchBox({ className }: { className?: string }) {
  const { t, pick, price } = useLang();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const hits = q.trim() ? products.filter((p) => matchesQuery(p, q)).slice(0, 5) : [];

  return (
    <form
      className={cn("relative", className)}
      onSubmit={(e) => {
        e.preventDefault();
        setOpen(false);
        navigate({ to: "/shop", search: { q: q.trim() || undefined } });
      }}
    >
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={t("search_placeholder")}
        aria-label={t("search_placeholder")}
        className="h-11 w-full rounded-full border border-input bg-muted/60 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10"
      />
      {open && hits.length > 0 && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border bg-popover shadow-card">
          {hits.map((p) => (
            <Link
              key={p.id}
              to="/product/$id"
              params={{ id: p.id }}
              onClick={() => {
                setQ("");
                setOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 transition hover:bg-accent"
            >
              <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" width={40} height={40} />
              <span className="line-clamp-1 flex-1 text-sm">{pick(p.name)}</span>
              <span className="text-sm font-semibold text-primary">{price(p.price)}</span>
            </Link>
          ))}
        </div>
      )}
    </form>
  );
}
