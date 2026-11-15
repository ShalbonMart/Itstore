import { createServerFn } from "@tanstack/react-start";
import { orderInputSchema } from "./order-schema";
import { orderTotal } from "./pricing";
import { getProduct } from "./products";

/**
 * Places a guest order. Prices are always re-read from the catalog on the server,
 * so a tampered cart can't change what the customer is charged.
 */
export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderInputSchema.parse(data))
  .handler(async ({ data }) => {
    const lines = data.items.map((i) => {
      const p = getProduct(i.id);
      if (!p) throw new Error(`Unknown product: ${i.id}`);
      if (p.stock < i.qty) throw new Error(`Not enough availability for ${p.name.en}`);
      return { id: p.id, name: p.name.en, price: p.price, qty: i.qty };
    });
    const total = orderTotal(lines);

    const now = new Date();
    const stamp = `${String(now.getUTCFullYear()).slice(2)}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(now.getUTCDate()).padStart(2, "0")}`;
    const rand = (crypto.getRandomValues(new Uint32Array(1))[0] ?? Date.now()).toString(36).toUpperCase().slice(0, 5).padStart(5, "0");
    const orderId = `SM-${stamp}-${rand}`;

    // No order storage is connected yet — orders are logged on the server only.
    console.log("[order]", JSON.stringify({ orderId, customer: { ...data, items: undefined }, lines, total }));

    return { orderId, total };
  });
