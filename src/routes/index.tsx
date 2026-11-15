import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  Headphones,
  LayoutTemplate,
  Megaphone,
  Package,
  Palette,
  Quote,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useEffect, useState, type ComponentType } from "react";
import heroTemplates from "@/assets/hero-templates.jpg";
import heroAssets from "@/assets/hero-assets.jpg";
import heroServices from "@/assets/hero-services.jpg";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/shop/Countdown";
import { ProductCard } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/shop/Reveal";
import { SectionHeading } from "@/components/shop/SectionHeading";
import { Stars } from "@/components/shop/Stars";
import { useLang, type Bi } from "@/lib/i18n";
import { categories, products, type CategoryId } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shalbon Mart — Website Templates, Software & IT Services" },
      {
        name: "description",
        content:
          "Buy premium website templates, business software, design asset bundles and custom IT services from Shalbon Mart, Bangladesh.",
      },
      { property: "og:title", content: "Shalbon Mart — Website Templates, Software & IT Services" },
      {
        property: "og:description",
        content: "Premium templates, software, asset bundles and IT services with fast delivery in Bangladesh.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const slides: { img: string; tag: Bi; title: Bi; sub: Bi; cat?: CategoryId }[] = [
  {
    img: heroTemplates,
    tag: { bn: "নতুন কালেকশন — ৩৫% পর্যন্ত ছাড়", en: "New collection — up to 35% off" },
    title: { bn: "প্রিমিয়াম ওয়েবসাইট টেমপ্লেট, এক ক্লিকে লঞ্চ", en: "Premium website templates, launch in one click" },
    sub: {
      bn: "React, TypeScript ও Tailwind দিয়ে তৈরি দ্রুত, সুন্দর ও মোবাইল-ফ্রেন্ডলি টেমপ্লেট।",
      en: "Fast, beautiful, mobile-friendly templates built with React, TypeScript and Tailwind.",
    },
    cat: "templates",
  },
  {
    img: heroServices,
    tag: { bn: "কাস্টম আইটি সার্ভিস", en: "Custom IT services" },
    title: { bn: "আপনার আইডিয়া, আমাদের কোড", en: "Your idea, our code" },
    sub: {
      bn: "ওয়েবসাইট, সফটওয়্যার ও মোবাইল অ্যাপ — অভিজ্ঞ টিম দিয়ে সময়মতো ডেলিভারি।",
      en: "Websites, software and mobile apps — delivered on time by an experienced team.",
    },
    cat: "development",
  },
  {
    img: heroAssets,
    tag: { bn: "ফ্ল্যাশ সেল চলছে", en: "Flash sale live" },
    title: { bn: "ডিজাইন অ্যাসেট বান্ডেল ৳৯৫০ থেকে শুরু", en: "Design asset bundles from ৳950" },
    sub: {
      bn: "আইকন, ৩ডি ইলাস্ট্রেশন ও সোশ্যাল মিডিয়া টেমপ্লেট — কমার্শিয়াল লাইসেন্সসহ।",
      en: "Icons, 3D illustrations and social media templates — with commercial license.",
    },
    cat: "assets",
  },
];

const catIcons: Record<CategoryId, ComponentType<{ className?: string }>> = {
  templates: LayoutTemplate,
  software: Cpu,
  assets: Package,
  development: Code2,
  marketing: Megaphone,
  design: Palette,
};

const testimonials: { name: string; role: Bi; text: Bi; rating: number }[] = [
  {
    name: "Rafiul Islam",
    role: { bn: "মালিক, ফ্রেশ বাজার", en: "Owner, Fresh Bazar" },
    text: {
      bn: "POS সফটওয়্যারটা আমাদের দোকানের হিসাব একদম সহজ করে দিয়েছে। সেটআপ আর ট্রেনিং দুটোই ছিল দারুণ।",
      en: "The POS software made our shop's accounting effortless. Setup and training were both excellent.",
    },
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: { bn: "ফাউন্ডার, নুর ফ্যাশন", en: "Founder, Noor Fashion" },
    text: {
      bn: "ই-কমার্স টেমপ্লেট কিনে ২ দিনের মধ্যে আমার অনলাইন শপ লাইভ! সাপোর্ট টিম খুবই আন্তরিক।",
      en: "Bought the e-commerce template and my online shop was live in 2 days! The support team is very helpful.",
    },
    rating: 5,
  },
  {
    name: "Tanvir Ahmed",
    role: { bn: "প্রিন্সিপাল, আইডিয়াল স্কুল", en: "Principal, Ideal School" },
    text: {
      bn: "স্কুল ম্যানেজমেন্ট সফটওয়্যার দিয়ে এখন রেজাল্ট আর ফি — সব অনলাইনে। অভিভাবকরাও খুশি।",
      en: "With the school management software, results and fees are all online now. Parents are happy too.",
    },
    rating: 5,
  },
];

