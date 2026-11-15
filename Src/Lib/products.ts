import type { Bi } from "./i18n";
import ecommerceTemplate from "@/assets/products/ecommerce-template.jpg";
import corporateTemplate from "@/assets/products/corporate-template.jpg";
import restaurantTemplate from "@/assets/products/restaurant-template.jpg";
import posSoftware from "@/assets/products/pos-software.jpg";
import schoolSoftware from "@/assets/products/school-software.jpg";
import inventorySoftware from "@/assets/products/inventory-software.jpg";
import iconPack from "@/assets/products/icon-pack.jpg";
import socialBundle from "@/assets/products/social-bundle.jpg";
import illustrationBundle from "@/assets/products/illustration-bundle.jpg";
import webDevelopment from "@/assets/products/web-development.jpg";
import seoMarketing from "@/assets/products/seo-marketing.jpg";
import mobileApp from "@/assets/products/mobile-app.jpg";
import branding from "@/assets/products/branding.jpg";

export type CategoryId = "templates" | "software" | "assets" | "development" | "marketing" | "design";

export type Category = { id: CategoryId; name: Bi; desc: Bi };

export const categories: Category[] = [
  { id: "templates", name: { bn: "ওয়েবসাইট টেমপ্লেট", en: "Website Templates" }, desc: { bn: "রেডি-টু-লঞ্চ ডিজাইন", en: "Ready-to-launch designs" } },
  { id: "software", name: { bn: "সফটওয়্যার", en: "Software" }, desc: { bn: "ব্যবসার জন্য সমাধান", en: "Business solutions" } },
  { id: "assets", name: { bn: "অ্যাসেট বান্ডেল", en: "Asset Bundles" }, desc: { bn: "আইকন, গ্রাফিক্স, টেমপ্লেট", en: "Icons, graphics, kits" } },
  { id: "development", name: { bn: "ওয়েব ও অ্যাপ ডেভেলপমেন্ট", en: "Web & App Development" }, desc: { bn: "কাস্টম বিল্ড সার্ভিস", en: "Custom build services" } },
  { id: "marketing", name: { bn: "ডিজিটাল মার্কেটিং", en: "Digital Marketing" }, desc: { bn: "SEO ও গ্রোথ", en: "SEO & growth" } },
  { id: "design", name: { bn: "ব্র্যান্ডিং ও ডিজাইন", en: "Branding & Design" }, desc: { bn: "লোগো ও আইডেন্টিটি", en: "Logo & identity" } },
];

export type Product = {
  id: string;
  name: Bi;
  category: CategoryId;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  /** Licenses / service slots available. 0 = sold out. */
  stock: number;
  image: string;
  /** Higher = newer. */
  added: number;
  short: Bi;
  description: Bi;
  features: Bi[];
  delivery: Bi;
  trending?: boolean;
  flash?: boolean;
};

const instant: Bi = {
  bn: "পেমেন্ট নিশ্চিত হওয়ার পর ইমেইল ও হোয়াটসঅ্যাপে ডাউনলোড লিংক পাঠানো হবে (সাধারণত ১ ঘণ্টার মধ্যে)। ৬ মাস ফ্রি আপডেট ও সাপোর্ট।",
  en: "Download link sent to your email & WhatsApp once payment is confirmed (usually within 1 hour). Includes 6 months of free updates & support.",
};

