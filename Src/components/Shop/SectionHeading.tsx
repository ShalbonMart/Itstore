import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function SectionHeading({ title, sub, viewAll }: { title: string; sub?: string; viewAll?: boolean }) {
  const { t } = useLang();
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <span className="mb-2 block h-1 w-12 rounded-full bg-gradient-primary" />
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        {sub && <p className="mt-1 text-sm text-muted-foreground md:text-base">{sub}</p>}
      </div>
      {viewAll && (
        <Link
          to="/shop"
          className="group hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary sm:flex"
        >
          {t("view_all")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