function Hero() {
  const { pick, t } = useLang();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [i]);

  return (
    <section className="container-shop pt-4 md:pt-6">
      <div className="relative h-[460px] overflow-hidden rounded-3xl bg-hero shadow-card md:h-[540px]">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              idx === i ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-hidden={idx !== i}
          >
            <img
              src={s.img}
              alt=""
              width={1600}
              height={800}
              loading={idx === 0 ? "eager" : "lazy"}
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-[70%_center] transition-transform duration-[7000ms]",
                idx === i ? "scale-105" : "scale-100",
              )}
            />
            <div className="absolute inset-0 bg-gradient-hero-fade" />
            <div className="absolute inset-0 bg-gradient-to-t from-hero/80 via-transparent to-transparent md:hidden" />
            {idx === i && (
              <div className="relative flex h-full max-w-2xl flex-col justify-end gap-5 p-6 pb-20 md:justify-center md:p-14">
                <span className="w-fit animate-fade-up rounded-full border border-hero-foreground/25 bg-hero-foreground/10 px-4 py-1.5 text-xs font-semibold text-hero-foreground backdrop-blur md:text-sm">
                  {pick(s.tag)}
                </span>
                <h1
                  className="animate-fade-up text-3xl font-extrabold leading-tight text-hero-foreground md:text-5xl lg:text-6xl"
                  style={{ animationDelay: "100ms" }}
                >
                  {pick(s.title)}
                </h1>
                <p
                  className="max-w-lg animate-fade-up text-sm text-hero-foreground/80 md:text-lg"
                  style={{ animationDelay: "200ms" }}
                >
                  {pick(s.sub)}
                </p>
                <div className="flex animate-fade-up flex-wrap gap-3" style={{ animationDelay: "300ms" }}>
                  <Button asChild variant="hero" size="xl">
                    <Link to="/shop" search={{ cat: s.cat }}>
                      {t("shop_now")} <ArrowRight />
                    </Link>
                  </Button>
                  <Button asChild variant="glass" size="xl" className="hidden sm:inline-flex">
                    <Link to="/shop">{t("explore")}</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="absolute bottom-12 left-6 flex gap-2 md:bottom-12 md:left-14">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={cn(
                "h-2 rounded-full bg-hero-foreground transition-all",
                idx === i ? "w-8" : "w-2 opacity-40 hover:opacity-70",
              )}
            />
          ))}
        </div>
        <div className="absolute right-5 top-5 hidden gap-2 md:flex">
          <Button variant="glass" size="icon" className="rounded-full" aria-label="Previous slide" onClick={() => setI((i - 1 + slides.length) % slides.length)}>
            <ChevronLeft />
          </Button>
          <Button variant="glass" size="icon" className="rounded-full" aria-label="Next slide" onClick={() => setI((i + 1) % slides.length)}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const { t, num } = useLang();
  const stats = [
    { v: `${num(2500)}+`, l: t("happy_customers") },
    { v: `${num(850)}+`, l: t("products_count") },
    { v: num(64), l: t("districts_count") },
    { v: "4.9★", l: t("rating") },
  ];
  return (
    <section className="container-shop -mt-8 relative z-10">
      <div className="mx-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border shadow-card md:mx-12 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="bg-card px-4 py-5 text-center">
            <div className="font-display text-2xl font-bold text-primary md:text-3xl">{s.v}</div>
            <div className="text-xs text-muted-foreground md:text-sm">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const { t, pick, num } = useLang();
  return (
    <section className="container-shop mt-20">
      <Reveal>
        <SectionHeading title={t("categories")} sub={t("categories_sub")} viewAll />
      </Reveal>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-6">
        {categories.map((c, idx) => {
          const Icon = catIcons[c.id];
          const count = products.filter((p) => p.category === c.id).length;
          return (
            <Reveal key={c.id} delay={idx * 60}>
              <Link
                to="/shop"
                search={{ cat: c.id }}
                className="group flex h-full flex-col items-center gap-3 rounded-2xl border bg-card p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary transition-all duration-300 group-hover:rotate-6 group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-semibold leading-tight">{pick(c.name)}</span>
                <span className="text-xs text-muted-foreground">
                  {num(count)} {t("items")}
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Trending() {
  const { t } = useLang();
  const list = products.filter((p) => p.trending).slice(0, 8);
  return (
    <section className="container-shop mt-20">
      <Reveal>
        <SectionHeading title={t("trending")} sub={t("trending_sub")} viewAll />
      </Reveal>
      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {list.map((p, idx) => (
          <Reveal key={p.id} delay={(idx % 4) * 70}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FlashSale() {
  const { t } = useLang();
  const list = products.filter((p) => p.flash);
  return (
    <section className="container-shop mt-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-6 md:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-60 w-60 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-foreground">
                <Zap className="h-3.5 w-3.5" /> {t("flash_sale")}
              </span>
              <h2 className="text-2xl font-bold text-hero-foreground md:text-4xl">{t("flash_sub")}</h2>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-hero-foreground/70">{t("ends_in")}</span>
              <Countdown />
            </div>
          </div>
          <div className="relative -mx-6 flex snap-x gap-4 overflow-x-auto px-6 pb-2 no-scrollbar md:mx-0 md:grid md:grid-cols-4 md:px-0">
            {list.map((p) => (
              <div key={p.id} className="w-[70%] shrink-0 snap-start sm:w-[45%] md:w-auto">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function WhyUs() {
  const { t } = useLang();
  const items = [
    { icon: Zap, title: t("why_fast"), d: t("why_fast_d") },
    { icon: ShieldCheck, title: t("why_cod"), d: t("why_cod_d") },
    { icon: BadgeCheck, title: t("why_genuine"), d: t("why_genuine_d") },
    { icon: Headphones, title: t("why_return"), d: t("why_return_d") },
  ];
  return (
    <section className="container-shop mt-20">
      <Reveal>
        <div className="mb-10 text-center">
          <span className="mx-auto mb-3 block h-1 w-12 rounded-full bg-gradient-primary" />
          <h2 className="text-2xl font-bold md:text-4xl">{t("why_us")}</h2>
          <p className="mt-2 text-muted-foreground">{t("why_sub")}</p>
        </div>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, idx) => (
          <Reveal key={it.title} delay={idx * 80}>
            <div className="group h-full rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant transition-transform group-hover:scale-110">
                <it.icon className="h-6 w-6" />
              </span>
              <h3 className="mb-1.5 text-lg font-semibold">{it.title}</h3>
              <p className="text-sm text-muted-foreground">{it.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const { t, pick } = useLang();
  return (
    <section className="mt-20 bg-gradient-soft py-16">
      <div className="container-shop">
        <Reveal>
          <SectionHeading title={t("testimonials")} />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((r, idx) => (
            <Reveal key={r.name} delay={idx * 90}>
              <figure className="relative h-full rounded-2xl border bg-card p-6 shadow-soft">
                <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/15" />
                <Stars value={r.rating} />
                <blockquote className="mt-4 text-sm leading-relaxed">“{pick(r.text)}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary font-semibold text-primary-foreground">
                    {r.name[0]}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{r.name}</span>
                    <span className="block text-xs text-muted-foreground">{pick(r.role)}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomCta() {
  const { t } = useLang();
  return (
    <section className="container-shop mt-20">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border bg-card p-8 shadow-soft md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">{t("cta_title")}</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">{t("cta_sub")}</p>
          </div>
          <Button asChild variant="premium" size="xl">
            <Link to="/shop" search={{ cat: "development" }}>
              {t("cta_btn")} <ArrowRight />
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Categories />
      <Trending />
      <FlashSale />
      <WhyUs />
      <Testimonials />
      <CustomCta />
    </>
  );
}
