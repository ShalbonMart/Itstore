import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { discountPercent } from "@/lib/pricing";
import { getCategory, type Product } from "@/lib/products";
import { Stars } from "./Stars";

export function ProductCard({ product }: { product: Product }) {
  const { t, pick, price, num } = useLang();
  const { add } = useCart();
  const off = discountPercent(product.price, product.oldPrice);
  const soldOut = product.stock === 0;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-card">
      <Link to="/product/$id" params={{ id: product.id }} className="relative block aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={pick(product.name)}
          loading="lazy"
          width={816}
          height={816}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {off > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-sale px-2.5 py-1 text-xs font-bold text-sale-foreground shadow">
            -{num(off)}% {t("off")}
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary-deep/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
          {pick(getCategory(product.category).name)}
        </span>
        <Link to="/product/$id" params={{ id: product.id }} className="line-clamp-2 font-semibold leading-snug hover:text-primary">
          {pick(product.name)}
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Stars value={product.rating} />
          <span>({num(product.reviews)})</span>
        </div>
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="font-display text-lg font-bold text-primary">{price(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">{price(product.oldPrice)}</span>
          )}
        </div>
        <Button
          variant="soft"
          className="w-full rounded-full"
          disabled={soldOut}
          onClick={() => {
            add(product.id);
            toast.success(t("added"), { description: pick(product.name) });
          }}
        >
          <ShoppingBag /> {soldOut ? t("out_stock") : t("add_to_cart")}
        </Button>
      </div>
    </div>
  );
}
