/**
 * انواع داده‌ای مربوط به قیمت‌های بازار (ارز، طلا، سکه و ...).
 * این ساختار مستقل از منبع داده (tgju یا هر منبع دیگر) طراحی شده تا در
 * آینده جایگزینی منبع داده یا افزودن دیتابیس ساده باشد.
 */

export type MarketCategory = "currency" | "gold" | "coin" | "crypto";

export type PriceDirection = "up" | "down" | "flat";

export type SignalAction = "buy" | "sell" | "hold";

export interface MarketPrice {
  /** شناسه یکتا و پایدار، برگرفته از کلید منبع داده (مثلاً price_dollar_rl) */
  key: string;
  /** عنوان فارسی برای نمایش به کاربر */
  title: string;
  /** دسته‌بندی بازار */
  category: MarketCategory;
  /** واحد نمایش قیمت (تومان به‌صورت پیش‌فرض) */
  unit: "toman" | "usd";
  /** قیمت لحظه‌ای */
  price: number;
  /** بیشترین قیمت در بازه اخیر */
  high: number;
  /** کمترین قیمت در بازه اخیر */
  low: number;
  /** مقدار تغییر نسبت به قیمت پایه */
  changeAmount: number;
  /** درصد تغییر */
  changePercent: number;
  /** جهت تغییر */
  direction: PriceDirection;
  /** زمان به‌روزرسانی (ISO) */
  updatedAt: string;
}

export interface MarketSignal {
  key: string;
  title: string;
  category: MarketCategory;
  action: SignalAction;
  /** توضیح کوتاه دلیل توصیه، به زبان ساده */
  reason: string;
  /** میزان اطمینان از ۰ تا ۱۰۰ (صرفاً شاخصی نمایشی بر پایه قواعد ساده) */
  confidence: number;
  price: MarketPrice;
}

export interface MarketSnapshot {
  prices: MarketPrice[];
  signals: MarketSignal[];
  /** آیا داده از منبع زنده گرفته شد یا نمونه (fallback) بود */
  source: "live" | "mock";
  updatedAt: string;
}
