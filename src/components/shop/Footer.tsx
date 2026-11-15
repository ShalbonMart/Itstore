import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { categories } from "@/lib/products";
import { Logo } from "./Logo";

export function Footer() {
  const { t, pick } = useLang();
  return (
    <footer className="mt-24 border-t bg-secondary/50">
      <div className="container-shop grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm leading-relaxed text-muted-foreground">{t("footer_about")}</p>
          <div className="flex gap-2">
            {[Facebook, Youtube, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">{t("quick_links")}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">{t("nav_home")}</Link></li>
            <li><Link to="/shop" className="hover:text-primary">{t("nav_shop")}</Link></li>
            <li><Link to="/cart" className="hover:text-primary">{t("nav_cart")}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">{t("category")}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to="/shop" search={{ cat: c.id }} className="hover:text-primary">
                  {pick(c.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">{t("contact")}</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" /> Dhaka, Bangladesh</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" /> +880 1XXX-XXXXXX</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-primary" /> hello@shalbonmart.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container-shop flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Shalbon Mart. {t("rights")}.</span>
          <span>shalbonmart.com</span>
        </div>
      </div>
    </footer>
  );
}
