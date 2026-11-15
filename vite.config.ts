import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const onVercel = !!process.env.VERCEL;

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  ...(onVercel ? { nitro: { preset: "vercel" } } : {}),
});
