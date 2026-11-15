/** Pricing rules shared by the cart page and the order server function. */

export function discountPercent(price: number, oldPrice?: number) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

/** Bangladeshi mobile number: 11 digits starting with 013–019. */
export const BD_PHONE_RE = /^01[3-9]\d{8}$/;

export type PriceLine = { price: number; qty: number };

export function orderTotal(lines: PriceLine[]) {
  return lines.reduce((sum, l) => sum + l.price * l.qty, 0);
}
