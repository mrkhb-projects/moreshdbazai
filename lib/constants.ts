import type { MarketCategory } from "@/types/price";

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "مرشد بازاری";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const SITE_DESCRIPTION =
  "مرشد بازاری، دستیار هوشمند مشاوره اقتصادی و مالی؛ قیمت لحظه‌ای ارز، طلا، سکه، رمزارز، بورس و کالا را رصد کن و با تحلیل ترکیبی روند و نوسان، بهترین زمان خرید و فروش را از دست نده.";

export const CATEGORY_LABELS: Record<MarketCategory, string> = {
  currency: "ارز",
  gold: "طلا",
  coin: "سکه",
  crypto: "ارز دیجیتال",
  stock: "بورس",
  commodity: "کالا و انرژی",
};

/**
 * فهرست نمادهای رصد‌شونده و نگاشت آن‌ها به کلید سرویس داده tgju.
 * افزودن یک نماد جدید فقط نیاز به اضافه‌کردن یک آیتم به همین آرایه دارد.
 *
 * ⚠️ نکته درباره حالت Live: کلیدهای دسته‌های ارز و طلا/سکه دقیقاً با
 * سرویس tgju.org (ajax.json) تطبیق دارند. کلیدهای دسته‌های crypto (به‌جز
 * قیمت‌های تومانی)، stock و commodity در این پروژه صرفاً برای حالت Demo
 * تعریف شده‌اند و در حالت DATA_SOURCE=live نگاشت نمی‌شوند (چون در پاسخ
 * ajax.json عمومی tgju موجود نیستند)؛ پیش از فعال‌سازی کامل حالت Live برای
 * این دسته‌ها باید کلید صحیح سرویس داده را جایگزین کنید.
 */
export interface TrackedSymbol {
  key: string;
  title: string;
  category: MarketCategory;
  unit: "toman" | "usd" | "point";
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
  { key: "crypto_bitcoin", title: "بیت‌کوین (BTC)", category: "crypto", unit: "usd", isRial: false },
  { key: "crypto_ethereum", title: "اتریوم (ETH)", category: "crypto", unit: "usd", isRial: false },
  { key: "crypto_bnb", title: "بایننس کوین (BNB)", category: "crypto", unit: "usd", isRial: false },
  { key: "crypto_ripple", title: "ریپل (XRP)", category: "crypto", unit: "usd", isRial: false },
  { key: "crypto_tether", title: "تتر (USDT)", category: "crypto", unit: "toman", isRial: true },
  { key: "stock_tedpix", title: "شاخص کل بورس تهران", category: "stock", unit: "point", isRial: false },
  { key: "stock_hamvazn", title: "شاخص هم‌وزن", category: "stock", unit: "point", isRial: false },
  { key: "stock_foolad", title: "فولاد مبارکه اصفهان (فولاد)", category: "stock", unit: "toman", isRial: true },
  { key: "stock_fameli", title: "ملی صنایع مس ایران (فملی)", category: "stock", unit: "toman", isRial: true },
  { key: "stock_shepna", title: "پالایش نفت اصفهان (شپنا)", category: "stock", unit: "toman", isRial: true },
  { key: "commodity_brent", title: "نفت برنت", category: "commodity", unit: "usd", isRial: false },
  { key: "commodity_wti", title: "نفت وست تگزاس (WTI)", category: "commodity", unit: "usd", isRial: false },
  { key: "commodity_gas", title: "گاز طبیعی (Henry Hub)", category: "commodity", unit: "usd", isRial: false },
  { key: "commodity_copper", title: "مس جهانی (LME)", category: "commodity", unit: "usd", isRial: false },
];

export const OTP_CODE_LENGTH = 5;
export const OTP_TTL_SECONDS = 120;
export const SESSION_COOKIE_NAME = "mb_session";
