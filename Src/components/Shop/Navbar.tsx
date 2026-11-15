import { Link } from "@tanstack/react-router";
import { Menu, Moon, ShoppingCart, Sparkles, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { SearchBox } from "./SearchBox";

export function Navbar() {
  const { t, lang, toggle: toggleLang, num } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/" as const, label: t("nav_home") },
    { to: "/shop" as const, label: t("nav_shop") },
    { to: "/cart" as const, label: t("nav_cart") },
  ];

  return (
    <>
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="container-shop flex h-9 items-center justify-center gap-2 text-xs font-medium sm:text-sm">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="truncate">{t("top_note")}</span>
        </div>
      </div>
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-background/85 backdrop-blur-xl transition-shadow",
          scrolled && "shadow-soft",
        )}
      >
        <div className="container-shop flex h-16 items-center gap-3 md:h-20 md:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                <Menu className="!h-5 !w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 px-4">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="rounded-xl px-4 py-3 font-medium hover:bg-accent"
                    activeProps={{ className: "bg-accent text-primary" }}
                    activeOptions={{ exact: true }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" aria-label="Shalbon Mart home">
            <Logo />
          </Link>

          <nav className="ml-4 hidden items-center gap-1 lg:flex">
            {links.slice(0, 2).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                activeProps={{ className: "!text-primary bg-accent" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <SearchBox className="hidden flex-1 md:block" />

          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLang}
              className="rounded-full font-semibold"
              aria-label="Switch language"
            >
              {lang === "bn" ? "EN" : "বাং"}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="!h-5 !w-5" /> : <Moon className="!h-5 !w-5" />}
            </Button>
            <Button asChild variant="ghost" size="icon" className="relative rounded-full" aria-label={t("nav_cart")}>
              <Link to="/cart">
                <ShoppingCart className="!h-5 !w-5" />
                {count > 0 && (
                  <span
                    key={count}
                    className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 animate-pop items-center justify-center rounded-full bg-sale px-1 text-[10px] font-bold text-sale-foreground"
                  >
                    {num(count)}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>
        <div className="container-shop pb-3 md:hidden">
          <SearchBox />
        </div>
      </header>
    </>
  );
}