export const products: Product[] = [
  {
    id: "ecommerce-website-template",
    name: { bn: "ই-কমার্স ওয়েবসাইট টেমপ্লেট (React)", en: "E-commerce Website Template (React)" },
    category: "templates",
    price: 3500,
    oldPrice: 5500,
    rating: 4.9,
    reviews: 214,
    stock: 50,
    image: ecommerceTemplate,
    added: 13,
    short: { bn: "শপ, কার্ট ও চেকআউটসহ সম্পূর্ণ অনলাইন স্টোর টেমপ্লেট।", en: "Complete online store template with shop, cart & checkout." },
    description: {
      bn: "React + TypeScript + Tailwind দিয়ে তৈরি দ্রুত ও মোবাইল-ফ্রেন্ডলি ই-কমার্স টেমপ্লেট। প্রোডাক্ট লিস্টিং, ফিল্টার, কার্ট, চেকআউট ও বাংলা/ইংরেজি সাপোর্টসহ।",
      en: "A fast, mobile-friendly e-commerce template built with React, TypeScript and Tailwind. Includes product listing, filters, cart, checkout and Bangla/English support.",
    },
    features: [
      { bn: "২০+ রেডি পেজ", en: "20+ ready pages" },
      { bn: "ডার্ক/লাইট মোড", en: "Dark/light mode" },
      { bn: "SEO অপটিমাইজড", en: "SEO optimized" },
      { bn: "Vercel-এ এক ক্লিকে ডিপ্লয়", en: "One-click Vercel deploy" },
    ],
    delivery: instant,
    trending: true,
    flash: true,
  },
  {
    id: "corporate-business-template",
    name: { bn: "কর্পোরেট বিজনেস টেমপ্লেট", en: "Corporate Business Template" },
    category: "templates",
    price: 2800,
    oldPrice: 4000,
    rating: 4.8,
    reviews: 167,
    stock: 50,
    image: corporateTemplate,
    added: 11,
    short: { bn: "এজেন্সি ও কোম্পানির জন্য প্রফেশনাল ওয়েবসাইট।", en: "Professional website for agencies & companies." },
    description: {
      bn: "আইটি ফার্ম, এজেন্সি ও কর্পোরেট প্রতিষ্ঠানের জন্য বোল্ড হিরো, সার্ভিস, পোর্টফোলিও ও কন্টাক্ট সেকশনসহ ক্লিন টেমপ্লেট।",
      en: "A clean template for IT firms, agencies and corporates with bold hero, services, portfolio and contact sections.",
    },
    features: [
      { bn: "১২টি পেজ", en: "12 pages" },
      { bn: "স্মুথ অ্যানিমেশন", en: "Smooth animations" },
      { bn: "কন্টাক্ট ফর্ম", en: "Contact form" },
      { bn: "ফুল রেসপন্সিভ", en: "Fully responsive" },
    ],
    delivery: instant,
    trending: true,
  },
  {
    id: "restaurant-website-template",
    name: { bn: "রেস্টুরেন্ট ওয়েবসাইট টেমপ্লেট", en: "Restaurant Website Template" },
    category: "templates",
    price: 2500,
    oldPrice: 3200,
    rating: 4.7,
    reviews: 98,
    stock: 50,
    image: restaurantTemplate,
    added: 8,
    short: { bn: "মেনু ও অনলাইন অর্ডারসহ রেস্টুরেন্ট সাইট।", en: "Restaurant site with menu & online ordering." },
    description: {
      bn: "রেস্টুরেন্ট, ক্যাফে ও ফুড ব্র্যান্ডের জন্য আকর্ষণীয় টেমপ্লেট — মেনু, টেবিল বুকিং ও অর্ডার ফিচারসহ।",
      en: "An appetizing template for restaurants, cafes and food brands — with menu, table booking and ordering.",
    },
    features: [
      { bn: "ডাইনামিক মেনু", en: "Dynamic menu" },
      { bn: "টেবিল বুকিং", en: "Table booking" },
      { bn: "গ্যালারি", en: "Gallery" },
      { bn: "গুগল ম্যাপ", en: "Google Maps" },
    ],
    delivery: instant,
  },
  {
    id: "pos-software",
    name: { bn: "POS সফটওয়্যার (দোকান ও সুপারশপ)", en: "POS Software (Retail & Supershop)" },
    category: "software",
    price: 15000,
    oldPrice: 22000,
    rating: 4.9,
    reviews: 132,
    stock: 20,
    image: posSoftware,
    added: 12,
    short: { bn: "বিলিং, বারকোড ও স্টক — সব এক সফটওয়্যারে।", en: "Billing, barcode & stock — all in one." },
    description: {
      bn: "দোকান, ফার্মেসি ও সুপারশপের জন্য দ্রুত পয়েন্ট-অব-সেল সফটওয়্যার। বারকোড স্ক্যান, রিসিট প্রিন্ট, স্টক অ্যালার্ট ও দৈনিক রিপোর্ট।",
      en: "Fast point-of-sale software for shops, pharmacies and supershops. Barcode scanning, receipt printing, stock alerts and daily reports.",
    },
    features: [
      { bn: "অফলাইন মোড", en: "Offline mode" },
      { bn: "মাল্টি-ব্রাঞ্চ", en: "Multi-branch" },
      { bn: "বাংলা রিসিট", en: "Bangla receipts" },
      { bn: "১ বছর ফ্রি সাপোর্ট", en: "1 year free support" },
    ],
    delivery: {
      bn: "অর্ডার নিশ্চিত হওয়ার ২৪ ঘণ্টার মধ্যে আমাদের টিম ইনস্টল ও সেটআপ করে দেবে, সাথে ফ্রি ট্রেনিং।",
      en: "Our team installs and sets everything up within 24 hours of confirmation, with free training.",
    },
    trending: true,
    flash: true,
  },
  {
    id: "school-management-software",
    name: { bn: "স্কুল ম্যানেজমেন্ট সফটওয়্যার", en: "School Management Software" },
    category: "software",
    price: 25000,
    oldPrice: 32000,
    rating: 4.8,
    reviews: 76,
    stock: 15,
    image: schoolSoftware,
    added: 9,
    short: { bn: "হাজিরা, ফলাফল ও ফি — সহজ ব্যবস্থাপনা।", en: "Attendance, results & fees made simple." },
    description: {
      bn: "স্কুল, কলেজ ও মাদ্রাসার জন্য সম্পূর্ণ ম্যানেজমেন্ট সিস্টেম — শিক্ষার্থী তথ্য, হাজিরা, পরীক্ষা, ফলাফল, ফি কালেকশন ও SMS নোটিফিকেশন।",
      en: "Complete management system for schools, colleges and madrasas — student records, attendance, exams, results, fee collection and SMS alerts.",
    },
    features: [
      { bn: "SMS নোটিফিকেশন", en: "SMS alerts" },
      { bn: "অনলাইন রেজাল্ট", en: "Online results" },
      { bn: "প্যারেন্ট পোর্টাল", en: "Parent portal" },
      { bn: "ক্লাউড ব্যাকআপ", en: "Cloud backup" },
    ],
    delivery: {
      bn: "৩-৫ কর্মদিবসের মধ্যে আপনার প্রতিষ্ঠানের নাম ও লোগো দিয়ে কাস্টমাইজ করে চালু করা হবে।",
      en: "Customized with your institution's name and logo and launched within 3–5 working days.",
    },
    trending: true,
  },
  {
    id: "inventory-accounting-software",
    name: { bn: "ইনভেন্টরি ও অ্যাকাউন্টিং সফটওয়্যার", en: "Inventory & Accounting Software" },
    category: "software",
    price: 18000,
    rating: 4.6,
    reviews: 54,
    stock: 3,
    image: inventorySoftware,
    added: 6,
    short: { bn: "স্টক, ইনভয়েস ও হিসাব এক ড্যাশবোর্ডে।", en: "Stock, invoices & accounts in one dashboard." },
    description: {
      bn: "হোলসেল ও ডিস্ট্রিবিউশন ব্যবসার জন্য ক্লাউড-বেসড ইনভেন্টরি ও অ্যাকাউন্টিং — ক্রয়, বিক্রয়, বাকি হিসাব ও লাভ-ক্ষতি রিপোর্ট।",
      en: "Cloud-based inventory and accounting for wholesale and distribution — purchases, sales, dues and profit & loss reports.",
    },
    features: [
      { bn: "মোবাইল অ্যাপ", en: "Mobile app" },
      { bn: "বাকি হিসাব", en: "Due tracking" },
      { bn: "P&L রিপোর্ট", en: "P&L reports" },
      { bn: "ইউজার রোল", en: "User roles" },
    ],
    delivery: {
      bn: "পেমেন্টের পর ২৪ ঘণ্টার মধ্যে অ্যাকাউন্ট চালু ও লগইন তথ্য পাঠানো হবে।",
      en: "Account activated and login details sent within 24 hours of payment.",
    },
  },
  {
    id: "modern-ui-icon-pack",
    name: { bn: "মডার্ন UI আইকন প্যাক (১০০০+)", en: "Modern UI Icon Pack (1000+)" },
    category: "assets",
    price: 950,
    oldPrice: 1500,
    rating: 4.9,
    reviews: 341,
    stock: 999,
    image: iconPack,
    added: 10,
    short: { bn: "লাইন ও ডুয়োটোন স্টাইলে ১০০০+ আইকন।", en: "1000+ icons in line & duotone styles." },
    description: {
      bn: "ওয়েব ও অ্যাপ ডিজাইনের জন্য ১০০০+ পিক্সেল-পারফেক্ট আইকন। SVG, PNG, Figma ফাইল ও কমার্শিয়াল লাইসেন্সসহ।",
      en: "1000+ pixel-perfect icons for web and app design. Includes SVG, PNG, Figma files and a commercial license.",
    },
    features: [
      { bn: "SVG + PNG + Figma", en: "SVG + PNG + Figma" },
      { bn: "কমার্শিয়াল লাইসেন্স", en: "Commercial license" },
      { bn: "এডিটেবল স্ট্রোক", en: "Editable strokes" },
      { bn: "লাইফটাইম আপডেট", en: "Lifetime updates" },
    ],
    delivery: instant,
    trending: true,
    flash: true,
  },
  {
    id: "social-media-template-bundle",
    name: { bn: "সোশ্যাল মিডিয়া পোস্ট টেমপ্লেট বান্ডেল", en: "Social Media Post Template Bundle" },
    category: "assets",
    price: 1200,
    oldPrice: 2000,
    rating: 4.8,
    reviews: 189,
    stock: 999,
    image: socialBundle,
    added: 7,
    short: { bn: "১০০+ এডিটেবল ফেসবুক ও ইনস্টাগ্রাম পোস্ট।", en: "100+ editable Facebook & Instagram posts." },
    description: {
      bn: "আপনার ব্র্যান্ডের সোশ্যাল মিডিয়াকে প্রফেশনাল করুন — Canva ও Photoshop-এ এডিট করা যায় এমন ১০০+ পোস্ট ও স্টোরি টেমপ্লেট।",
      en: "Make your brand's social media look professional — 100+ post & story templates editable in Canva and Photoshop.",
    },
    features: [
      { bn: "Canva + PSD", en: "Canva + PSD" },
      { bn: "পোস্ট ও স্টোরি", en: "Posts & stories" },
      { bn: "বাংলা ফন্ট সাপোর্ট", en: "Bangla font ready" },
      { bn: "সহজ এডিট", en: "Easy to edit" },
    ],
    delivery: instant,
    trending: true,
    flash: true,
  },
  {
    id: "3d-illustration-bundle",
    name: { bn: "৩ডি ইলাস্ট্রেশন বান্ডেল", en: "3D Illustration Bundle" },
    category: "assets",
    price: 1500,
    rating: 4.7,
    reviews: 72,
    stock: 999,
    image: illustrationBundle,
    added: 5,
    short: { bn: "ওয়েবসাইট ও প্রেজেন্টেশনের জন্য ৩ডি ক্যারেক্টার।", en: "3D characters for websites & presentations." },
    description: {
      bn: "ল্যান্ডিং পেজ, অ্যাপ ও প্রেজেন্টেশনের জন্য ২০০+ হাই-রেজোলিউশন ৩ডি ইলাস্ট্রেশন — ক্যারেক্টার, অবজেক্ট ও সিন।",
      en: "200+ high-resolution 3D illustrations for landing pages, apps and decks — characters, objects and scenes.",
    },
    features: [
      { bn: "২০০+ ইলাস্ট্রেশন", en: "200+ illustrations" },
      { bn: "4K PNG", en: "4K PNG" },
      { bn: "Blender সোর্স", en: "Blender source" },
      { bn: "কমার্শিয়াল লাইসেন্স", en: "Commercial license" },
    ],
    delivery: instant,
  },
  {
    id: "custom-website-development",
    name: { bn: "কাস্টম ওয়েবসাইট ডেভেলপমেন্ট", en: "Custom Website Development" },
    category: "development",
    price: 25000,
    oldPrice: 35000,
    rating: 5,
    reviews: 118,
    stock: 8,
    image: webDevelopment,
    added: 4,
    short: { bn: "আপনার ব্যবসার জন্য সম্পূর্ণ কাস্টম ওয়েবসাইট।", en: "A fully custom website for your business." },
    description: {
      bn: "React, Node ও TypeScript দিয়ে আপনার প্রয়োজন অনুযায়ী দ্রুত, নিরাপদ ও SEO-ফ্রেন্ডলি ওয়েবসাইট। ডোমেইন, হোস্টিং সেটআপ ও ৩ মাস ফ্রি মেইনটেন্যান্স।",
      en: "A fast, secure, SEO-friendly website built to your needs with React, Node and TypeScript. Includes domain & hosting setup and 3 months of free maintenance.",
    },
    features: [
      { bn: "কাস্টম ডিজাইন", en: "Custom design" },
      { bn: "অ্যাডমিন প্যানেল", en: "Admin panel" },
      { bn: "ডোমেইন ও হোস্টিং সেটআপ", en: "Domain & hosting setup" },
      { bn: "৩ মাস ফ্রি মেইনটেন্যান্স", en: "3 months free maintenance" },
    ],
    delivery: {
      bn: "অর্ডারের পর আমাদের টিম কল করে প্রয়োজন জেনে নেবে। সাধারণত ১০-২১ কর্মদিবসে প্রজেক্ট সম্পন্ন হয়।",
      en: "Our team calls you to gather requirements. Projects are usually delivered in 10–21 working days.",
    },
    trending: true,
  },
  {
    id: "mobile-app-development",
    name: { bn: "মোবাইল অ্যাপ ডেভেলপমেন্ট (Android + iOS)", en: "Mobile App Development (Android + iOS)" },
    category: "development",
    price: 60000,
    oldPrice: 75000,
    rating: 4.9,
    reviews: 41,
    stock: 4,
    image: mobileApp,
    added: 3,
    short: { bn: "একটি কোডবেসে Android ও iOS অ্যাপ।", en: "Android & iOS apps from one codebase." },
    description: {
      bn: "আপনার আইডিয়াকে সুন্দর, দ্রুত মোবাইল অ্যাপে রূপান্তর করুন। UI/UX ডিজাইন, ডেভেলপমেন্ট, Play Store ও App Store পাবলিশিংসহ।",
      en: "Turn your idea into a beautiful, fast mobile app. Includes UI/UX design, development and Play Store & App Store publishing.",
    },
    features: [
      { bn: "UI/UX ডিজাইন", en: "UI/UX design" },
      { bn: "পুশ নোটিফিকেশন", en: "Push notifications" },
      { bn: "স্টোর পাবলিশিং", en: "Store publishing" },
      { bn: "৬ মাস সাপোর্ট", en: "6 months support" },
    ],
    delivery: {
      bn: "রিকোয়ারমেন্ট মিটিংয়ের পর ধাপে ধাপে ডেলিভারি — সাধারণত ৪-৮ সপ্তাহ।",
      en: "Milestone-based delivery after a requirements meeting — usually 4–8 weeks.",
    },
  },
  {
    id: "seo-digital-marketing",
    name: { bn: "SEO ও ডিজিটাল মার্কেটিং প্যাকেজ (মাসিক)", en: "SEO & Digital Marketing Package (Monthly)" },
    category: "marketing",
    price: 8000,
    oldPrice: 12000,
    rating: 4.8,
    reviews: 87,
    stock: 10,
    image: seoMarketing,
    added: 2,
    short: { bn: "গুগলে র‍্যাংক ও ফেসবুকে বিক্রি বাড়ান।", en: "Rank on Google and grow sales on Facebook." },
    description: {
      bn: "অন-পেজ ও অফ-পেজ SEO, ফেসবুক অ্যাড ম্যানেজমেন্ট, কন্টেন্ট প্ল্যান ও মাসিক রিপোর্ট — আপনার ব্যবসার অনলাইন গ্রোথের জন্য।",
      en: "On-page & off-page SEO, Facebook ad management, content planning and monthly reports — for your business's online growth.",
    },
    features: [
      { bn: "কিওয়ার্ড রিসার্চ", en: "Keyword research" },
      { bn: "ফেসবুক অ্যাড", en: "Facebook ads" },
      { bn: "১২টি পোস্ট/মাস", en: "12 posts/month" },
      { bn: "মাসিক রিপোর্ট", en: "Monthly report" },
    ],
    delivery: {
      bn: "অর্ডার নিশ্চিত হওয়ার ৪৮ ঘণ্টার মধ্যে কাজ শুরু হবে। প্রতি মাসে রিপোর্ট দেওয়া হবে।",
      en: "Work starts within 48 hours of confirmation, with a report every month.",
    },
  },
  {
    id: "logo-branding-package",
    name: { bn: "লোগো ও ব্র্যান্ডিং প্যাকেজ", en: "Logo & Branding Package" },
    category: "design",
    price: 5000,
    oldPrice: 7500,
    rating: 4.9,
    reviews: 156,
    stock: 12,
    image: branding,
    added: 1,
    short: { bn: "লোগো, ভিজিটিং কার্ড ও ব্র্যান্ড গাইড।", en: "Logo, business cards & brand guide." },
    description: {
      bn: "আপনার ব্যবসার জন্য ইউনিক লোগো, কালার প্যালেট, ভিজিটিং কার্ড, লেটারহেড ও সোশ্যাল মিডিয়া কিট — আনলিমিটেড রিভিশনসহ।",
      en: "A unique logo, color palette, business card, letterhead and social media kit for your business — with unlimited revisions.",
    },
    features: [
      { bn: "৩টি লোগো কনসেপ্ট", en: "3 logo concepts" },
      { bn: "আনলিমিটেড রিভিশন", en: "Unlimited revisions" },
      { bn: "সোর্স ফাইল", en: "Source files" },
      { bn: "ব্র্যান্ড গাইডলাইন", en: "Brand guidelines" },
    ],
    delivery: {
      bn: "প্রথম কনসেপ্ট ৩ কর্মদিবসে, চূড়ান্ত ফাইল ৭ কর্মদিবসের মধ্যে।",
      en: "First concepts in 3 working days, final files within 7 working days.",
    },
    trending: true,
  },
];

const byId = new Map(products.map((p) => [p.id, p]));

export function getProduct(id: string) {
  return byId.get(id);
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}

export const MAX_PRICE = Math.max(...products.map((p) => p.price));
