import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden>
      <rect width="40" height="40" rx="11" className="fill-primary" />
      <path
        d="M20 31c0-8 3-14 11-18-1 9-5 15-11 18Z"
        className="fill-primary-foreground"
        opacity="0.95"
      />
      <path d="M20 31c0-6-2.5-11-9-14 .5 7 3.5 12 9 14Z" className="fill-primary-foreground" opacity="0.6" />
      <path d="M20 31V18" className="stroke-primary" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight">
          Shalbon<span className="text-primary">Mart</span>
        </span>
        <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:block">
          Digital Marketplace
        </span>
      </span>
    </span>
  );
}
