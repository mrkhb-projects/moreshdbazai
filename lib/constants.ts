import type { MarketCategory } from "@/types/price";

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "مرشد بازاری";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const SITE_DESCRIPTION =
  "مرشد بازاری، دستیار هوشمند مشاوره اقتصادی و مالی؛ قیمت لحظه‌ای ارز، طلا و سکه را رصد کن و بهترین زمان خرید و فروش را از دست نده.";

export const CATEGORY_LABELS: Record<MarketCategory, string> = {
  currency: "ارز",
  gold: "طلا",
  coin: "سکه",
  crypto: "ارز دیجیتال",
};

/**
 * فهرست نمادهای رصد‌شونده و نگاشت آن‌ها به کلید سرویس داده tgju.
 * افزودن یک نماد جدید فقط نیاز به اضافه‌کردن یک آیتم به همین آرایه دارد.
 */
export interface TrackedSymbol {
  key: string;
  title: string;
  category: MarketCategory;
  unit: "toman" | "usd";
  /** آیا مقدار خام بر حسب ریال است و باید به تومان تبدیل شود */
  isRial: boolean;
}

export const TRACKED_SYMBOLS: TrackedSymbol[] = [
  { key: "price_dollar_rl", title: "دلار آمریکا", category: "currency", unit: "toman", isRial: true },
  { key: "price_eur", title: "یورو", category: "currency", unit: "toman", isRial: true },
  { key: "price_gbp", title: "پوند انگلیس", category: "currency", unit: "toman", isRial: true },
  { key: "price_aed", title: "درهم امارات", category: "currency", unit: "toman", isRial: true },
  { key: "price_try", title: "لیر ترکیه", category: "currency", unit: "toman", isRial: true },
  { key: "geram18", title: "طلای ۱۸ عیار (هر گرم)", category: "gold", unit: "toman", isRial: true },
  { key: "geram24", title: "طلای ۲۴ عیار (هر گرم)", category: "gold", unit: "toman", isRial: true },
  { key: "mesghal", title: "مثقال طلا", category: "gold", unit: "toman", isRial: true },
  { key: "ons", title: "انس جهانی طلا", category: "gold", unit: "usd", isRial: false },
  { key: "sekee", title: "سکه امامی", category: "coin", unit: "toman", isRial: true },
  { key: "sekeb", title: "سکه بهار آزادی", category: "coin", unit: "toman", isRial: true },
  { key: "nim", title: "نیم سکه", category: "coin", unit: "toman", isRial: true },
  { key: "rob", title: "ربع سکه", category: "coin", unit: "toman", isRial: true },
  { key: "gerami", title: "سکه گرمی", category: "coin", unit: "toman", isRial: true },
];

export const OTP_CODE_LENGTH = 5;
export const OTP_TTL_SECONDS = 120;
export const SESSION_COOKIE_NAME = "mb_session";
