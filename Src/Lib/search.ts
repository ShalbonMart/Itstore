import type { Product } from "./products";

export function matchesQuery(p: Product, q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  return [p.name.bn, p.name.en, p.short.bn, p.short.en, p.category].some((v) => v.toLowerCase().includes(s));
}
