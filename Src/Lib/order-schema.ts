import { z } from "zod";
import { BD_PHONE_RE } from "./pricing";

export const orderInputSchema = z.object({
  name: z.string().trim().min(3).max(80),
  phone: z.string().trim().regex(BD_PHONE_RE),
  email: z.string().trim().email().max(120),
  address: z.string().trim().min(3).max(300),
  district: z.string().trim().min(2).max(40),
  notes: z.string().trim().max(1000).optional().default(""),
  payment: z.enum(["bkash", "nagad", "bank"]),
  items: z
    .array(z.object({ id: z.string().min(1).max(80), qty: z.number().int().min(1).max(999) }))
    .min(1)
    .max(50),
});

export type OrderInput = z.infer<typeof orderInputSchema>;
