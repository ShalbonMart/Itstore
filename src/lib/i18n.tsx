import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "bn" | "en";

export type Bi = { bn: string; en: string };

const dict = {
  nav_home: { bn: "হোম", en: "Home" },
  nav_shop: { bn: "শপ", en: "Shop" },
  nav_cart: { bn: "কার্ট", en: "Cart" },
  search_placeholder: { bn: "টেমপ্লেট, সফটওয়্যার, সার্ভিস খুঁজুন...", en: "Search templates, software, services..." },
  shop_now: { bn: "এখনই কিনুন", en: "Shop Now" },
  explore: { bn: "সব সার্ভিস দেখুন", en: "Explore services" },
  view_all: { bn: "সব দেখুন", en: "View all" },
  categories: { bn: "জনপ্রিয় ক্যাটাগরি", en: "Featured Categories" },
  categories_sub: { bn: "আপনার ডিজিটাল ব্যবসার সবকিছু এক জায়গায়", en: "Everything your digital business needs, in one place" },
  items: { bn: "টি আইটেম", en: "items" },
  trending: { bn: "ট্রেন্ডিং প্রোডাক্ট ও সার্ভিস", en: "Trending Products & Services" },
  trending_sub: { bn: "এই সপ্তাহে সবচেয়ে বেশি বিক্রি", en: "Best sellers this week" },
  flash_sale: { bn: "ফ্ল্যাশ সেল", en: "Flash Sale" },
  flash_sub: { bn: "সীমিত সময়ের অফার — দেরি করবেন না!", en: "Limited-time deals — don't miss out!" },
  ends_in: { bn: "শেষ হবে", en: "Ends in" },
  days: { bn: "দিন", en: "Days" },
  hours: { bn: "ঘণ্টা", en: "Hours" },
  minutes: { bn: "মিনিট", en: "Mins" },
  seconds: { bn: "সেকেন্ড", en: "Secs" },
  testimonials: { bn: "গ্রাহকরা যা বলছেন", en: "What Our Clients Say" },
  why_us: { bn: "কেন শালবন মার্ট?", en: "Why Shalbon Mart?" },
  why_sub: { bn: "বিশ্বাস আর মানের প্রতিশ্রুতি", en: "A promise of trust and quality" },
  why_fast: { bn: "দ্রুত ডেলিভারি", en: "Fast Delivery" },
  why_fast_d: { bn: "ডিজিটাল প্রোডাক্ট ১ ঘণ্টায়, সার্ভিস সময়মতো", en: "Digital products in 1 hour, services on schedule" },
  why_cod: { bn: "নিশ্চিত হয়ে পেমেন্ট", en: "Pay After Confirmation" },
  why_cod_d: { bn: "কল করে কনফার্ম করার পর বিকাশ/নগদ/ব্যাংকে পেমেন্ট", en: "Pay by bKash, Nagad or bank after we confirm" },
  why_genuine: { bn: "১০০% অরিজিনাল", en: "100% Genuine" },
  why_genuine_d: { bn: "নিজস্ব তৈরি, বৈধ কমার্শিয়াল লাইসেন্স", en: "Built in-house with valid commercial licenses" },
  why_return: { bn: "ডেডিকেটেড সাপোর্ট", en: "Dedicated Support" },
  why_return_d: { bn: "ফোন, হোয়াটসঅ্যাপ ও ইমেইলে সাহায্য", en: "Help via phone, WhatsApp and email" },
  add_to_cart: { bn: "কার্টে যোগ করুন", en: "Add to Cart" },
  added: { bn: "কার্টে যোগ হয়েছে", en: "Added to cart" },
  off: { bn: "ছাড়", en: "OFF" },
  filters: { bn: "ফিল্টার", en: "Filters" },
  category: { bn: "ক্যাটাগরি", en: "Category" },
  all: { bn: "সব", en: "All" },
  price_range: { bn: "দামের সীমা", en: "Price range" },
  rating: { bn: "রেটিং", en: "Rating" },
  and_up: { bn: "ও তার বেশি", en: "& up" },
  sort_by: { bn: "সাজান", en: "Sort by" },
  sort_newest: { bn: "নতুন আগে", en: "Newest" },
  sort_low: { bn: "দাম: কম থেকে বেশি", en: "Price: Low to High" },
  sort_high: { bn: "দাম: বেশি থেকে কম", en: "Price: High to Low" },
  results: { bn: "টি আইটেম পাওয়া গেছে", en: "items found" },
  no_results: { bn: "কিছু পাওয়া যায়নি", en: "Nothing found" },
  clear_filters: { bn: "ফিল্টার মুছুন", en: "Clear filters" },
  prev: { bn: "আগের", en: "Previous" },
  next: { bn: "পরের", en: "Next" },
  in_stock: { bn: "অ্যাভেইলেবল", en: "Available" },
  low_stock: { bn: "সীমিত স্লট বাকি", en: "Only a few slots left" },
  out_stock: { bn: "এখন অ্যাভেইলেবল নয়", en: "Currently unavailable" },
  quantity: { bn: "পরিমাণ / লাইসেন্স", en: "Quantity / licenses" },
  buy_now: { bn: "এখনই কিনুন", en: "Buy Now" },
  details: { bn: "বিস্তারিত", en: "Details" },
  delivery_info: { bn: "ডেলিভারি তথ্য", en: "Delivery Info" },
  whats_included: { bn: "যা যা পাচ্ছেন", en: "What's included" },
  related: { bn: "সম্পর্কিত আইটেম", en: "Related Items" },
  reviews: { bn: "রিভিউ", en: "reviews" },
  your_cart: { bn: "আপনার কার্ট", en: "Your Cart" },
  cart_empty: { bn: "আপনার কার্ট খালি", en: "Your cart is empty" },
  cart_empty_d: { bn: "পছন্দের টেমপ্লেট বা সার্ভিস কার্টে যোগ করুন।", en: "Add templates or services you love to get started." },
  continue_shopping: { bn: "কেনাকাটা চালিয়ে যান", en: "Continue shopping" },
  remove: { bn: "মুছুন", en: "Remove" },
  subtotal: { bn: "সাবটোটাল", en: "Subtotal" },
  delivery_charge: { bn: "ডেলিভারি চার্জ", en: "Delivery charge" },
  free: { bn: "ফ্রি (ডিজিটাল)", en: "Free (digital)" },
  total: { bn: "সর্বমোট", en: "Total" },
  checkout: { bn: "চেকআউট", en: "Checkout" },
  shipping_info: { bn: "আপনার তথ্য", en: "Your details" },
  full_name: { bn: "পূর্ণ নাম", en: "Full name" },
  phone: { bn: "মোবাইল নম্বর", en: "Phone number" },
  email: { bn: "ইমেইল (ডাউনলোড লিংকের জন্য)", en: "Email (for download links)" },
  address: { bn: "ঠিকানা / প্রতিষ্ঠানের নাম", en: "Address / company name" },
  district: { bn: "জেলা", en: "District" },
  select_district: { bn: "জেলা নির্বাচন করুন", en: "Select district" },
  notes: { bn: "প্রজেক্ট নোট (ঐচ্ছিক)", en: "Project notes (optional)" },
  notes_ph: { bn: "আপনার প্রয়োজন সংক্ষেপে লিখুন...", en: "Briefly describe what you need..." },
  payment_method: { bn: "পেমেন্ট পদ্ধতি", en: "Payment method" },
  pay_note: { bn: "অর্ডারের পর আমরা কল করে কনফার্ম করব, তারপর পেমেন্ট তথ্য পাঠাব।", en: "We'll call to confirm your order, then send payment details." },
  pay_bkash: { bn: "বিকাশ", en: "bKash" },
  pay_nagad: { bn: "নগদ", en: "Nagad" },
  pay_bank: { bn: "ব্যাংক ট্রান্সফার", en: "Bank transfer" },
  place_order: { bn: "অর্ডার নিশ্চিত করুন", en: "Confirm Order" },
  placing: { bn: "অর্ডার হচ্ছে...", en: "Placing order..." },
  order_summary: { bn: "অর্ডার সারাংশ", en: "Order summary" },
  order_success: { bn: "অর্ডার সফল হয়েছে!", en: "Order placed successfully!" },
  order_success_d: { bn: "ধন্যবাদ! আমাদের প্রতিনিধি শীঘ্রই আপনাকে কল করে অর্ডার নিশ্চিত করবেন।", en: "Thank you! Our team will call you shortly to confirm your order." },
  order_id: { bn: "অর্ডার আইডি", en: "Order ID" },
  order_failed: { bn: "অর্ডার করা যায়নি, আবার চেষ্টা করুন", en: "Could not place order, please try again" },
  err_name: { bn: "নাম লিখুন (কমপক্ষে ৩ অক্ষর)", en: "Enter your name (min 3 characters)" },
  err_phone: { bn: "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (01XXXXXXXXX)", en: "Enter a valid 11-digit number (01XXXXXXXXX)" },
  err_email: { bn: "সঠিক ইমেইল দিন", en: "Enter a valid email" },
  err_address: { bn: "ঠিকানা লিখুন", en: "Enter your address" },
  err_district: { bn: "জেলা নির্বাচন করুন", en: "Please select a district" },
  footer_about: { bn: "শালবন মার্ট — ওয়েবসাইট টেমপ্লেট, সফটওয়্যার, অ্যাসেট বান্ডেল ও আইটি সার্ভিসের বিশ্বস্ত মার্কেটপ্লেস।", en: "Shalbon Mart — a trusted marketplace for website templates, software, asset bundles and IT services." },
  quick_links: { bn: "দ্রুত লিংক", en: "Quick links" },
  contact: { bn: "যোগাযোগ", en: "Contact" },
  rights: { bn: "সর্বস্বত্ব সংরক্ষিত", en: "All rights reserved" },
  top_note: { bn: "নতুন গ্রাহকদের জন্য সব টেমপ্লেটে ৩০% পর্যন্ত ছাড়", en: "Up to 30% off all templates for new customers" },
  home: { bn: "হোম", en: "Home" },
  happy_customers: { bn: "সন্তুষ্ট ক্লায়েন্ট", en: "Happy clients" },
  products_count: { bn: "প্রজেক্ট সম্পন্ন", en: "Projects delivered" },
  districts_count: { bn: "জেলায় ক্লায়েন্ট", en: "Districts served" },
  cta_title: { bn: "কাস্টম কিছু দরকার?", en: "Need something custom?" },
  cta_sub: { bn: "আপনার আইডিয়া বলুন — আমরা ওয়েবসাইট, সফটওয়্যার বা অ্যাপ বানিয়ে দেব।", en: "Tell us your idea — we'll build the website, software or app for you." },
  cta_btn: { bn: "কাস্টম সার্ভিস দেখুন", en: "See custom services" },
} satisfies Record<string, Bi>;

export type DictKey = keyof typeof dict;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (k: DictKey) => string;
  pick: (b: Bi) => string;
  num: (n: number) => string;
  price: (n: number) => string;
};

const LangContext = createContext<Ctx | null>(null);

const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
export function toBnDigits(s: string) {
  return s.replace(/[0-9]/g, (d) => bnDigits[Number(d)] ?? d);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("bn");

  useEffect(() => {
    const saved = localStorage.getItem("sm-lang");
    if (saved === "bn" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("sm-lang", l);
  }, []);

  const num = useCallback(
    (n: number) => {
      const s = n.toLocaleString("en-IN");
      return lang === "bn" ? toBnDigits(s) : s;
    },
    [lang],
  );

  const value: Ctx = {
    lang,
    setLang,
    toggle: () => setLang(lang === "bn" ? "en" : "bn"),
    t: (k) => dict[k][lang],
    pick: (b) => b[lang],
    num,
    price: (n) => `৳${num(n)}`,
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
