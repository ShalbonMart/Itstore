import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

/** Counts down to the end of the current flash sale (resets every 3 days). */
function nextDeadline(now: number) {
  const period = 3 * 24 * 60 * 60 * 1000;
  return Math.ceil(now / period) * period;
}

export function Countdown() {
  const { t, lang } = useLang();
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, nextDeadline(Date.now()) - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const s = Math.floor((left ?? 0) / 1000);
  const parts = [
    { v: Math.floor(s / 86400), l: t("days") },
    { v: Math.floor((s % 86400) / 3600), l: t("hours") },
    { v: Math.floor((s % 3600) / 60), l: t("minutes") },
    { v: s % 60, l: t("seconds") },
  ];
  const fmt = (n: number) => {
    const str = left === null ? "--" : String(n).padStart(2, "0");
    return lang === "bn" ? str.replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)] ?? d) : str;
  };

  return (
    <div className="flex gap-2 sm:gap-3">
      {parts.map((p) => (
        <div
          key={p.l}
          className="flex min-w-14 flex-col items-center rounded-xl bg-hero-foreground/10 px-2 py-2 backdrop-blur sm:min-w-16"
        >
          <span className="font-display text-2xl font-bold tabular-nums text-hero-foreground sm:text-3xl">{fmt(p.v)}</span>
          <span className="text-[10px] uppercase tracking-wider text-hero-foreground/70">{p.l}</span>
        </div>
      ))}
    </div>
  );
}
