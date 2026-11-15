import { describe, expect, it } from "vitest";
import { orderInputSchema } from "@/lib/order-schema";
import { BD_PHONE_RE, discountPercent, orderTotal } from "@/lib/pricing";

describe("pricing rules", () => {
  it("rounds the discount badge percentage", () => {
    expect(discountPercent(3500, 5500)).toBe(36);
    expect(discountPercent(1000)).toBe(0);
  });

  it("totals the cart from price × quantity", () => {
    expect(orderTotal([{ price: 3500, qty: 2 }, { price: 950, qty: 1 }])).toBe(7950);
  });

  it("accepts only 11-digit Bangladeshi mobile numbers", () => {
    expect(BD_PHONE_RE.test("01712345678")).toBe(true);
    expect(BD_PHONE_RE.test("01212345678")).toBe(false);
    expect(BD_PHONE_RE.test("0171234567")).toBe(false);
  });

  it("rejects a checkout without a district", () => {
    const res = orderInputSchema.safeParse({
      name: "Mamun Khan",
      phone: "01712345678",
      email: "m@example.com",
      address: "Dhanmondi",
      district: "",
      payment: "bkash",
      items: [{ id: "pos-software", qty: 1 }],
    });
    expect(res.success).toBe(false);
  });
});
